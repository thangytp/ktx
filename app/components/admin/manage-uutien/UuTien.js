import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';

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
          <Modal.Title id="contained-modal-title-lg">Thêm</Modal.Title>
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
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

const EditKhuvucModal = React.createClass({

    handleEditKhuvuc(e) {

      e.preventDefault()
      const data = {
          ten: this.refs.khuvuc.value,
          diem: this.refs.diemuutienkv.value,
          ma: this.refs.makv.value,
          id: this.props.khuvuc._id
      };
      ManageUuTienAction.editKhuvuc(data);
    },

    render() {
      return (
        <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Sửa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleEditKhuvuc.bind(this)}>
              <div className="form-group">
                <label for="exampleInputEmail1">Khu Vực</label>
                <input type="text" className="form-control" ref="khuvuc" placeholder={this.props.khuvuc.ten} />
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Điểm Uư Tiên</label>
                <input type="number" className="form-control" ref="diemuutienkv" placeholder={this.props.khuvuc.diem} />
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Mã Khu Vực</label>
                <input type="text" className="form-control" ref="makv" placeholder={this.props.khuvuc.ma} />
              </div>
              <button className="btn btn-success btn-large" type="submit">Edit Khu Vực</button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Hủy</Button>
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
          <Modal.Title id="contained-modal-title-lg">Thêm</Modal.Title>
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
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

const EditTinhModal = React.createClass({

  handleEditTinh(e) {

    e.preventDefault()
    const data = {
        ten: this.refs.tinh.value,
        diem: this.refs.diemuutient.value,
        ma: this.refs.mat.value,
        id: this.props.tinh._id
    };
    ManageUuTienAction.editTinh(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Sửa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleEditTinh.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Tỉnh</label>
              <input type="text" className="form-control" ref="tinh" placeholder={this.props.tinh.ten} />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Uư Tiên</label>
              <input type="number" className="form-control" ref="diemuutient" placeholder={this.props.tinh.diem} />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Mã Tỉnh</label>
              <input type="number" className="form-control" ref="mat" placeholder={this.props.tinh.ma} />
            </div>
            <button className="btn btn-success btn-large" type="submit">Edit Tỉnh</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
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
          <Modal.Title id="contained-modal-title-lg">Thêm</Modal.Title>
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
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

const EditDoiTuongModal = React.createClass({

  handleEditDoituong(e) {

    e.preventDefault()
    const data = {
        ten: this.refs.doituong.value,
        diem: this.refs.diemuutiendt.value,
        ma: this.refs.madt.value,
        id: this.props.doituong._id
    };
    ManageUuTienAction.editDoituong(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Sửa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleEditDoituong.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Đối Tượng</label>
              <input type="text" className="form-control" ref="doituong" placeholder={this.props.doituong.ten} />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Uư Tiên</label>
              <input type="number" className="form-control" ref="diemuutiendt" placeholder={this.props.doituong.diem} />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Mã Đối Tượng</label>
              <input type="text" className="form-control" ref="madt" placeholder={this.props.doituong.ma} />
            </div>
            <button className="btn btn-success btn-large" type="submit">Edit Đối Tượng</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
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
          <Modal.Title id="contained-modal-title-lg">Thêm</Modal.Title>
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
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

const EditHoclucModal = React.createClass({

  handleEditHocluc(e) {

    e.preventDefault()
    const data = {
        ten: this.refs.hocluc.value,
        diem: this.refs.diemuutienhl.value,
        ma: this.refs.mahl.value,
        id: this.props.hocluc._id
    };
    ManageUuTienAction.editHocluc(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Sửa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleEditHocluc.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Học Lực</label>
              <input type="text" className="form-control" ref="hocluc" placeholder={this.props.hocluc.ten} />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Uư Tiên</label>
              <input type="number" className="form-control" ref="diemuutienhl" placeholder={this.props.hocluc.diem} />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Mã Học Lực</label>
              <input type="text" className="form-control" ref="mahl" placeholder={this.props.hocluc.ma} />
            </div>
            <button className="btn btn-success btn-large" type="submit">Edit Học Lực</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
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
          <Modal.Title id="contained-modal-title-lg">Thêm</Modal.Title>
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
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

const EditHoancanhModal = React.createClass({

  handleEditHoancanh(e) {

    e.preventDefault()
    const data = {
        ten: this.refs.hoancanh.value,
        diem: this.refs.diemuutienhc.value,
        ma: this.refs.mahc.value,
        id: this.props.hoancanh._id
    };
    ManageUuTienAction.editHoancanh(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Sửa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleEditHoancanh.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Hoàn Cảnh</label>
              <input type="text" className="form-control" ref="hoancanh" placeholder={this.props.hoancanh.ten} />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Uư Tiên</label>
              <input type="number" className="form-control" ref="diemuutienhc" placeholder={this.props.hoancanh.diem} />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Mã Hoàn Cảnh</label>
              <input type="text" className="form-control" ref="mahc" placeholder={this.props.hoancanh.ma} />
            </div>
            <button className="btn btn-success btn-large" type="submit">Edit Hoàn Cảnh</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
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
    this.state.editKhuvucModalShow = false;
    this.state.tinhModalShow = false;
    this.state.editTinhModalShow = false;
    this.state.doituongModalShow = false;
    this.state.editDoituongModalShow = false;
    this.state.hoclucModalShow = false;
    this.state.editHoclucModalShow = false;
    this.state.hoancanhModalShow = false;
    this.state.editHoancanhModalShow = false;
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

  handleGetKhuvuc(id) {
    this.setState({ editKhuvucModalShow: true });
    ManageUuTienAction.getEKhuvuc(id);
  }

  handleDelDoituong(id) {
    ManageUuTienAction.delDoituong(id);
  }

  handleGetDoituong(id) {
    this.setState({ editDoituongModalShow: true });
    ManageUuTienAction.getEDoituong(id);
  }

  handleDelHocluc(id) {
    ManageUuTienAction.delHocluc(id);
  }

  handleGetHocluc(id) {
    this.setState({ editHoclucModalShow: true });
    ManageUuTienAction.getEHocluc(id);
  }

  handleDelTinh(id) {
    ManageUuTienAction.delTinh(id);
  }

  handleGetTinh(id) {
    this.setState({ editTinhModalShow: true });
    ManageUuTienAction.getETinh(id);
  }

  handleDelHoancanh(id) {
    ManageUuTienAction.delHoancanh(id);
  }

  handleGetHoancanh(id) {
    this.setState({ editHoancanhModalShow: true });
    ManageUuTienAction.getEHoancanh(id);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let khuvucModalClose = () => this.setState({ khuvucModalShow: false });
    let editKhuvucModalClose = () => this.setState({ editKhuvucModalShow: false });

    let tinhModalClose = () => this.setState({ tinhModalShow: false });
    let editTinhModalClose = () => this.setState({ editTinhModalShow: false });

    let doituongModalClose = () => this.setState({ doituongModalShow: false });
    let editTDoituongModalClose = () => this.setState({ editDoituongModalShow: false });

    let hoclucModalClose = () => this.setState({ hoclucModalShow: false });
    let editHoclucModalClose = () => this.setState({ editHoclucModalShow: false });

    let hoancanhModalClose = () => this.setState({ hoancanhModalShow: false });
    let editHoancanhModalClose = () => this.setState({ editHoancanhModalShow: false });

    const props = {tinh : this.state.tinhe, khuvuc : this.state.khuvuce, doituong : this.state.doituonge, hocluc : this.state.hocluce, hoancanh : this.state.hoancanhe};

    let listkhuvuc = this.state.khuvuc.map(function(khuvuc, khuvucidx){
      return(
        <tr>
         <td scope="row">{khuvucidx}</td>
         <td>{khuvuc.ten}</td>
         <td>{khuvuc.diem}</td>
         <td>{khuvuc.ma}</td>
         <td><button className="btn btn-primary" onClick={this.handleGetKhuvuc.bind(this, khuvuc._id)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
         <button className="btn btn-danger" onClick={this.handleDelKhuvuc.bind(this, khuvuc._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
        </tr>
      )
    }, this);

    let listTinh = this.state.tinh.map(function(tinh, tinhidx){
      return(
        <tr>
         <td scope="row">{tinhidx}</td>
         <td>{tinh.ten}</td>
         <td>{tinh.diem}</td>
         <td>{tinh.ma}</td>
         <td><button className="btn btn-primary" onClick={this.handleGetTinh.bind(this, tinh._id)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
         <button className="btn btn-danger" onClick={this.handleDelTinh.bind(this, tinh._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
        </tr>
      )
    }, this);

    let listDoituong = this.state.doituong.map(function(doituong, doituongidx){
      return(
        <tr>
         <td scope="row">{doituongidx}</td>
         <td>{doituong.ten}</td>
         <td>{doituong.diem}</td>
         <td>{doituong.ma}</td>
         <td><button className="btn btn-primary" onClick={this.handleGetDoituong.bind(this, doituong._id)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
         <button className="btn btn-danger" onClick={this.handleDelDoituong.bind(this, doituong._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
        </tr>
      )
    }, this);

    let listHocluc = this.state.hocluc.map(function(hocluc, hoclucidx){
      return(
        <tr>
         <td scope="row">{hoclucidx}</td>
         <td>{hocluc.ten}</td>
         <td>{hocluc.diem}</td>
         <td>{hocluc.ma}</td>
         <td><button className="btn btn-primary" onClick={this.handleGetHocluc.bind(this, hocluc._id)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
         <button className="btn btn-danger" onClick={this.handleDelHocluc.bind(this, hocluc._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
        </tr>
      )
    }, this);

    let listHoancanh = this.state.hoancanh.map(function(hoancanh, hoancanhidx){
      return(
        <tr>
         <td scope="row">{hoancanhidx}</td>
         <td>{hoancanh.ten}</td>
         <td>{hoancanh.diem}</td>
         <td>{hoancanh.ma}</td>
         <td><button className="btn btn-primary" onClick={this.handleGetHoancanh.bind(this, hoancanh._id)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          <button className="btn btn-danger" onClick={this.handleDelHoancanh.bind(this, hoancanh._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
        </tr>
      )
    }, this);

    return (
      <div className="body-content animated fadeIn no-overflow">
              <div className="row">
                    <div className="col-md-12">
                      <ol className="breadcrumb no-overflow">
                          <li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
                          <li>Ưu tiên</li>
                      </ol>
                          <Tabs defaultActiveKey={1} id="uutien">
                            <Tab eventKey={1} title="Khu Vực">
                              <Button bsStyle="primary" onClick={()=>this.setState({ khuvucModalShow: true })}>
                                Thêm Khu Vực
                              </Button>
                              <AddKhuVucModal show={this.state.khuvucModalShow} onHide={khuvucModalClose} />
                              <EditKhuvucModal {...props} show={this.state.editKhuvucModalShow} onHide={editKhuvucModalClose} />
                              <div className="table-responsive">
                                <table className="table table-striped table-hover table-success">
                                  <thead>
                                   <tr>
                                     <th>#</th>
                                     <th>Tên Khu Vực</th>
                                     <th>Điểm Ưu Tiên</th>
                                     <th>Mã Khu Vực</th>
                                     <th>Hành động</th>
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
                              <EditTinhModal {...props} show={this.state.editTinhModalShow} onHide={editTinhModalClose} />
                              <div className="table-responsive">
                                <table className="table table-striped table-hover table-success">
                                  <thead>
                                   <tr>
                                     <th>#</th>
                                     <th>Tên Tỉnh</th>
                                     <th>Điểm Ưu Tiên</th>
                                     <th>Mã Tỉnh</th>
                                     <th>Hành động</th>
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
                              <EditDoiTuongModal {...props} show={this.state.editDoituongModalShow} onHide={editTDoituongModalClose} />

                              <div className="table-responsive">
                                <table className="table table-striped table-hover table-success">
                                  <thead>
                                   <tr>
                                     <th>#</th>
                                     <th>Tên Đối Tượng</th>
                                     <th>Điểm Ưu Tiên</th>
                                     <th>Mã Đối Tượng</th>
                                     <th>Hành động</th>
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
                              <EditHoclucModal {...props} show={this.state.editHoclucModalShow} onHide={editHoclucModalClose} />

                              <div className="table-responsive">
                                <table className="table table-striped table-hover table-success">
                                  <thead>
                                   <tr>
                                     <th>#</th>
                                     <th>Tên Học Lực</th>
                                     <th>Điểm Ưu Tiên</th>
                                     <th>Mã Học Lực</th>
                                     <th>Hành động</th>
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
                              <EditHoancanhModal {...props} show={this.state.editHoancanhModalShow} onHide={editHoancanhModalClose} />

                              <div className="table-responsive">
                                <table className="table table-striped table-hover table-success">
                                  <thead>
                                   <tr>
                                     <th>#</th>
                                     <th>Tên Hoàn Cảnh Gia Đình</th>
                                     <th>Điểm Ưu Tiên</th>
                                     <th>Mã Hoàn Cảnh Gia Đình</th>
                                     <th>Hành động</th>
                                     </tr>
                                   </thead>
                                   <tbody>
                                    {listHoancanh}
                                   </tbody>
                                </table>
                              </div>
                            </Tab>
                          </Tabs>
                    </div>
                </div>
            </div>
    );
  }
}
export default UuTien;
