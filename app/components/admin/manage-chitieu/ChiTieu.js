import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import ManageChiTieuAction from '../../../actions/admin/manage-chitieu/ManageChiTieuAction';
import ManageChiTieuStore from '../../../stores/admin/manage-chitieu/ManageChiTieuStore';
import ManagePhongAction from '../../../actions/admin/manage-phong/ManagePhongAction';
import ManagePhongStore from '../../../stores/admin/manage-phong/ManagePhongStore';

const AddChitieuModal = React.createClass({

  handleAddChitieu(e) {

    e.preventDefault()
    const data = {
        nam: this.refs.nam.value,
        phong: this.state.phong,
        namnam1xd: this.refs.namnam1xd.value,
        nunam1xd: this.refs.nunam1xd.value,
        namnam2xd: this.refs.namnam2xd.value,
        nunam2xd: this.refs.nunam2xd.value,
        namnam3xd: this.refs.namnam3xd.value,
        nunam3xd: this.refs.nunam3xd.value,
        namnam4xd: this.refs.namnam4xd.value,
        nunam4xd: this.refs.nunam4xd.value,
        namnam5xd: this.refs.namnam5xd.value,
        nunam5xd: this.refs.nunam5xd.value,
        namnam6xd: this.refs.namnam6xd.value,
        nunam6xd: this.refs.nunam6xd.value,
        diemcb1xd: this.refs.diemcoban1xd.value,
        diemcb2xd: this.refs.diemcoban2xd.value,
        diemcb3xd: this.refs.diemcoban3xd.value,
        diemcb4xd: this.refs.diemcoban4xd.value,
        diemcb5xd: this.refs.diemcoban5xd.value,
        diemcb6xd: this.refs.diemcoban6xd.value,
        namnam1gh: this.refs.namnam1gh.value,
        nunam1gh: this.refs.nunam1gh.value,
        namnam2gh: this.refs.namnam2gh.value,
        nunam2gh: this.refs.nunam2gh.value,
        namnam3gh: this.refs.namnam3gh.value,
        nunam3gh: this.refs.nunam3gh.value,
        namnam4gh: this.refs.namnam4gh.value,
        nunam4gh: this.refs.nunam4gh.value,
        namnam5gh: this.refs.namnam5gh.value,
        nunam5gh: this.refs.nunam5gh.value,
        namnam6gh: this.refs.namnam6gh.value,
        nunam6gh: this.refs.nunam6gh.value,
        diemcb1gh: this.refs.diemcoban1gh.value,
        diemcb2gh: this.refs.diemcoban2gh.value,
        diemcb3gh: this.refs.diemcoban3gh.value,
        diemcb4gh: this.refs.diemcoban4gh.value,
        diemcb5gh: this.refs.diemcoban5gh.value,
        diemcb6gh: this.refs.diemcoban6gh.value

    };
    ManageChiTieuAction.addChiTieu(data);
  },

  handleChangePhong(e) {
    this.setState({phong : e.target.value});
  },

  render() {

    let listPhong = this.props.phong.map(function(phong, index){
      return(
				<option value={phong._id} key={index}>
					{phong.ten}
				</option>
			);
    });

    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Thêm Chỉ Tiêu Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleAddChitieu.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Năm</label>
              <input type="text" className="form-control" ref="nam" placeholder="Năm" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Loại Phòng</label>
              <select className="form-control" onChange={this.handleChangePhong.bind(this)}>
                  <option value='0'>--Chọn--</option>
                  {listPhong}
              </select>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <h3>Xét Duyệt Mới</h3>
              </div>
              <div className="col-md-6">
                <h3>Gia Hạn Cũ</h3>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 1</label>
                <input type="text" className="form-control" ref="namnam1xd" placeholder="Chỉ Tiêu Nam Năm 1" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 1</label>
                <input type="text" className="form-control" ref="namnam1gh" placeholder="Chỉ Tiêu Nam Năm 1" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 1</label>
                <input type="text" className="form-control" ref="nunam1xd" placeholder="Chỉ Tiêu Nữ Năm 1" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 1</label>
                <input type="text" className="form-control" ref="nunam1gh" placeholder="Chỉ Tiêu Nữ Năm 1" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 1</label>
                <input type="number" className="form-control" ref="diemcoban1xd" placeholder="Điểm Cơ Bản Năm 1" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 1</label>
                <input type="number" className="form-control" ref="diemcoban1gh" placeholder="Điểm Cơ Bản Năm 1" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 2</label>
                <input type="text" className="form-control" ref="namnam2xd" placeholder="Chỉ Tiêu Nam Năm 2" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 2</label>
                <input type="text" className="form-control" ref="namnam2gh" placeholder="Chỉ Tiêu Nam Năm 2" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 2</label>
                <input type="text" className="form-control" ref="nunam2xd" placeholder="Chỉ Tiêu Nữ Năm 2" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 2</label>
                <input type="text" className="form-control" ref="nunam2gh" placeholder="Chỉ Tiêu Nữ Năm 2" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 2</label>
                <input type="number" className="form-control" ref="diemcoban2xd" placeholder="Điểm Cơ Bản Năm 2" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 2</label>
                <input type="number" className="form-control" ref="diemcoban2gh" placeholder="Điểm Cơ Bản Năm 2" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 3</label>
                <input type="text" className="form-control" ref="namnam3xd" placeholder="Chỉ Tiêu Nam Năm 3" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 3</label>
                <input type="text" className="form-control" ref="namnam3gh" placeholder="Chỉ Tiêu Nam Năm 3" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 3</label>
                <input type="text" className="form-control" ref="nunam3xd" placeholder="Chỉ Tiêu Nữ Năm 3" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 3</label>
                <input type="text" className="form-control" ref="nunam3gh" placeholder="Chỉ Tiêu Nữ Năm 3" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 3</label>
                <input type="number" className="form-control" ref="diemcoban3xd" placeholder="Điểm Cơ Bản Năm 3" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 3</label>
                <input type="number" className="form-control" ref="diemcoban3gh" placeholder="Điểm Cơ Bản Năm 3" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 4</label>
                <input type="text" className="form-control" ref="namnam4xd" placeholder="Chỉ Tiêu Nam Năm 4" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 4</label>
                <input type="text" className="form-control" ref="namnam4gh" placeholder="Chỉ Tiêu Nam Năm 4" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 4</label>
                <input type="text" className="form-control" ref="nunam4xd" placeholder="Chỉ Tiêu Nữ Năm 4" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 4</label>
                <input type="text" className="form-control" ref="nunam4gh" placeholder="Chỉ Tiêu Nữ Năm 4" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 4</label>
                <input type="number" className="form-control" ref="diemcoban4xd" placeholder="Điểm Cơ Bản Năm 4" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 4</label>
                <input type="number" className="form-control" ref="diemcoban4gh" placeholder="Điểm Cơ Bản Năm 4" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 5</label>
                <input type="text" className="form-control" ref="namnam5xd" placeholder="Chỉ Tiêu Nam Năm 5" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 5</label>
                <input type="text" className="form-control" ref="namnam5gh" placeholder="Chỉ Tiêu Nam Năm 5" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 5</label>
                <input type="text" className="form-control" ref="nunam5xd" placeholder="Chỉ Tiêu Nữ Năm 5" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 5</label>
                <input type="text" className="form-control" ref="nunam5gh" placeholder="Chỉ Tiêu Nữ Năm 5" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 5</label>
                <input type="number" className="form-control" ref="diemcoban5xd" placeholder="Điểm Cơ Bản Năm 5" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 5</label>
                <input type="number" className="form-control" ref="diemcoban5gh" placeholder="Điểm Cơ Bản Năm 5" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 6</label>
                <input type="text" className="form-control" ref="namnam6xd" placeholder="Chỉ Tiêu Nam Năm 6" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 6</label>
                <input type="text" className="form-control" ref="namnam6gh" placeholder="Chỉ Tiêu Nam Năm 6" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 6</label>
                <input type="text" className="form-control" ref="nunam6xd" placeholder="Chỉ Tiêu Nữ Năm 6" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 6</label>
                <input type="text" className="form-control" ref="nunam6gh" placeholder="Chỉ Tiêu Nữ Năm 6" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 6</label>
                <input type="number" className="form-control" ref="diemcoban6xd" placeholder="Điểm Cơ Bản Năm 6" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 6</label>
                <input type="number" className="form-control" ref="diemcoban6gh" placeholder="Điểm Cơ Bản Năm 6" />
              </div>
            </div>
            <button className="btn btn-success btn-large" type="submit">Thêm chỉ tiêu năm mới</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

const UpdateChitieuModal = React.createClass({

  handleUpdateChitieu(e) {

    e.preventDefault()
    const data = {
        nam: this.refs.nam.value,
        phong: this.state.phong,
        namnam1xd: this.refs.namnam1xd.value,
        nunam1xd: this.refs.nunam1xd.value,
        namnam2xd: this.refs.namnam2xd.value,
        nunam2xd: this.refs.nunam2xd.value,
        namnam3xd: this.refs.namnam3xd.value,
        nunam3xd: this.refs.nunam3xd.value,
        namnam4xd: this.refs.namnam4xd.value,
        nunam4xd: this.refs.nunam4xd.value,
        namnam5xd: this.refs.namnam5xd.value,
        nunam5xd: this.refs.nunam5xd.value,
        namnam6xd: this.refs.namnam6xd.value,
        nunam6xd: this.refs.nunam6xd.value,
        diemcb1xd: this.refs.diemcoban1xd.value,
        diemcb2xd: this.refs.diemcoban2xd.value,
        diemcb3xd: this.refs.diemcoban3xd.value,
        diemcb4xd: this.refs.diemcoban4xd.value,
        diemcb5xd: this.refs.diemcoban5xd.value,
        diemcb6xd: this.refs.diemcoban6xd.value,
        namnam1gh: this.refs.namnam1gh.value,
        nunam1gh: this.refs.nunam1gh.value,
        namnam2gh: this.refs.namnam2gh.value,
        nunam2gh: this.refs.nunam2gh.value,
        namnam3gh: this.refs.namnam3gh.value,
        nunam3gh: this.refs.nunam3gh.value,
        namnam4gh: this.refs.namnam4gh.value,
        nunam4gh: this.refs.nunam4gh.value,
        namnam5gh: this.refs.namnam5gh.value,
        nunam5gh: this.refs.nunam5gh.value,
        namnam6gh: this.refs.namnam6gh.value,
        nunam6gh: this.refs.nunam6gh.value,
        diemcb1gh: this.refs.diemcoban1gh.value,
        diemcb2gh: this.refs.diemcoban2gh.value,
        diemcb3gh: this.refs.diemcoban3gh.value,
        diemcb4gh: this.refs.diemcoban4gh.value,
        diemcb5gh: this.refs.diemcoban5gh.value,
        diemcb6gh: this.refs.diemcoban6gh.value

    };
    ManageChiTieuAction.updateChiTieu(data);
  },

  handleChangePhong(e) {
    this.setState({phong : e.target.value});
  },

  render() {

    let listPhong = this.props.phong.map(function(phong, index){
      console.log(phong);
      return(
				<option value={phong._id} key={index}>
					{phong.ten}
				</option>
			);
    });

    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Cập Nhật Chỉ Tiêu Theo Loại Phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleUpdateChitieu.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Năm</label>
              <input type="text" className="form-control" ref="nam" placeholder="Năm" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Loại Phòng</label>
              <select className="form-control" onChange={this.handleChangePhong.bind(this)}>
                  <option value='0'>--Chọn--</option>
                  {listPhong}
              </select>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <h3>Xét Duyệt Mới</h3>
              </div>
              <div className="col-md-6">
                <h3>Gia Hạn Cũ</h3>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 1</label>
                <input type="text" className="form-control" ref="namnam1xd" placeholder="Chỉ Tiêu Nam Năm 1" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 1</label>
                <input type="text" className="form-control" ref="namnam1gh" placeholder="Chỉ Tiêu Nam Năm 1" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 1</label>
                <input type="text" className="form-control" ref="nunam1xd" placeholder="Chỉ Tiêu Nữ Năm 1" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 1</label>
                <input type="text" className="form-control" ref="nunam1gh" placeholder="Chỉ Tiêu Nữ Năm 1" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 1</label>
                <input type="number" className="form-control" ref="diemcoban1xd" placeholder="Điểm Cơ Bản Năm 1" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 1</label>
                <input type="number" className="form-control" ref="diemcoban1gh" placeholder="Điểm Cơ Bản Năm 1" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 2</label>
                <input type="text" className="form-control" ref="namnam2xd" placeholder="Chỉ Tiêu Nam Năm 2" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 2</label>
                <input type="text" className="form-control" ref="namnam2gh" placeholder="Chỉ Tiêu Nam Năm 2" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 2</label>
                <input type="text" className="form-control" ref="nunam2xd" placeholder="Chỉ Tiêu Nữ Năm 2" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 2</label>
                <input type="text" className="form-control" ref="nunam2gh" placeholder="Chỉ Tiêu Nữ Năm 2" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 2</label>
                <input type="number" className="form-control" ref="diemcoban2xd" placeholder="Điểm Cơ Bản Năm 2" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 2</label>
                <input type="number" className="form-control" ref="diemcoban2gh" placeholder="Điểm Cơ Bản Năm 2" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 3</label>
                <input type="text" className="form-control" ref="namnam3xd" placeholder="Chỉ Tiêu Nam Năm 3" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 3</label>
                <input type="text" className="form-control" ref="namnam3gh" placeholder="Chỉ Tiêu Nam Năm 3" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 3</label>
                <input type="text" className="form-control" ref="nunam3xd" placeholder="Chỉ Tiêu Nữ Năm 3" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 3</label>
                <input type="text" className="form-control" ref="nunam3gh" placeholder="Chỉ Tiêu Nữ Năm 3" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 3</label>
                <input type="number" className="form-control" ref="diemcoban3xd" placeholder="Điểm Cơ Bản Năm 3" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 3</label>
                <input type="number" className="form-control" ref="diemcoban3gh" placeholder="Điểm Cơ Bản Năm 3" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 4</label>
                <input type="text" className="form-control" ref="namnam4xd" placeholder="Chỉ Tiêu Nam Năm 4" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 4</label>
                <input type="text" className="form-control" ref="namnam4gh" placeholder="Chỉ Tiêu Nam Năm 4" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 4</label>
                <input type="text" className="form-control" ref="nunam4xd" placeholder="Chỉ Tiêu Nữ Năm 4" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 4</label>
                <input type="text" className="form-control" ref="nunam4gh" placeholder="Chỉ Tiêu Nữ Năm 4" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 4</label>
                <input type="number" className="form-control" ref="diemcoban4xd" placeholder="Điểm Cơ Bản Năm 4" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 4</label>
                <input type="number" className="form-control" ref="diemcoban4gh" placeholder="Điểm Cơ Bản Năm 4" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 5</label>
                <input type="text" className="form-control" ref="namnam5xd" placeholder="Chỉ Tiêu Nam Năm 5" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 5</label>
                <input type="text" className="form-control" ref="namnam5gh" placeholder="Chỉ Tiêu Nam Năm 5" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 5</label>
                <input type="text" className="form-control" ref="nunam5xd" placeholder="Chỉ Tiêu Nữ Năm 5" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 5</label>
                <input type="text" className="form-control" ref="nunam5gh" placeholder="Chỉ Tiêu Nữ Năm 5" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 5</label>
                <input type="number" className="form-control" ref="diemcoban5xd" placeholder="Điểm Cơ Bản Năm 5" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 5</label>
                <input type="number" className="form-control" ref="diemcoban5gh" placeholder="Điểm Cơ Bản Năm 5" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 6</label>
                <input type="text" className="form-control" ref="namnam6xd" placeholder="Chỉ Tiêu Nam Năm 6" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nam năm 6</label>
                <input type="text" className="form-control" ref="namnam6gh" placeholder="Chỉ Tiêu Nam Năm 6" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 6</label>
                <input type="text" className="form-control" ref="nunam6xd" placeholder="Chỉ Tiêu Nữ Năm 6" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Chỉ tiêu nữ năm 6</label>
                <input type="text" className="form-control" ref="nunam6gh" placeholder="Chỉ Tiêu Nữ Năm 6" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 6</label>
                <input type="number" className="form-control" ref="diemcoban6xd" placeholder="Điểm Cơ Bản Năm 6" />
              </div>
              <div className="col-md-6">
                <label for="exampleInputEmail1">Điểm Cơ Bản năm 6</label>
                <input type="number" className="form-control" ref="diemcoban6gh" placeholder="Điểm Cơ Bản Năm 6" />
              </div>
            </div>
            <button className="btn btn-success btn-large" type="submit">Thêm chỉ tiêu theo loại phòng</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

class ChiTieu extends Component {
  constructor(props)
	{
		super(props);
		this.state = {state1 : ManageChiTieuStore.getState(), state2: ManagePhongStore.getState()};
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
    this.state.updateModalShow = false;

  }

  componentDidMount() {
    ManageChiTieuStore.listen(this.onChange);
    ManagePhongStore.listen(this.onChange);
    ManageChiTieuAction.getChitieu();
    ManagePhongAction.getPhong();
  }

  componentWillUnmount() {
    ManageChiTieuStore.unlisten(this.onChange);
    ManagePhongStore.unlisten(this.onChange);
  }

  handleDelChitieu(id) {
    ManageChiTieuAction.delChitieu(id);
  }

  onChange(state) {
    this.setState({state1 : ManageChiTieuStore.getState(), state2: ManagePhongStore.getState()});
  }

  render() {
    let tabArr = this.state.state1.chitieu.map(function(chitieu, index){
      console.log(chitieu);
      return (
        <Tab eventKey={index + 1} title={chitieu.nam}>
        <h1>Chỉ Tiêu Ký Túc Xá Năm {chitieu.nam}</h1>
        {chitieu.chitiet.map(function(chitieu){
          return (
            <div>
              <h3>{chitieu._phong_id.ten}</h3>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                   <tr>
                     <th>#</th>
                     <th>Chỉ Tiêu</th>
                     <th>Loại</th>
                     <th>Nam</th>
                     <th>Nữ</th>
                     <th>Điểm Cơ Bản</th>
                   </tr>
                 </thead>
                 <tbody>
                  <tr>
                    <td>0</td>
                    <td>Năm 1</td>
                    <td>Xét Duyệt</td>
                    <td>{chitieu.nam1.xetduyet.male}</td>
                    <td>{chitieu.nam1.xetduyet.female}</td>
                    <td>{chitieu.nam1.xetduyet.diemcoban}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Gia Hạn</td>
                    <td>{chitieu.nam1.giahan.male}</td>
                    <td>{chitieu.nam1.giahan.female}</td>
                    <td>{chitieu.nam1.giahan.diemcoban}</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Năm 2</td>
                    <td>Xét Duyệt</td>
                    <td>{chitieu.nam2.xetduyet.male}</td>
                    <td>{chitieu.nam2.xetduyet.female}</td>
                    <td>{chitieu.nam2.xetduyet.diemcoban}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Gia Hạn</td>
                    <td>{chitieu.nam2.giahan.male}</td>
                    <td>{chitieu.nam2.giahan.female}</td>
                    <td>{chitieu.nam2.giahan.diemcoban}</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Năm 3</td>
                    <td>Xét Duyệt</td>
                    <td>{chitieu.nam3.xetduyet.male}</td>
                    <td>{chitieu.nam3.xetduyet.female}</td>
                    <td>{chitieu.nam3.xetduyet.diemcoban}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Gia Hạn</td>
                    <td>{chitieu.nam3.giahan.male}</td>
                    <td>{chitieu.nam3.giahan.female}</td>
                    <td>{chitieu.nam3.giahan.diemcoban}</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Năm 4</td>
                    <td>Xét Duyệt</td>
                    <td>{chitieu.nam4.xetduyet.male}</td>
                    <td>{chitieu.nam4.xetduyet.female}</td>
                    <td>{chitieu.nam4.xetduyet.diemcoban}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Gia Hạn</td>
                    <td>{chitieu.nam4.giahan.male}</td>
                    <td>{chitieu.nam4.giahan.female}</td>
                    <td>{chitieu.nam4.giahan.diemcoban}</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Năm 5</td>
                    <td>Xét Duyệt</td>
                    <td>{chitieu.nam5.xetduyet.male}</td>
                    <td>{chitieu.nam5.xetduyet.female}</td>
                    <td>{chitieu.nam5.xetduyet.diemcoban}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Gia Hạn</td>
                    <td>{chitieu.nam5.giahan.male}</td>
                    <td>{chitieu.nam5.giahan.female}</td>
                    <td>{chitieu.nam5.giahan.diemcoban}</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Năm 6</td>
                    <td>Xét Duyệt</td>
                    <td>{chitieu.nam6.xetduyet.male}</td>
                    <td>{chitieu.nam6.xetduyet.female}</td>
                    <td>{chitieu.nam6.xetduyet.diemcoban}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Gia Hạn</td>
                    <td>{chitieu.nam6.giahan.male}</td>
                    <td>{chitieu.nam6.giahan.female}</td>
                    <td>{chitieu.nam6.giahan.diemcoban}</td>
                  </tr>

                 </tbody>
                </table>
              </div>
            </div>
          )
        })}

        <button className="btn btn-large btn-danger" onClick={this.handleDelChitieu.bind(this, chitieu._id)}>Xóa</button>

        </Tab>
      )
    }, this);

    let addModalClose = () => this.setState({ addModalShow: false });
    let updateModalClose = () => this.setState({ updateModalShow: false });

    const props = {phong : this.state.state2.phong};

    return (
      <div>
      <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
        Thêm Chỉ Tiêu Năm Mới
      </Button>
      <AddChitieuModal {...props} show={this.state.addModalShow} onHide={addModalClose} />
      <Button bsStyle="primary" onClick={()=>this.setState({ updateModalShow: true })}>
        Thêm Chỉ Tiêu Theo Loại Phòng
      </Button>
      <UpdateChitieuModal {...props} show={this.state.updateModalShow} onHide={updateModalClose} />

      <Tabs defaultActiveKey={1} id="chitieu">
        {tabArr}
      </Tabs>
      </div>
    );
  }
}
export default ChiTieu;
