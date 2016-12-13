import React from 'react';
import {Link} from 'react-router'
import {Modal, Button} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import ManageUserStore from '../../../stores/admin/manage-user/ManageUserStore';
import ManageTangAction from '../../../actions/admin/manage-phong/ManageTangAction';
import ManageTangStore from '../../../stores/admin/manage-phong/ManageTangStore';
import ManagePhongChitietAction from '../../../actions/admin/manage-phong/ManagePhongChitietAction';
import ManagePhongChitietStore from '../../../stores/admin/manage-phong/ManagePhongChitietStore';

const UpdateUserModal = React.createClass({

  getInitialState: function() {
    return {loai: '', tang: '', listPhongChitiet: [], listGiuongChitiet: []};
  },

  handleUpdateKtx(e) {

    e.preventDefault()
    const data = {
        userId: this.props.user._id,
        phongchitiet: this.state.loai,
        tang: this.state.tang,
        maktx: this.refs.maktx.value,
        giuong: this.state.giuong,
        xetduyet: true
    };
    ManageUserAction.updateInfoKtx(data);
    const data1 = {
      tengiuongcu: this.props.user.ma_giuong,
      tengiuongmoi: this.state.giuong
    }
    ManagePhongChitietAction.updateGiuongDangky(data1);
  },

  handleChangeGiuong(e) {
    this.state.giuong = e.target.value;
  },

  handleChangePhong(e) {
    this.state.loai = e.target.value;
    var giuongByPhong = this.props.phongchitiet.filter(function(obj) {
        return obj._id == e.target.value;
    });
      giuongByPhong[0].giuong = giuongByPhong[0].giuong.filter(function(obj) {
          return obj.da_dang_ky == false;
      });
    console.log(giuongByPhong[0].giuong);
    this.setState({listGiuongChitiet : giuongByPhong[0].giuong});
  },

  handleChangeTang(e) {
    this.state.tang = e.target.value;
    var phongchitiet = this.props.phongchitiet;
    var loaiphong = this.props.user._phong_id;

    var phongByLoai = phongchitiet.filter(function(obj) {
        return obj._loai._id == loaiphong._id;
    });
        phongByLoai = phongByLoai.filter(function(obj) {
            return obj._tang._id == e.target.value;
        });
    this.setState({listPhongChitiet : phongByLoai});
  },

  render() {
    let listTang;
    listTang = this.props.tang.map(function(tang, index){
      return(
        <option value={tang._id} key={index}>
          {tang.ten}
        </option>
      );
    });

    // let listPhong;
    // console.log(this.state.listPhongChitiet);
    // if(this.state.listPhongChitiet != '') {
    //   listPhong = this.state.listPhongChitiet.map(function(phong, index){
    //     return(
    //       <option value={phong._id} key={index}>
    //         {phong.ma}
    //       </option>
    //     );
    //   });
    // } else {
    //   listPhong = null;
    // }

    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Cập nhật thông tin phòng/giường</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleUpdateKtx.bind(this)}>
          <div className="form-group">
            <label for="exampleInputEmail1">Chọn Tầng</label>
            <select className="form-control" onChange={this.handleChangeTang.bind(this)}>
                <option value='0'>--Chọn--</option>
                {listTang}
            </select>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Chọn Phòng</label>
            <select className="form-control" onChange={this.handleChangePhong.bind(this)}>
                <option value='0'>--Chọn--</option>
                {this.state.listPhongChitiet.map(function(phong, index){
                  return (
                    <option value={phong._id} key={index}>
                      {phong.ma}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Chọn Giường</label>
            <select className="form-control" onChange={this.handleChangeGiuong.bind(this)}>
                <option value='0'>--Chọn--</option>
                {
                  this.state.listGiuongChitiet.map(function(giuong, index){
                  return (
                    <option value={giuong.ten} key={index}>
                      {giuong.ten}
                    </option>
                  );
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Mã Ký Túc Xá</label>
            <input type="text" className="form-control" ref="maktx" placeholder="Mã Ký Túc Xá" />
          </div>
          <button className="btn btn-success btn-large" type="submit">Cập Nhật</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

class MySearchField extends React.Component {
  // It's necessary to implement getValue
  getValue() {
    return ReactDOM.findDOMNode(this).value;
  }

  // It's necessary to implement setValue
  setValue(value) {
    ReactDOM.findDOMNode(this).value = value;
  }

  render() {
    return (
      <input
        className={ `form-control` }
        type='text'
        defaultValue={ this.props.defaultValue }
        placeholder={ this.props.placeholder }
        onKeyUp={ this.props.search }/>
    );
  }
}

class XetDuyetStudent extends React.Component {

  constructor(props)
	{
		super(props);
    this.state = {state1 : ManageUserStore.getState(), state2: ManageTangStore.getState(), state3: ManagePhongChitietStore.getState()};
    // this.state = {};
		this.onChange = this.onChange.bind(this);
    this.state.updateModalShow = false;

  }

  componentWillMount() {

  }

  componentDidMount() {
    ManageUserStore.listen(this.onChange);
    ManageTangStore.listen(this.onChange);
    ManagePhongChitietStore.listen(this.onChange);
    ManageUserAction.getUsersByXetDuyetThanhCong();
    ManageTangAction.getTang();
    ManagePhongChitietAction.getPhong();
  }

  componentWillUnmount() {
    ManageUserStore.unlisten(this.onChange);
    ManageTangStore.unlisten(this.onChange);
    ManagePhongChitietStore.unlisten(this.onChange);
  }

  handleUpdateKtx(userId) {
    this.setState({ updateModalShow: true });
    ManageUserAction.getUser(userId);
  }

  onChange(state) {
    this.setState({state1 : ManageUserStore.getState(), state2: ManageTangStore.getState(), state3: ManagePhongChitietStore.getState()});
  }

  objectFormatter(data, cell) {
      return <p>{cell[data]}</p>;
  }

  buttonFormatter(data, cell) {
      return <button className="btn btn-success" onClick={this.handleUpdateKtx.bind(this, cell)}>Cập Nhật</button>;
  }

  onToggleDropDown(onToggleDropDown){
    // do your stuff here
    console.log('toggle dropdown');
    onToggleDropDown();
  }

  renderSizePerPageDropDown(props){
    return (
      <SizePerPageDropDown
        className='my-size-per-page'
        btnContextual='btn-warning'
        variation='dropup'
        onClick={ () => this.onToggleDropDown(props.onToggleDropDown) }/>
    );
  }

  createCustomExportCSVButton(onClick){
    return (
      <button style={ { color: 'red' } } onClick={ onClick }>Custom Export CSV Btn</button>
    );
  }

  render() {
    console.log(this.state.state1.usersxd);
    let listUsers = this.state.state1.usersxd.map(function(user, index){
      var tentang = user._tang_id ? user._tang_id.ten : '',
          loaiphong = user._phong_id ? user._phong_id.ten : '',
          maphong = user._phongchitiet_id ? user._phongchitiet_id.ma : '';
        return (
          <tr>
           <th scope="row">{index + 1}</th>
           <td>{user.ten}</td>
           <td>{user.email}</td>
           <td>{user.ma_sinh_vien}</td>
           <td>{user.ma_ktx}</td>
           <td>{tentang}</td>
           <td>{loaiphong}</td>
           <td>{maphong}</td>
           <td>{user.ma_giuong}</td>
           <td>{user.so_cmnd}</td>
           <td>{user.dien_thoai}</td>
           <td><button className="btn btn-success" onClick={this.handleUpdateKtx.bind(this, user._id)}>Cập nhật thông tin trong ký túc xá</button></td>
          </tr>
        )
    }, this);

    let updateModalClose = () => this.setState({ updateModalShow: false });
    const props = {user: this.state.state1.user, tang: this.state.state2.tang, phongchitiet: this.state.state3.phongchitiet};
    const options = {
      clearSearch: true,
      searchField: (props) => (<MySearchField { ...props }/>),
      sizePerPageDropDown: this.renderSizePerPageDropDown,
      exportCSVBtn: this.createCustomExportCSVButton
    };
    return (
      <div className="body-content animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <ol className="breadcrumb">
              <li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
              <li>Danh sách xét duyệt thành công</li>
            </ol>
            {/*<div className="table-responsive">
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
                   <th>Mã Giường</th>
                   <th>CMND</th>
                   <th>SDT</th>
                   <th></th>
                   </tr>
                 </thead>
                 <tbody>
                  {listUsers}
                 </tbody>
              </table>
            </div>*/}
            <BootstrapTable data={this.state.state1.usersxd} striped={true} hover={true} options={ options } search pagination exportCSV>
                <TableHeaderColumn dataField="ma_sinh_vien" isKey={true} dataAlign="center" dataSort={true}>Mã Sinh Viên</TableHeaderColumn>
                <TableHeaderColumn dataField="ten" dataSort={true}>Họ Tên</TableHeaderColumn>
                <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
                <TableHeaderColumn dataField="ma_ktx">Mã KTX</TableHeaderColumn>
                <TableHeaderColumn dataField="tentang">Tầng</TableHeaderColumn>
                <TableHeaderColumn dataField="maphong">Loại Phòng</TableHeaderColumn>
                <TableHeaderColumn dataField="tenphong">Phòng</TableHeaderColumn>
                <TableHeaderColumn dataField="so_cmnd">CMND</TableHeaderColumn>
                <TableHeaderColumn dataField="dien_thoai">SĐT</TableHeaderColumn>
                <TableHeaderColumn dataField="_id" dataFormat={this.buttonFormatter.bind(this, '_id')}>Cập Nhật Thông Tin Ký Túc Xá</TableHeaderColumn>
            </BootstrapTable>

            <UpdateUserModal {...props} show={this.state.updateModalShow} onHide={updateModalClose} />
          </div>
        </div>
      </div>
    );
  }
}

export default XetDuyetStudent;
