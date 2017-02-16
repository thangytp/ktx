import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';

import ManageDichvuAction from '../../../actions/admin/manage-dichvu/ManageDichvuAction';
import ManageDichvuStore from '../../../stores/admin/manage-dichvu/ManageDichvuStore';

const AddDichvuModal = React.createClass({

  handleAddDichvu(e) {

    e.preventDefault()
    const data = {
        ten: this.refs.ten.value,
        gia: this.refs.gia.value
    };
    ManageDichvuAction.addDichvu(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Thêm dịch vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleAddDichvu.bind(this)}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Tên Dịch Vụ</label>
            <input type="text" className="form-control" ref="ten" placeholder="Tên Dịch Vụ" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Giá</label>
            <input type="number" className="form-control" ref="gia" placeholder="Giá" />
          </div>
          <button className="btn btn-success btn-large" type="submit">Thêm Dịch Vụ</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


class Dichvu extends Component {
  constructor(props)
	{
		super(props);
		this.state = ManageDichvuStore.getState();
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
  }

  componentDidMount() {
    ManageDichvuStore.listen(this.onChange);
    ManageDichvuAction.getDichvu();
  }

  componentWillUnmount() {
    ManageDichvuStore.unlisten(this.onChange);
  }

  openMoDDeleteDichvu(id){
    ManageDichvuAction.openMoDDeleteDichvu(id);
  }

  handleDelDichvu(e) {
    var id = this.state.idDel;
    ManageDichvuAction.delDichvu(id);
  }

  showEditDichvu(dichvu){
    ManageDichvuAction.showEditDichvu(dichvu);
  }

  handleEditDichvu(e){
    e.preventDefault();
    var idEdit = this.state.idEdit;
    var tendv = this.state.tendv;
    var giadv = this.state.giadv;
    var access_token = localStorage.getItem('access_token');
    if(access_token){
      if(idEdit){
          ManageDichvuAction.updateDichvu({idEdit: idEdit, tendv: tendv, giadv: giadv, access_token: access_token});
      }
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let listDichvu = this.state.dichvu.map(function(dichvu, index){
      return (
        <tr>
        <td scope="row">{index + 1}</td>
        <td>{dichvu.ten}</td>
        <td>{dichvu.gia}</td>
        <td>
            <button className="btn btn-primary" onClick={this.showEditDichvu.bind(this, dichvu)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            <button className="btn btn-danger" onClick={this.openMoDDeleteDichvu.bind(this, dichvu._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
        </td>
        </tr>
      )
    }, this);

    let addModalClose = () => this.setState({ addModalShow: false });


    return (
      <div className="body-content animated fadeIn no-overflow">
          <div className="row">
                <div className="col-md-12">
                  <ol className="breadcrumb no-overflow">
                      <li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
                      <li>Quản lý tin tức</li>
                  </ol>
                  <div className="panel rounded shadow no-overflow">
                    <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
                      Thêm Dịch Vụ
                    </Button>
                    <AddDichvuModal show={this.state.addModalShow} onHide={addModalClose} />
                    <div className="table-responsive">
                      <table className="table white-bg table-striped table-hover table-success">
                        <thead>
                         <tr>
                           <th>STT</th>
                           <th>Tên Dịch Vụ</th>
                           <th>Giá</th>
                           <th>Hành động</th>

                           </tr>
                         </thead>
                         <tbody>
                          {listDichvu}
                         </tbody>
                      </table>
                    </div>
                  </div>
                </div>
          </div>

          <Modal show={this.state.modalEdit} onHide ={ManageDichvuAction.closeModalEdit}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">Sửa dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Tên Dịch Vụ</label>
                  <input type="text" className="form-control" ref="ten" value={this.state.tendv} onChange={ManageDichvuAction.updateTenDV}/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Giá</label>
                  <input type="number" className="form-control" ref="gia" value={this.state.giadv} onChange={ManageDichvuAction.updateGiaDV}/>
                </div>

            </Modal.Body>
            <Modal.Footer>
              <button
                  className="btn btn-warning"
                onClick={ManageDichvuAction.closeModalEdit}><i className="fa fa-times"> Hủy bỏ</i> </button>
              <button
                  className="btn btn-success"
                onClick={this.handleEditDichvu.bind(this)}><i className="fa fa-check"> Lưu</i> </button>
                <div className="" >{this.state.messUpdate}</div>
            </Modal.Footer>
          </Modal>
          {/* modal xoa item */}
          <Modal show={this.state.modalIsOpenDeleteDichvu} onHide ={ManageDichvuAction.closeModalDeleteDichvu}>
              <Modal.Header>
                <Modal.Title>
                  Xóa
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Bạn có chắc muốn xóa tin này?</p>
              </Modal.Body>
              <Modal.Footer>
                  <button
                      className="btn btn-warning"
                    onClick={ManageDichvuAction.closeModalDeleteDichvu}><i className="fa fa-times"> Hủy bỏ</i> </button>
                  <button
                      className="btn btn-success"
                    onClick={this.handleDelDichvu.bind(this)}><i className="fa fa-check"> Xóa</i> </button>
              </Modal.Footer>
          </Modal>

      </div>
    );
  }
}
export default Dichvu;
