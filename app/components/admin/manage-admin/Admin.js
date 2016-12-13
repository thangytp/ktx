import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';

import ManageAdminAction from '../../../actions/admin/manage-admin/ManageAdminAction';
import ManageAdminStore from '../../../stores/admin/manage-admin/ManageAdminStore';

const AddAdminModal = React.createClass({

  handleAddAdmin(e) {

    e.preventDefault()
    const data = {
        ten: this.refs.ten.value,
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
          <Modal.Title id="contained-modal-title-lg">Thêm người quản trị</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleAddAdmin.bind(this)}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Tên</label>
            <input type="text" className="form-control" ref="ten" placeholder="Tên" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input type="email" className="form-control" ref="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Password</label>
            <input type="password" className="form-control" ref="password" placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Vai trò</label>
            <select className="form-control" onChange={this.handleChangeType.bind(this)}>
                <option value=''>--Chọn--</option>
                <option value='Admin'>Admin</option>
                <option value='Super Mod'>Super Mod</option>
                <option value='Manager'>Manager</option>
            </select>
          </div>
          <button className="btn btn-success btn-large" type="submit">Thêm Quản Trị</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
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

  openMoDDeleteAdmin(id){
    ManageAdminAction.openMoDDeleteAdmin(id);
  }
  handleDelAdmin() {
    var id = this.state.idDel;
    ManageAdminAction.delAdmin(id);
  }

  handleGetAdmin(obj){
    ManageAdminAction.handleGetAdmin(obj);
  }
  updateAdmin(){

  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let listAdmin = this.state.admin.map(function(admin, index){
      return (
        <tr>
        <td scope="row">{index + 1}</td>
        <td>{admin.email}</td>
        <td>{admin.type}</td>
        {/* <td><button className="btn btn-primary" onClick={this.handleGetStudent.bind(this, user._id)}>Edit</button></td> */}
        <td>
          <a className="btn btn-primary" onClick={this.handleGetAdmin.bind(this, admin)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
          <a className="btn btn-danger" onClick={this.openMoDDeleteAdmin.bind(this, admin._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></a>
        </td>
        </tr>
      )
    }, this);

    let addModalClose = () => this.setState({ addModalShow: false });


    return (
      <div className="body-content animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <ol className="breadcrumb">
              <li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
              <li>Quản lý admin</li>
            </ol>
            <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
              Thêm Quản Trị Hệ Thống
            </Button>
            <AddAdminModal show={this.state.addModalShow} onHide={addModalClose} />
            <div className="table-responsive">
              <table className="table white-bg table-striped table-hover table-success">
                <thead>
                 <tr>
                   <th>STT</th>
                   <th>Email</th>
                   <th>Cấp Độ</th>
                   <th>Hành động</th>
                   </tr>
                 </thead>
                 <tbody>
                  {listAdmin}
                 </tbody>
              </table>
            </div>
            <Modal show={this.state.modalIsOpen} onHide ={ManageAdminAction.closeModal}>
                <Modal.Header>
                  <Modal.Title>
                    Sửa
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" >Tên</label>
                    <input type="text" className="form-control" ref="ten" placeholder="Tên" value={this.state.nameEdit}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" >Email</label>
                    <input type="email" className="form-control" ref="email" placeholder="Email" value={this.state.emailEdit}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Password</label>
                    <input type="password" className="form-control" ref="password" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Vai trò</label>
                    <select className="form-control" value={this.state.typeEdit}>
                        <option value=''>--Chọn--</option>
                        <option value='Admin'>Admin</option>
                        <option value='Super Mod'>Super Mod</option>
                        <option value='Manager'>Manager</option>
                    </select>
                  </div>
                </Modal.Body>      
                <Modal.Footer>
                    <button
                        className="btn btn-warning"
                      onClick={ManageAdminAction.closeModal}><i className="fa fa-times"> Hủy bỏ</i> </button>          
                    <button
                        className="btn btn-success"
                      onClick={this.updateAdmin.bind(this)}><i className="fa fa-check"> Lưu</i> </button>          
                </Modal.Footer>
            </Modal>
            {/* modal xoa item va con cua no */}
            <Modal show={this.state.modalIsOpenDelete} onHide ={ManageAdminAction.closeModalDelete}>
                  <Modal.Header>
                    <Modal.Title>
                      Xóa
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Bạn có chắc muốn xóa?</p>
                  </Modal.Body>      
                  <Modal.Footer>
                      <button
                          className="btn btn-warning"
                        onClick={ManageAdminAction.closeModalDelete}><i className="fa fa-times"> Hủy bỏ</i> </button>          
                      <button
                          className="btn btn-success"
                        onClick={this.handleDelAdmin.bind(this)}><i className="fa fa-check"> Xóa</i> </button>          
                  </Modal.Footer>
              </Modal>
            </div>
          </div>
      </div>
    );
  }
}
export default Admin;
