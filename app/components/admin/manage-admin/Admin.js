import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import ManageAdminAction from '../../../actions/admin/manage-admin/ManageAdminAction';
import ManageAdminStore from '../../../stores/admin/manage-admin/ManageAdminStore';

const AddAdminModal = React.createClass({

  handleAddAdmin(e) {

    e.preventDefault()
    const data = {
        email: this.refs.email.value,
        password: this.refs.password.value,
        type: this.state.type
    };
    console.log(data);
    ManageAdminAction.addAdmin(data);
  },

  handleChangeType(e) {
    this.setState({type : e.target.value});
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleAddAdmin.bind(this)}>
          <div className="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input type="text" className="form-control" ref="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Password</label>
            <input type="password" className="form-control" ref="password" placeholder="Password" />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Cấp Độ</label>
            <select className="form-control" onChange={this.handleChangeType.bind(this)}>
                <option value='Admin'>Admin</option>
                <option value='Super Mod'>Super Mod</option>
                <option value='Manager'>Manager</option>
            </select>
          </div>
          <button className="btn btn-success btn-large" type="submit">Thêm Quản Trị</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


class Admin extends Component {
  constructor(props)
	{
		super(props);
		this.state = ManageAdminStore.getState();
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
  }

  componentDidMount() {
    ManageAdminStore.listen(this.onChange);
    ManageAdminAction.getAdmin();
  }

  componentWillUnmount() {
    ManageAdminStore.unlisten(this.onChange);
  }

  handleDelAdmin(id) {
    ManageAdminAction.delAdmin(id);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let listAdmin = this.state.admin.map(function(admin, index){
      return (
        <tr>
        <th scope="row">{index + 1}</th>
        <td>{admin.email}</td>
        <td>{admin.type}</td>
        {/* <td><button className="btn btn-primary" onClick={this.handleGetStudent.bind(this, user._id)}>Edit</button></td> */}
        <td><button className="btn btn-danger" onClick={this.handleDelAdmin.bind(this, admin._id)}>Delete</button></td>
        </tr>
      )
    }, this);

    let addModalClose = () => this.setState({ addModalShow: false });


    return (
      <div>
      <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
        Thêm Quản Trị Hệ Thống
      </Button>
      <AddAdminModal show={this.state.addModalShow} onHide={addModalClose} />
      <h1>Dịch Vụ Ký Túc Xá</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
           <tr>
             <th>#</th>
             <th>Email</th>
             <th>Cấp Độ</th>
             <th></th>
             <th></th>
             </tr>
           </thead>
           <tbody>
            {listAdmin}
           </tbody>
        </table>
      </div>
      </div>
    );
  }
}
export default Admin;
