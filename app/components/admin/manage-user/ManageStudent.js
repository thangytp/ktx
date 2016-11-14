import React from 'react';
import {Link} from 'react-router'
import {Modal, Button} from 'react-bootstrap';
import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import ManageUserStore from '../../../stores/admin/manage-user/ManageUserStore';

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
        mssv: this.refs.code.value,
        id: this.props._id
    };
    console.log(data);
    ManageUserAction.editUser(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleEditUser.bind(this, event)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" ref="email" placeholder={this.props.email} />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Code</label>
              <input type="number" className="form-control" ref="code" placeholder={this.props.code} />
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
		this.state = ManageUserStore.getState();
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
    this.state.editModalShow = false;

  }

  componentDidMount() {
    ManageUserStore.listen(this.onChange);
    ManageUserAction.getUsers();
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
    this.setState(state);
  }

  render() {

    let listUsers = this.state.users.map(function(user, index){
        return (
          <tr>
           <th scope="row">{index + 1}</th>
           <td>{user.ho_lot}' '{user.ten}</td>
           <td>{user.email}</td>
           <td>{user.ma_sinh_vien}</td>
           <td>{user.ma_ktx}</td>
           <td>{user.ma_giuong}</td>
           <td>{user.ten_giuong}</td>
           <td>{user.ten_phong}</td>
           <td>{user.so_cmnd}</td>
           <td>{user.dien_thoai}</td>
           <td><button className="btn btn-primary" onClick={this.handleGetStudent.bind(this, user._id)}>Edit</button></td>
           <td><button className="btn btn-danger" onClick={this.handleDelStudent.bind(this, user._id)}>Delete</button></td>
          </tr>
        )
    }, this);

    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    const props = this.state.user;

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
               <th>Mã Giường</th>
               <th>Tên Giường</th>
               <th>Tên Phòng</th>
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
        <AddUserModal {...props} show={this.state.addModalShow} onHide={addModalClose} />
        <EditUserModal {...props} show={this.state.editModalShow} onHide={editModalClose} />
        <FormUpload />
      </div>
    );
  }
}

export default ManageStudent;
