import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';

import ManagePhongAction from '../../../actions/admin/manage-phong/ManagePhongAction';
import ManagePhongStore from '../../../stores/admin/manage-phong/ManagePhongStore';

const AddPhongModal = React.createClass({

  handleAddPhong(e) {
    e.preventDefault();
    const data = {
        access_token: localStorage.getItem('access_token'),
        ten: this.refs.ten.value,
        loai: this.refs.loai.value,
        gia: this.refs.gia.value,
        kichco: this.refs.songuoi.value,
        soluong: this.refs.soluong.value
    };
    ManagePhongAction.addPhong(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Thêm phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleAddPhong.bind(this)}>
          <div className="form-group">
            <label htmlFor="ten-phong">Tên Phòng</label>
            <input type="text" id="ten-phong" className="form-control" ref="ten" placeholder="Tên Phòng" />
          </div>
          <div className="form-group">
            <label htmlFor="loai-phong">Loại Phòng</label>
            <input type="number" id="loai-phong" className="form-control" ref="loai" placeholder="Loại Phòng" />
            <div className="">1: Phòng thường, 2: Phòng dịch vụ tầng 10, 3: Phòng tầng 11, 4: Phòng tầng 12</div>
          </div>
          <div className="form-group">
            <label htmlFor="gia">Giá</label>
            <input type="number" className="form-control" ref="gia" placeholder="Giá" />
          </div>
          <div className="form-group">
            <label htmlFor="so-nguoi">Số người</label>
            <input type="Number" id="so-nguoi" className="form-control" ref="songuoi" placeholder="Số người" />
          </div>
          <div className="form-group">
            <label htmlFor="so-luong">Số Lượng</label>
            <input type="Number" id="so-luong" className="form-control" ref="soluong" placeholder="Số Lượng" />
          </div>
          <button className="btn btn-success btn-large" type="submit">Thêm Loại Phòng</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


class Phong extends Component {
  constructor(props)
	{
		super(props);
		this.state = ManagePhongStore.getState();
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
  }

  componentDidMount() {
    ManagePhongStore.listen(this.onChange);
    ManagePhongAction.getPhong();
  }

  componentWillUnmount() {
    ManagePhongStore.unlisten(this.onChange);
  }

  openMoDDeletePhong(id){
    ManagePhongAction.openMoDDeletePhong(id);
  }
  handleDelPhong(e) {
    var id = this.state.idDel;
    var access_token = localStorage.getItem('access_token');
    ManagePhongAction.delPhong({access_token: access_token, id: id});
  }
  handleGetPhong(phong){
    ManagePhongAction.handleGetPhong(phong);
  }

  updatePhong(){
    var access_token = localStorage.getItem('access_token');
    var idEdit = this.state.idEdit;
    var tenEdit = this.state.tenEdit.trim();
    var loaiEdit = this.state.loaiEdit;
    var giaEdit = this.state.giaEdit;
    var kichcoEdit = this.state.kichcoEdit;
    var soluongEdit = this.state.soluongEdit;

    if(access_token){
      if(idEdit){
        ManagePhongAction.updatePhong({access_token: access_token, idEdit: idEdit, tenEdit: tenEdit, loaiEdit: loaiEdit,
          giaEdit: giaEdit, kichcoEdit: kichcoEdit, soluongEdit: soluongEdit});
      }
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let listPhong = this.state.phong.map(function(phong, index){
      return (
        <tr>
        <td scope="row">{index + 1}</td>
        <td>{phong.ten}</td>
        <td>{phong.loai}</td>
        <td>{phong.gia}</td>
        <td>{phong.kichco + ' người'}</td>
        <td>{phong.soluong + ' phòng'}</td>
        <td>
            <button className="btn btn-primary" onClick={this.handleGetPhong.bind(this, phong)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            <button className="btn btn-danger" onClick={this.openMoDDeletePhong.bind(this, phong._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
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
              <li>Loại phòng</li>
            </ol>
            <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
              Thêm Loại Phòng Năm Mới
            </Button>
            <AddPhongModal show={this.state.addModalShow} onHide={addModalClose} />
            <div className="table-responsive">
              <table className="table white-bg table-striped table-hover table-success">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Loại Phòng</th>
                    <th>Gía</th>
                    <th>Kích Cỡ</th>
                    <th>Số Lượng</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {listPhong}
                </tbody>
              </table>
            </div>
            <Modal show={this.state.modalIsOpen} onHide ={ManagePhongAction.closeModal}>
                <Modal.Header>
                  <Modal.Title>
                    Sửa
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" >Tên phòng</label>
                    <input type="text" className="form-control" ref="ten" value={this.state.tenEdit}
                        onChange={ManagePhongAction.updateTenLoaiPhong}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="loai-phong">Loại Phòng</label>
                    <input type="number" id="loai-phong" className="form-control" ref="loai" placeholder="Loại Phòng"
                        onChange={ManagePhongAction.updateLoaiPhong} value={this.state.loaiEdit}/>
                    <div className="">1: Phòng thường, 2: Phòng dịch vụ tầng 10, 3: Phòng tầng 11, 4: Phòng tầng 12</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="gia">Giá</label>
                    <input type="number" className="form-control" ref="gia" placeholder="Giá" value={this.state.giaEdit}
                        onChange={ManagePhongAction.updateGiaLoaiPhong}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="so-nguoi">Số người</label>
                    <input type="Number" id="so-nguoi" className="form-control" ref="songuoi" placeholder="Số người"
                        onChange={ManagePhongAction.updateSoNguoi} value={this.state.kichcoEdit}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="so-luong">Số Lượng</label>
                    <input type="Number" id="so-luong" className="form-control" ref="soluong" placeholder="Số Lượng"
                        onChange={ManagePhongAction.updateSoLuong} value={this.state.soluongEdit}/>
                  </div>

                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-warning"
                      onClick={ManagePhongAction.closeModal}><i className="fa fa-times"> Hủy bỏ</i> </button>
                    <button
                        className="btn btn-success"
                      onClick={this.updatePhong.bind(this)}><i className="fa fa-check"> Lưu</i> </button>
                    <div >{this.state.messUpdate}</div>
                </Modal.Footer>
            </Modal>
            <Modal show={this.state.modalIsOpenDelete} onHide ={ManagePhongAction.closeModalDelete}>
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
                      onClick={ManagePhongAction.closeModalDelete}><i className="fa fa-times"> Hủy bỏ</i> </button>
                    <button
                        className="btn btn-success"
                      onClick={this.handleDelPhong.bind(this)}><i className="fa fa-check"> Xóa</i> </button>
                </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
export default Phong;
