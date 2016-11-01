import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import ManageUserStore from '../../../stores/admin/manage-user/ManageUserStore';

const AddUserModal = React.createClass({

  handleAddUser(e) {

    e.preventDefault()
    const data = {
        email: this.refs.email.value,
        password: this.refs.password.value,
        code: this.refs.code.value,
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
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" ref="password" placeholder="Password" />
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
        password: this.refs.password.value,
        code: this.refs.code.value,
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
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" ref="password" placeholder="Password" />
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

class Home extends React.Component {

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
           <td>{user.email}</td>
           <td>{user.name}</td>
           <td>{user.code}</td>
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
               <th>Email</th>
               <th>Name</th>
               <th>Code</th>
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
      </div>
    );
  }
}

export default Home;
