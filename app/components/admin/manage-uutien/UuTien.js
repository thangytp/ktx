import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import ManageUuTienAction from '../../../actions/admin/manage-uutien/ManageUuTienAction';
import ManageUuTienStore from '../../../stores/admin/manage-uutien/ManageUuTienStore';

const AddKhuVucModal = React.createClass({

  handleAddKhuVuc(e) {

    e.preventDefault()
    const data = {
        khuvuc: this.refs.khuvuc.value,
        diemkhuvuc: this.refs.diemuutienkv.value,
        makhuvuc: this.refs.makv.value,
    };
    ManageUuTienAction.addKhuvuc(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleAddKhuVuc.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Khu Vực</label>
              <input type="text" className="form-control" ref="khuvuc" placeholder="Khu Vực" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Uư Tiên</label>
              <input type="number" className="form-control" ref="diemuutienkv" placeholder="Điểm Uư Tiên Khu Vực" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Mã Khu Vực</label>
              <input type="text" className="form-control" ref="makv" placeholder="Mã Khu Vực" />
            </div>
            <button className="btn btn-success btn-large" type="submit">Thêm Khu Vực</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});
const AddTinhModal = React.createClass({

  handleAddTinh(e) {

    e.preventDefault()
    const data = {
        tinh: this.refs.tinh.value,
        diemtinh: this.refs.diemuutient.value,
        matinh: this.refs.mat.value,
    };
    ManageUuTienAction.addTinh(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleAddTinh.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Tỉnh</label>
              <input type="text" className="form-control" ref="tinh" placeholder="Tỉnh" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Uư Tiên</label>
              <input type="number" className="form-control" ref="diemuutient" placeholder="Điểm Uư Tiên Tỉnh" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Mã Tỉnh</label>
              <input type="number" className="form-control" ref="mat" placeholder="Mã Tỉnh" />
            </div>
            <button className="btn btn-success btn-large" type="submit">Thêm Tỉnh</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


class UuTien extends Component {
  constructor(props)
	{
		super(props);
		this.state = ManageUuTienStore.getState();
		this.onChange = this.onChange.bind(this);
    this.state.khuvucModalShow = false;
    this.state.tinhModalShow = false;

  }

  componentDidMount() {
    ManageUuTienStore.listen(this.onChange);
    ManageUuTienAction.getKhuvuc();
    ManageUuTienAction.getTinh();

  }

  componentWillUnmount() {
    ManageUuTienStore.unlisten(this.onChange);
  }

  handleDelKhuvuc(id) {
    ManageUuTienAction.delKhuvuc(id);
  }

  handleDelTinh(id) {
    ManageUuTienAction.delTinh(id);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let khuvucModalClose = () => this.setState({ khuvucModalShow: false });
    let tinhModalClose = () => this.setState({ tinhModalShow: false });

    let listkhuvuc = this.state.khuvuc.map(function(khuvuc, khuvucidx){
      return(
        <tr>
         <th scope="row">{khuvucidx}</th>
         <td>{khuvuc.ten}</td>
         <td>{khuvuc.diem}</td>
         <td>{khuvuc.ma}</td>
         {/* <td><button className="btn btn-primary" onClick={this.handleGetKhuvuc.bind(this, khuvuc._id)}>Edit</button></td> */}
         <td><button className="btn btn-danger" onClick={this.handleDelKhuvuc.bind(this, khuvuc._id)}>Delete</button></td>
        </tr>
      )
    }, this);

    let listTinh = this.state.tinh.map(function(tinh, tinhidx){
      return(
        <tr>
         <th scope="row">{tinhidx}</th>
         <td>{tinh.ten}</td>
         <td>{tinh.diem}</td>
         <td>{tinh.ma}</td>
         {/* <td><button className="btn btn-primary" onClick={this.handleGetKhuvuc.bind(this, khuvuc._id)}>Edit</button></td> */}
         <td><button className="btn btn-danger" onClick={this.handleDelTinh.bind(this, tinh._id)}>Delete</button></td>
        </tr>
      )
    }, this);

    return (

      <Tabs defaultActiveKey={1} id="uutien">
        <Tab eventKey={1} title="Khu Vực">
          <Button bsStyle="primary" onClick={()=>this.setState({ khuvucModalShow: true })}>
            Thêm Khu Vực
          </Button>
          <AddKhuVucModal show={this.state.khuvucModalShow} onHide={khuvucModalClose} />
          <div className="table-responsive">
            <table className="table">
              <thead>
               <tr>
                 <th>#</th>
                 <th>Tên Khu Vực</th>
                 <th>Điểm Uư Tiên</th>
                 <th>Mã Khu Vực</th>
                 </tr>
               </thead>
               <tbody>
                {listkhuvuc}
               </tbody>
            </table>
          </div>
        </Tab>
        <Tab eventKey={2} title="Tỉnh">
          <Button bsStyle="primary" onClick={()=>this.setState({ tinhModalShow: true })}>
            Thêm Tỉnh
          </Button>
          <AddTinhModal show={this.state.tinhModalShow} onHide={tinhModalClose} />
          <div className="table-responsive">
            <table className="table">
              <thead>
               <tr>
                 <th>#</th>
                 <th>Tên Tỉnh</th>
                 <th>Điểm Uư Tiên</th>
                 <th>Mã Tỉnh</th>
                 </tr>
               </thead>
               <tbody>
                {listTinh}
               </tbody>
            </table>
          </div>
        </Tab>
      </Tabs>
    );
  }
}
export default UuTien;
