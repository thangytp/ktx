import React from 'react';
import {Link} from 'react-router'
import {Modal, Button} from 'react-bootstrap';
import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import ManageUserStore from '../../../stores/admin/manage-user/ManageUserStore';
import ManagePhongAction from '../../../actions/admin/manage-phong/ManagePhongAction';
import ManagePhongStore from '../../../stores/admin/manage-phong/ManagePhongStore';
import ManagePhongChitietAction from '../../../actions/admin/manage-phong/ManagePhongChitietAction';
import ManagePhongChitietStore from '../../../stores/admin/manage-phong/ManagePhongChitietStore';

const UpdateUserModal = React.createClass({

  handleUpdateKtx(e) {

    e.preventDefault()
    const data = {
        loai: this.refs.loai.value,
        gia: this.refs.gia.value,
        kichco: this.refs.kichco.value,
        soluong: this.refs.soluong.value
    };
    // ManagePhongAction.addPhong(data);
  },

  handleChangePhong(e) {
    this.setState({loai : e.target.value});
  },

  render() {
    let listPhongChitiet;

    if(Object.keys(this.props.user).length !== 0) {

      var phongchitiet = this.props.phongchitiet;
      var loaiphong = this.props.user._phong_id;

      var phongByLoai = phongchitiet.filter(function(obj) {
          return obj._loai._id == loaiphong._id;
      });

      console.log(phongByLoai);

      listPhongChitiet = phongByLoai.map(function(phong, index){
        return(
  				<option value={phong._id} key={index}>
  					{phong.ma}
  				</option>
  			);
      });

    }
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleUpdateKtx.bind(this)}>
          <div className="form-group">
            <label for="exampleInputEmail1">Loại Phòng</label>
            <input type="text" className="form-control" ref="loai" placeholder="Loại Phòng" />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Chọn Phòng</label>
            <select className="form-control" onChange={this.handleChangePhong.bind(this)}>
                <option value='0'>--Chọn--</option>
                {listPhongChitiet}
            </select>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Kích Cỡ</label>
            <input type="Number" className="form-control" ref="kichco" placeholder="Kích Cỡ" />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Số Lượng</label>
            <input type="Number" className="form-control" ref="soluong" placeholder="Số Lượng" />
          </div>
          <button className="btn btn-success btn-large" type="submit">Cập Nhật</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});



class XetDuyetStudent extends React.Component {

  constructor(props)
	{
		super(props);
    this.state = {state1 : ManageUserStore.getState(), state2: ManagePhongStore.getState(), state3: ManagePhongChitietStore.getState()};
    // this.state = {};
		this.onChange = this.onChange.bind(this);
    this.state.updateModalShow = false;

  }

  componentWillMount() {

  }

  componentDidMount() {
    ManageUserStore.listen(this.onChange);
    ManagePhongStore.listen(this.onChange);
    ManagePhongChitietStore.listen(this.onChange);
    ManageUserAction.getUsersByXetDuyetThanhCong();
    ManagePhongAction.getPhong();
    ManagePhongChitietAction.getPhong();
  }

  componentWillUnmount() {
    ManageUserStore.unlisten(this.onChange);
    ManagePhongStore.unlisten(this.onChange);
    ManagePhongChitietStore.unlisten(this.onChange);
  }

  handleUpdateKtx(userId) {
    this.setState({ updateModalShow: true });
    ManageUserAction.getUser(userId);
  }

  onChange(state) {
    this.setState({state1 : ManageUserStore.getState(), state2: ManagePhongStore.getState(), state3: ManagePhongChitietStore.getState()});
  }

  render() {

    let listUsers = this.state.state1.usersxd.map(function(user, index){
        return (
          <tr>
           <th scope="row">{index + 1}</th>
           <td>{user.ten}</td>
           <td>{user.email}</td>
           <td>{user.ma_sinh_vien}</td>
           <td>{user.ma_ktx}</td>
           <td></td>
           <td></td>
           <td></td>
           <td>{user.so_cmnd}</td>
           <td>{user.dien_thoai}</td>
           <td><button className="btn btn-success" onClick={this.handleUpdateKtx.bind(this, user._id)}>Cập nhật thông tin trong ký túc xá</button></td>
          </tr>
        )
    }, this);

    let updateModalClose = () => this.setState({ updateModalShow: false });
    const props = {user: this.state.state1.user, phongchitiet: this.state.state3.phongchitiet};
    return (
      <div>
        <div className="table-responsive">
          <table className="table">
            <thead>
             <tr>
               <th>#</th>
               <th>Họ Tên</th>
               <th>Email</th>
               <th>MSSV</th>
               <th>Mã KTX</th>
               <th>Tầng</th>
               <th>Loại Phong</th>
               <th>Mã Phòng</th>
               <th>CMND</th>
               <th>SDT</th>
               <th></th>
               </tr>
             </thead>
             <tbody>
              {listUsers}
             </tbody>
          </table>
        </div>
        <UpdateUserModal {...props} show={this.state.updateModalShow} onHide={updateModalClose} />
      </div>
    );
  }
}

export default XetDuyetStudent;
