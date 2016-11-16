import React from 'react';
import {Link} from 'react-router'
import {Modal, Button} from 'react-bootstrap';
import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import ManageUserStore from '../../../stores/admin/manage-user/ManageUserStore';
import ManageUuTienAction from '../../../actions/admin/manage-uutien/ManageUuTienAction';
import ManageUuTienStore from '../../../stores/admin/manage-uutien/ManageUuTienStore';

var FormUpload = React.createClass({
    uploadFile: function (e) {
        var fd = new FormData();
        fd.append('file', this.refs.file.getDOMNode().files[0]);
        ManageUserAction.importUser(fd);
        e.preventDefault()
    },
    render: function() {
        return (
            <div>
               <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
                   <input ref="file" type="file" name="file" className="upload-file"/>
                   <input type="button" ref="button" value="Upload" onClick={this.uploadFile.bind(this)} />
               </form>
            </div>
        );
    }
});


const AddUserModal = React.createClass({

  handleAddUser(e) {

    e.preventDefault()
    const data = {
        email: this.refs.email.value,
        mssv: this.refs.code.value
    };
    ManageUserAction.addUser(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleAddUser.bind(this, event)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" ref="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Code</label>
              <input type="number" className="form-control" ref="code" placeholder="Code" />
            </div>
            <div className="form-group">
              <label for="Avatar">Avatar</label>
              <input type="file" ref="avatar" />
            </div>
            <button className="btn btn-success btn-large" type="submit">Add Student</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

const EditUserModal = React.createClass({

  handleEditUser(e) {

    e.preventDefault()
    const data = {
        email: this.refs.email.value,
        id: this.props.user._id,
        khuvuc: this.state.khuvuc,
        tinh: this.state.tinh,
        doituong: this.state.doituong,
        hocluc: this.state.hocluc,
        hoancanh: this.state.hoancanh
    };
    console.log(data);
    ManageUserAction.editUser(data);
  },

  handleChangeKhuvuc(e) {
    this.setState({khuvuc : e.target.value});
  },

  handleChangeTinh(e) {
    this.setState({tinh : e.target.value});
  },

  handleChangeDoituong(e) {
    this.setState({doituong : e.target.value});
  },

  handleChangeHocluc(e) {
    this.setState({hocluc : e.target.value});
  },

  handleChangeHoancanh(e) {
    this.setState({hoancanh : e.target.value});
  },

  render() {

    let listKhuvuc = this.props.khuvuc.map(function(khuvuc, index){
      return(
				<option value={khuvuc._id} key={index}>
					{khuvuc.ten}
				</option>
			);
    });
    let listTinh = this.props.tinh.map(function(tinh, index){
      return(
				<option value={tinh._id} key={index}>
					{tinh.ten}
				</option>
			);
    });
    let listDoituong = this.props.doituong.map(function(doituong, index){
      return(
				<option value={doituong._id} key={index}>
					{doituong.ten}
				</option>
			);
    });
    let listHocluc = this.props.hocluc.map(function(hocluc, index){
      return(
				<option value={hocluc._id} key={index}>
					{hocluc.ten}
				</option>
			);
    });
    let listHoancanh = this.props.hoancanh.map(function(hoancanh, index){
      return(
				<option value={hoancanh._id} key={index}>
					{hoancanh.ten}
				</option>
			);
    });

    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleEditUser.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" ref="email" placeholder={this.props.user.email} />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Code</label>
              <input type="number" className="form-control" ref="code" placeholder={this.props.code} />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Khu Vực</label>
              <select className="form-control" onChange={this.handleChangeKhuvuc.bind(this)}>
                  <option value='0'>--Chọn--</option>
                  {listKhuvuc}
              </select>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Tỉnh</label>
              <select className="form-control" onChange={this.handleChangeTinh.bind(this)}>
                  <option value='0'>--Chọn--</option>
                  {listTinh}
              </select>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Đối Tượng</label>
              <select className="form-control" onChange={this.handleChangeDoituong.bind(this)}>
                  <option value='0'>--Chọn--</option>
                  {listDoituong}
              </select>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Học Lực</label>
              <select className="form-control" onChange={this.handleChangeHocluc.bind(this)}>
                  <option value='0'>--Chọn--</option>
                  {listHocluc}
              </select>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Hoàn Cảnh Gia Đình</label>
              <select className="form-control" onChange={this.handleChangeHoancanh.bind(this)}>
                  <option value='0'>--Chọn--</option>
                  {listHoancanh}
              </select>
            </div>
            <div className="form-group">
              <label for="Avatar">Avatar</label>
              <input type="file" ref="avatar" />
            </div>
            <button className="btn btn-success btn-large" type="submit">Edit Student</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

class ManageStudent extends React.Component {

  constructor(props)
	{
		super(props);
		this.state = {state1 : ManageUserStore.getState(), state2 : ManageUuTienStore.getState(), khuvuc : '', tinh: '', doituong: '', hocluc: '', hoancanh: ''};
    // this.state = {};
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
    this.state.editModalShow = false;

  }

  componentWillMount() {

  }

  componentDidMount() {
    ManageUserStore.listen(this.onChange);
    ManageUserAction.getUsers();
    ManageUuTienAction.getKhuvuc();
    ManageUuTienAction.getTinh();
    ManageUuTienAction.getDoituong();
    ManageUuTienAction.getHocluc();
    ManageUuTienAction.getHoancanh();

  }

  componentWillUnmount() {
    ManageUserStore.unlisten(this.onChange);
  }

  handleDelStudent(userId) {
    ManageUserAction.deleteUser(userId);
  }

  handleGetStudent(userId) {
    this.setState({ editModalShow: true });
    ManageUserAction.getUser(userId);
  }

  onChange(state) {
    this.setState({state1 : ManageUserStore.getState(), state2 : ManageUuTienStore.getState()});
  }

  render() {

    let listUsers = this.state.state1.users.map(function(user, index){
        return (
          <tr>
           <th scope="row">{index + 1}</th>
           <td>{user.ho_lot}' '{user.ten}</td>
           <td>{user.email}</td>
           <td>{user.ma_sinh_vien}</td>
           <td>{user.ma_ktx}</td>
           {/*// <td>{user.ma_giuong}</td>
           // <td>{user.ten_giuong}</td>
           // <td>{user.ten_phong}</td>*/}
           <td>{user.so_cmnd}</td>
           <td>{user.dien_thoai}</td>
           <td><button className="btn btn-primary" onClick={this.handleGetStudent.bind(this, user._id)}>Edit</button></td>
           <td><button className="btn btn-danger" onClick={this.handleDelStudent.bind(this, user._id)}>Delete</button></td>
          </tr>
        )
    }, this);

    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    const props = {user : this.state.state1.user, khuvuc : this.state.state2.khuvuc, doituong : this.state.state2.doituong, tinh : this.state.state2.tinh, hocluc : this.state.state2.hocluc, hoancanh : this.state.state2.hoancanh};

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
               {/*<th>Mã Giường</th>
               <th>Tên Giường</th>
               <th>Tên Phòng</th>*/}
               <th>CMND</th>
               <th>SDT</th>
               <th></th>
               <th></th>

               </tr>
             </thead>
             <tbody>
              {listUsers}
             </tbody>
          </table>
        </div>
        <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
          Add Student
        </Button>
        <AddUserModal show={this.state.addModalShow} onHide={addModalClose} />
        <EditUserModal {...props} show={this.state.editModalShow} onHide={editModalClose} />
        <FormUpload />
      </div>
    );
  }
}

export default ManageStudent;
