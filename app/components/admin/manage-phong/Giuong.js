import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import ManagePhongChitietAction from '../../../actions/admin/manage-phong/ManagePhongChitietAction';
import ManagePhongChitietStore from '../../../stores/admin/manage-phong/ManagePhongChitietStore';
import ManagePhongAction from '../../../actions/admin/manage-phong/ManagePhongAction';
import ManagePhongStore from '../../../stores/admin/manage-phong/ManagePhongStore';

const AddGiuongModal = React.createClass({

  getInitialState: function() {
    return {listPhongChitiet: []};
  },

  handleAddGiuong(e) {

    e.preventDefault()
    const data = {
        tengiuong: this.refs.ten.value,
        tenphong: this.state.tenphong
    };
    var phongId = this.state.tenphong
    var phongSelected = this.props.phongchitiet.filter(function(obj) {
        return obj._id == phongId;
    });
    if(phongSelected[0].giuong.length < phongSelected[0]._loai.kichco) {
      ManagePhongChitietAction.addGiuong(data);
    }
  },

  handleChangePhong(e) {
    var phongchitiet = this.props.phongchitiet;

    var phongByLoai = phongchitiet.filter(function(obj) {
        return obj._loai._id == e.target.value;
    });
    this.setState({listPhongChitiet : phongByLoai});
  },

  handleChangePhongChitiet(e) {
    this.setState({tenphong : e.target.value});
  },

  render() {

    let listPhong
    if(this.props.phong != null) {
      listPhong = this.props.phong.map(function(phong, index){
        return(
  				<option value={phong._id} key={index}>
  					{phong.loai}
  				</option>
  			);
      });
    } else {
      listPhong = '';
    }

    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleAddGiuong.bind(this)}>
          <div className="form-group">
            <label for="exampleInputPassword1">Loại Phòng</label>
            <select className="form-control" onChange={this.handleChangePhong.bind(this)}>
                <option value='0'>--Chọn--</option>
                {listPhong}
            </select>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Phòng</label>
            <select className="form-control" onChange={this.handleChangePhongChitiet.bind(this)}>
                <option value='0'>--Chọn--</option>
                {this.state.listPhongChitiet.map(function(phongchitiet, index){
                  return (
                    <option value={phongchitiet._id} key={index}>
                      {phongchitiet.ma}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Tên Giường</label>
            <input type="text" className="form-control" ref="ten" placeholder="Mã Phòng" />
          </div>
          <button className="btn btn-success btn-large" type="submit">Thêm Giường</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


class Giuong extends Component {
  constructor(props)
	{
		super(props);
		this.state = {state1: ManagePhongStore.getState(), state2: ManagePhongChitietStore.getState()};
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
  }

  componentDidMount() {
    ManagePhongStore.listen(this.onChange);
    ManagePhongChitietStore.listen(this.onChange);
    ManagePhongAction.getPhong();
    ManagePhongChitietAction.getPhong();
  }

  componentWillUnmount() {
    ManagePhongStore.unlisten(this.onChange);
    ManagePhongChitietStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({state1: ManagePhongStore.getState(), state2: ManagePhongChitietStore.getState()});
  }

  render() {

    let listGiuongChitiet = this.state.state2.phongchitiet.map(function(phongchitiet, index){
      return(
        phongchitiet.giuong.map(function(giuong, index){
            return(
              <tr>
              <th scope="row">{index + 1}</th>
              <td>{phongchitiet.ma}</td>
              <td>{giuong.ten}</td>
              </tr>
            )
          })
        )
    }, this);

    console.log(listGiuongChitiet);

    let addModalClose = () => this.setState({ addModalShow: false });

    const props = {phong : this.state.state1.phong, phongchitiet : this.state.state2.phongchitiet};

    return (
      <div>
      <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
        Thêm Giường
      </Button>
      <AddGiuongModal {...props} show={this.state.addModalShow} onHide={addModalClose} />
      <h1>Giường Ký Túc Xá</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
           <tr>
             <th>#</th>
             <th>Mã Phòng</th>
             <th>Tên Giường</th>
             <th></th>
             <th></th>
             </tr>
           </thead>
           <tbody>
            {listGiuongChitiet}
           </tbody>
        </table>
      </div>
      </div>
    );
  }
}
export default Giuong;
