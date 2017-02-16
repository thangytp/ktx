import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';

import ManageTangAction from '../../../actions/admin/manage-phong/ManageTangAction';
import ManageTangStore from '../../../stores/admin/manage-phong/ManageTangStore';

const AddTangModal = React.createClass({

  handleAddTang(e) {

    e.preventDefault()
    const data = {
        ten: this.refs.loai.value
    };
    ManageTangAction.addTang(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Thêm tầng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleAddTang.bind(this)}>
          <div className="form-group">
            <label for="exampleInputEmail1">Tầng</label>
            <input type="Number" className="form-control" ref="loai" placeholder="Tầng" />
          </div>
          <button className="btn btn-success btn-large" type="submit">Thêm</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


class Tang extends Component {
  constructor(props)
	{
		super(props);
		this.state = ManageTangStore.getState();
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
  }

  componentDidMount() {
    ManageTangStore.listen(this.onChange);
    ManageTangAction.getTang();
  }

  componentWillUnmount() {
    ManageTangStore.unlisten(this.onChange);
  }

  openMoDDeleteTang(id){
    ManageTangAction.openMoDDeleteTang(id);
  }

  handleDelTang() {
    var id = this.state.idDel;
    ManageTangAction.delTang(id);
  }
  handleGetTang(tang){
    ManageTangAction.handleGetTang(tang);
  }
  updateTang(){
    // TODO
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let listTang = this.state.tang.map(function(tang, index){
      return (
        <tr>
        <th scope="row">{index + 1}</th>
        <td>{tang.ten}</td>
        {/* <td><button className="btn btn-primary" onClick={this.handleGetStudent.bind(this, user._id)}>Edit</button></td> */}
        <td>
          <button className="btn btn-primary" onClick={this.handleGetTang.bind(this, tang)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          <button className="btn btn-danger" onClick={this.openMoDDeleteTang.bind(this, tang._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
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
              <li>Tầng</li>
            </ol>
            <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
              Thêm Tầng Năm Mới
            </Button>
            <AddTangModal show={this.state.addModalShow} onHide={addModalClose} />
            <div className="table-responsive">
              <table className="table white-bg table-striped table-hover table-success">
                <thead>
                 <tr>
                   <th>STT</th>
                   <th>Tầng</th>
                   <th>Hành động</th>

                   </tr>
                 </thead>
                 <tbody>
                  {listTang}
                 </tbody>
              </table>
            </div>
            <Modal show={this.state.modalIsOpen} onHide ={ManageTangAction.closeModal}>
                <Modal.Header>
                  <Modal.Title>
                    Sửa
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" >Tầng</label>
                    <input type="number" className="form-control" ref="ten" value={this.state.tenEdit}/>
                  </div>

                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-warning"
                      onClick={ManageTangAction.closeModal}><i className="fa fa-times"> Hủy bỏ</i> </button>
                    <button
                        className="btn btn-success"
                      onClick={this.updateTang.bind(this)}><i className="fa fa-check"> Lưu</i> </button>
                </Modal.Footer>
            </Modal>
            {/* modal xoa item va con cua no */}
            <Modal show={this.state.modalIsOpenDelete} onHide ={ManageTangAction.closeModalDelete}>
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
                        onClick={ManageTangAction.closeModalDelete}><i className="fa fa-times"> Hủy bỏ</i> </button>
                      <button
                          className="btn btn-success"
                        onClick={this.handleDelTang.bind(this)}><i className="fa fa-check"> Xóa</i> </button>
                  </Modal.Footer>
              </Modal>
          </div>
        </div>
      </div>
    );
  }
}
export default Tang;
