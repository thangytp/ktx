import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';

import ManagePhongChitietAction from '../../../actions/admin/manage-phong/ManagePhongChitietAction';
import ManagePhongChitietStore from '../../../stores/admin/manage-phong/ManagePhongChitietStore';

const AddDiennuocModal = React.createClass({

  handleAddDiennuoc(e) {

    e.preventDefault()
    const data = {
        phong: this.props.phong,
        nam: this.refs.nam.value,
        thang: this.refs.thang.value,
        nuoc: this.refs.nuoc.value,
        tiennuoc: this.refs.tiennuoc.value,
        dien: this.refs.dien.value,
        tiendien: this.refs.tiendien.value,

    };
    console.log(data);
    ManagePhongChitietAction.addDiennuoc(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Thêm chỉ số điện nước cho phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleAddDiennuoc.bind(this)}>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Năm</label>
              <input type="number" className="form-control" ref="nam"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Tháng</label>
              <input type="number" className="form-control" ref="thang"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Chỉ số nước</label>
              <input type="number" className="form-control" ref="nuoc" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Tiền nước</label>
              <input type="number" className="form-control" ref="tiennuoc" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Chỉ số điện</label>
              <input type="number" className="form-control" ref="dien" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Tiền điện</label>
              <input type="number" className="form-control" ref="tiendien" />
            </div>
          </div>
          <button className="btn btn-success btn-large" type="submit">Thêm chỉ số điện nước</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


class Diennuoc extends Component {
  constructor(props)
	{
		super(props);
		this.state = ManagePhongChitietStore.getState();
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
    this.state.phongId = '';
  }

  componentDidMount() {
    ManagePhongChitietStore.listen(this.onChange);
    ManagePhongChitietAction.getPhong();
  }

  componentWillUnmount() {
    ManagePhongChitietStore.unlisten(this.onChange);
  }

  handeAddModal(ma) {
    this.setState({ addModalShow: true, phong: ma });
  }

  handleViewDiennuoc(e) {
    e.preventDefault();
    const data = {
      phong: this.refs.phong.value,
      nam: this.refs.nam.value
    }
    ManagePhongChitietAction.viewDiennuoc(data);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let listdiennuoc;
    if(this.state.diennuoc !== undefined) {
      listdiennuoc = this.state.diennuoc.map(function(diennuoc, index){
          return (
            <tr>
             <th scope="row">{index + 1}</th>
             <td>{diennuoc.nam}</td>
             <td>{diennuoc.thang}</td>
             <td>{diennuoc._ma_phong}</td>
             <td>{diennuoc.dien.so}</td>
             <td>{diennuoc.dien.tongtien}</td>
             <td>{diennuoc.nuoc.so}</td>
             <td>{diennuoc.dien.tongtien}</td>
            </tr>
          )
      });
    }
    let addModalClose = () => this.setState({ addModalShow: false });
    let listphongchitiet = this.state.phongchitiet.map(function(phongchitiet, index){

      return(
        <button className="btn btn-large btn-diennuoc btn-success" onClick={this.handeAddModal.bind(this, phongchitiet.ma)}>{phongchitiet.ma}</button>
      );
    },this);
    return (
      <div className="body-content animated fadeIn no-overflow">
          <div className="row">
                <div className="col-md-12">
                  <ol className="breadcrumb">
                      <li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
                      <li>Quản lý điện nước</li>
                  </ol>
                  <div className="panel rounded shadow no-overflow">
                    {/* <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
                      Thêm Dịch Vụ
                    </Button> */}
                    <Tabs defaultActiveKey={1} id="diennuoc">
                      <Tab eventKey={1} title="Thêm điện nước">
                        {listphongchitiet}
                        <AddDiennuocModal phong={this.state.phong} show={this.state.addModalShow} onHide={addModalClose} />
                      </Tab>
                      <Tab eventKey={2} title="Xem lịch sử điện nước">
                        <form onSubmit={this.handleViewDiennuoc.bind(this)}>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Năm</label>
                              <input type="number" className="form-control" ref="nam"/>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Mã Phòng</label>
                              <input type="text" className="form-control" ref="phong"/>
                            </div>
                          </div>
                          <button className="btn btn-success btn-large" type="submit">Thêm chỉ số điện nước</button>
                        </form>
                        <div className="table">
                          <table className="table">
                            <thead>
                             <tr>
                               <th>#</th>
                               <th>Năm</th>
                               <th>Tháng</th>
                               <th>Mã Phòng</th>
                               <th>Chỉ số điện</th>
                               <th>Tiền điện</th>
                               <th>Chỉ số nước</th>
                               <th>Tiền nước</th>
                               </tr>
                             </thead>
                             <tbody>
                              {listdiennuoc}
                             </tbody>
                          </table>
                        </div>
                      </Tab>
                    </Tabs>

                  </div>
                </div>
          </div>
      </div>
    );
  }
}
export default Diennuoc;
