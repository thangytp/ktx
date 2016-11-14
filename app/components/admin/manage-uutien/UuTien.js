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
const AddDoituongModal = React.createClass({

  handleAddDoituong(e) {

    e.preventDefault()
    const data = {
        doituong: this.refs.doituong.value,
        diemdoituong: this.refs.diemuutiendt.value,
        madoituong: this.refs.madt.value,
    };
    ManageUuTienAction.addDoituong(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleAddDoituong.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Đối Tượng</label>
              <input type="text" className="form-control" ref="doituong" placeholder="Đối Tượng" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Uư Tiên</label>
              <input type="number" className="form-control" ref="diemuutiendt" placeholder="Điểm Uư Tiên Đối Tượng" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Mã Đối Tượng</label>
              <input type="text" className="form-control" ref="madt" placeholder="Mã Đối Tượng" />
            </div>
            <button className="btn btn-success btn-large" type="submit">Thêm Đối Tượng</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});
const AddHoclucModal = React.createClass({

  handleAddHocluc(e) {

    e.preventDefault()
    const data = {
        hocluc: this.refs.hocluc.value,
        diemhocluc: this.refs.diemuutienhl.value,
        mahocluc: this.refs.mahl.value,
    };
    ManageUuTienAction.addHocluc(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleAddHocluc.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Học Lực</label>
              <input type="text" className="form-control" ref="hocluc" placeholder="Học Lực" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Uư Tiên</label>
              <input type="number" className="form-control" ref="diemuutienhl" placeholder="Điểm Uư Tiên Học Lực" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Mã Học Lực</label>
              <input type="text" className="form-control" ref="mahl" placeholder="Mã Học Lực" />
            </div>
            <button className="btn btn-success btn-large" type="submit">Thêm Học Lực</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});
const AddHoancanhModal = React.createClass({

  handleAddHoancanh(e) {

    e.preventDefault()
    const data = {
        hoancanh: this.refs.hoancanh.value,
        diemhoancanh: this.refs.diemuutienhc.value,
        mahoancanh: this.refs.mahc.value,
    };
    ManageUuTienAction.addHoancanh(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleAddHoancanh.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Hoàn Cảnh</label>
              <input type="text" className="form-control" ref="hoancanh" placeholder="Hoàn Cảnh" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Uư Tiên</label>
              <input type="number" className="form-control" ref="diemuutienhc" placeholder="Điểm Uư Tiên Hoàn Cảnh" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Mã Hoàn Cảnh</label>
              <input type="text" className="form-control" ref="mahc" placeholder="Mã Hoàn Cảnh" />
            </div>
            <button className="btn btn-success btn-large" type="submit">Thêm Hoàn Cảnh</button>
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
    this.state.doituongModalShow = false;
    this.state.hoclucModalShow = false;
    this.state.hoancanhModalShow = false;

  }

  componentDidMount() {
    ManageUuTienStore.listen(this.onChange);
    ManageUuTienAction.getKhuvuc();
    ManageUuTienAction.getTinh();
    ManageUuTienAction.getDoituong();
    ManageUuTienAction.getHocluc();
    ManageUuTienAction.getHoancanh();


  }

  componentWillUnmount() {
    ManageUuTienStore.unlisten(this.onChange);
  }

  handleDelKhuvuc(id) {
    ManageUuTienAction.delKhuvuc(id);
  }

  handleDelDoituong(id) {
    ManageUuTienAction.delDoituong(id);
  }

  handleDelHocluc(id) {
    ManageUuTienAction.delHocluc(id);
  }

  handleDelTinh(id) {
    ManageUuTienAction.delTinh(id);
  }

  handleDelHoancanh(id) {
    ManageUuTienAction.delHoancanh(id);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let khuvucModalClose = () => this.setState({ khuvucModalShow: false });
    let tinhModalClose = () => this.setState({ tinhModalShow: false });
    let doituongModalClose = () => this.setState({ doituongModalShow: false });
    let hoclucModalClose = () => this.setState({ hoclucModalShow: false });
    let hoancanhModalClose = () => this.setState({ hoancanhModalShow: false });


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

    let listDoituong = this.state.doituong.map(function(doituong, doituongidx){
      return(
        <tr>
         <th scope="row">{doituongidx}</th>
         <td>{doituong.ten}</td>
         <td>{doituong.diem}</td>
         <td>{doituong.ma}</td>
         {/* <td><button className="btn btn-primary" onClick={this.handleGetKhuvuc.bind(this, khuvuc._id)}>Edit</button></td> */}
         <td><button className="btn btn-danger" onClick={this.handleDelDoituong.bind(this, doituong._id)}>Delete</button></td>
        </tr>
      )
    }, this);

    let listHocluc = this.state.hocluc.map(function(hocluc, hoclucidx){
      return(
        <tr>
         <th scope="row">{hoclucidx}</th>
         <td>{hocluc.ten}</td>
         <td>{hocluc.diem}</td>
         <td>{hocluc.ma}</td>
         {/* <td><button className="btn btn-primary" onClick={this.handleGetKhuvuc.bind(this, khuvuc._id)}>Edit</button></td> */}
         <td><button className="btn btn-danger" onClick={this.handleDelHocluc.bind(this, hocluc._id)}>Delete</button></td>
        </tr>
      )
    }, this);

    let listHoancanh = this.state.hoancanh.map(function(hoancanh, hoancanhidx){
      return(
        <tr>
         <th scope="row">{hoancanhidx}</th>
         <td>{hoancanh.ten}</td>
         <td>{hoancanh.diem}</td>
         <td>{hoancanh.ma}</td>
         {/* <td><button className="btn btn-primary" onClick={this.handleGetKhuvuc.bind(this, khuvuc._id)}>Edit</button></td> */}
         <td><button className="btn btn-danger" onClick={this.handleDelHoancanh.bind(this, hoancanh._id)}>Delete</button></td>
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
        <Tab eventKey={3} title="Đối Tượng">
          <Button bsStyle="primary" onClick={()=>this.setState({ doituongModalShow: true })}>
            Thêm Đối Tượng
          </Button>
          <AddDoituongModal show={this.state.doituongModalShow} onHide={doituongModalClose} />
          <div className="table-responsive">
            <table className="table">
              <thead>
               <tr>
                 <th>#</th>
                 <th>Tên Đối Tượng</th>
                 <th>Điểm Uư Tiên</th>
                 <th>Mã Đối Tượng</th>
                 </tr>
               </thead>
               <tbody>
                {listDoituong}
               </tbody>
            </table>
          </div>
        </Tab>
        <Tab eventKey={4} title="Học Lực">
          <Button bsStyle="primary" onClick={()=>this.setState({ hoclucModalShow: true })}>
            Thêm Học Lực
          </Button>
          <AddHoclucModal show={this.state.hoclucModalShow} onHide={hoclucModalClose} />
          <div className="table-responsive">
            <table className="table">
              <thead>
               <tr>
                 <th>#</th>
                 <th>Tên Học Lực</th>
                 <th>Điểm Uư Tiên</th>
                 <th>Mã Học Lực</th>
                 </tr>
               </thead>
               <tbody>
                {listHocluc}
               </tbody>
            </table>
          </div>
        </Tab>
        <Tab eventKey={5} title="Hoàn Cảnh Gia Đình">
          <Button bsStyle="primary" onClick={()=>this.setState({ hoancanhModalShow: true })}>
            Thêm Hoàn Cảnh Gia Đình
          </Button>
          <AddHoancanhModal show={this.state.hoancanhModalShow} onHide={hoancanhModalClose} />
          <div className="table-responsive">
            <table className="table">
              <thead>
               <tr>
                 <th>#</th>
                 <th>Tên Hoàn Cảnh Gia Đình</th>
                 <th>Điểm Uư Tiên</th>
                 <th>Mã Hoàn Cảnh Gia Đình</th>
                 </tr>
               </thead>
               <tbody>
                {listHoancanh}
               </tbody>
            </table>
          </div>
        </Tab>
      </Tabs>
    );
  }
}
export default UuTien;