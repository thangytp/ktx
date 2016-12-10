import React from 'react';
import {Link} from 'react-router'
import {Modal, Button} from 'react-bootstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import ManageUserStore from '../../../stores/admin/manage-user/ManageUserStore';
import ManageUuTienAction from '../../../actions/admin/manage-uutien/ManageUuTienAction';
import ManageUuTienStore from '../../../stores/admin/manage-uutien/ManageUuTienStore';

import ManagePhongAction from '../../../actions/admin/manage-phong/ManagePhongAction';
import ManagePhongStore from '../../../stores/admin/manage-phong/ManagePhongStore';

import KhoaAdminStore from '../../../stores/admin/khoa/KhoaAdminStore';
import KhoaAdminAction from '../../../actions/admin/khoa/KhoaAdminAction';
import HeDaoTaoStore from '../../../stores/admin/hedaotao/HeDaoTaoStore';
import HeDaoTaoAction from '../../../actions/admin/hedaotao/HeDaoTaoAction';

import ImgUpload from '../../../shared/ImgUpload';

var FormUpload = React.createClass({
    uploadFile: function (e) {
        var fd = new FormData();
        fd.append('file', this.refs.file.getDOMNode().files[0]);
        ManageUserAction.importUser(fd);
        e.preventDefault()
    },
    render: function() {
        return (
            <div>
               <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
                   <input ref="file" type="file" name="file" className="upload-file"/>
                   <input type="button" ref="button" value="Upload" onClick={this.uploadFile.bind(this)} />
               </form>
            </div>
        );
    }
});


const AddUserModal = React.createClass({

  handleAddUser(e) {

    e.preventDefault()
    const data = {
        email: this.refs.email.value,
        mssv: this.refs.code.value
    };
    ManageUserAction.addUser(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Thêm sinh viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleAddUser.bind(this, event)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input type="email" className="form-control" ref="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">MSSV</label>
              <input type="number" className="form-control" ref="code" placeholder="Code" />
            </div>
            <div className="form-group">
              <label for="Avatar">Ảnh đại diện</label>
              <input type="file" ref="avatar" />
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

const EditUserModal = React.createClass({
  getInitialState: function() {
    return {state: ManageUserStore.getState()};
  },
  onChange: function(state){
    this.setState(state);
  },
  handleEditUser(e) {

    e.preventDefault()
    const data = {
        email: this.refs.email.value,
        id: this.props.user._id,
        holot: this.refs.holot.value,
        ten: this.refs.ten.value,
        khuvuc: this.refs.khuvuc.value,
        tinh: this.props.user.tinh,
        doituong: this.props.user.doituong,
        hocluc: this.props.user.hocluc,
        hoancanh: this.props.user.hoancanh
    };
    console.log(data);
    // ManageUserAction.editUser(data);
  },

  handleChangeKhuvuc(e) {
    this.setState({khuvuc : e.target.value});
  },

  handleChangeTinh(e) {
    this.setState({tinh : e.target.value});
  },

  handleChangeDoituong(e) {
    this.setState({doituong : e.target.value});
  },

  handleChangeHocluc(e) {
    this.setState({hocluc : e.target.value});
  },

  handleChangeHoancanh(e) {
    this.setState({hoancanh : e.target.value});
  },

  render() {

    let listKhuvuc = this.props.khuvuc.map(function(khuvuc, index){
      return(
				<option value={khuvuc._id} key={index}>
					{khuvuc.ten}
				</option>
			);
    });
    let listTinh = this.props.tinh.map(function(tinh, index){
      return(
				<option value={tinh._id} key={index}>
					{tinh.ten}
				</option>
			);
    });
    let listDoituong = this.props.doituong.map(function(doituong, index){
      return(
				<option value={doituong._id} key={index}>
					{doituong.ten}
				</option>
			);
    });
    let listHocluc = this.props.hocluc.map(function(hocluc, index){
      return(
				<option value={hocluc._id} key={index}>
					{hocluc.ten}
				</option>
			);
    });
    let listHoancanh = this.props.hoancanh.map(function(hoancanh, index){
      return(
				<option value={hoancanh._id} key={index}>
					{hoancanh.ten}
				</option>
			);
    });

    let listKhoa = this.props.khoa.map(function(khoa, index){
      return (
            <option value={khoa._id} key={index}>{khoa.ten}</option>
        );
    });
    let listHeDaoTao = this.props.hedaotao.map(function(hdt, index){
      return (
            <option value={hdt._id} key={index}>{hdt.ten}</option>
        );
    });

    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Sửa thông tin sinh viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleEditUser.bind(this)} className="form-horizontal">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="col-md-3 control-label">Email</label>
              <div className="col-md-7">
                <input type="email" className="form-control" ref="email" value={this.props.user.email} disable="disabled"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">MSSV</label>
              <div className="col-md-7">
                <input type="number" className="form-control" ref="code" value={this.props.user.ma_sinh_vien} disable="disabled"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputHoLot1" className="col-md-3 control-label">Họ lót</label>
              <div className="col-md-7">
                <input type="text" className="form-control" ref="holot" value={this.state.holot} 
                  onChange={ManageUserAction.updateHoLot} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputTen1" className="col-md-3 control-label">Tên</label>
              <div className="col-md-7">
                <input type="text" className="form-control" ref="ten" value={this.state.ten} 
                    onChange={ManageUserAction.updateTen} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Khu Vực</label>
              <div className="col-md-7">
                <select className="form-control" onChange={this.handleChangeKhuvuc.bind(this)} value={this.state.svkhuvuc}>
                  <option value='0'>--Chọn--</option>
                  {listKhuvuc}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Giới tính</label>
              <div className="col-md-7">
                <select className="form-control" ref="gioitinh" onChange={ManageUserAction.updateGioiTinh} value={this.state.gioitinh}>
                    <option value='0'>--Chọn--</option>
                    <option value="m">Nam</option>
                    <option value="f">Nữ</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputTen1" className="col-md-3 control-label">Ngày sinh</label>
              <div className="col-md-7">
                <input type="date" className="form-control" ref="ngaysinh" value={this.state.ngaySinh} onChange={ManageUserAction.updateNgaySinh} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Tỉnh</label>
              <div className="col-md-7">
                <select className="form-control" ref="tinh" onChange={this.handleChangeTinh.bind(this)} value={this.state.svtinh}>
                    <option value='0'>--Chọn--</option>
                    {listTinh}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Khoa</label>
              <div className="col-md-7">
                <select className="form-control" ref="khoa" onChange={ManageUserAction.updateKhoa} value={this.state.svkhoa}>
                    <option value='0'>--Chọn--</option>
                    {listKhoa}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Hệ đào tạo</label>
              <div className="col-md-7">
                <select className="form-control" ref="hedaotao" onChange={ManageUserAction.updateHeDaoTao} value={this.state.svhedaotao}>
                    <option value='0'>--Chọn--</option>
                    {listHeDaoTao}
                </select>
              </div>
            </div>
            <div className={'form-group  ' }>
              <label htmlFor="nam-vao-truong" className="col-md-3 control-label">Năm vào trường<span className="text-danger">(*)</span></label>
              <div className="col-md-7">
                  <input type='number' className="form-control" id='nam-vao-truong' value={this.state.namvaotruong}
                    onChange={ManageUserAction.updateNamVaoTruong} ref='namvaotruong'/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Dân tộc</label>
              <div className="col-md-7">
                <select className="form-control" onChange={this.handleChangeDoituong.bind(this)} value={this.state.svdoituong}>
                    <option value='0'>--Chọn--</option>
                    {listDoituong}
                </select>
              </div>
            </div>
            <div className={'form-group  ' } >
              <label htmlFor="ton-giao" className="col-md-3 control-label">Tôn giáo<span className="text-danger">(*)</span></label>
              <div className="col-md-7">
                  <input type='text' className="form-control" id='ton-giao' value={this.state.svtongiao}
                    onChange={ManageUserAction.updateTonGiao} ref='tongiao'/>
              </div>
            </div>
            <div className={'form-group ' } >
              <label htmlFor="doan-the" className="col-md-3 control-label">Đoàn thể<span className="text-danger">(*)</span></label>
              <div className="col-md-7">
                  <select className="form-control" id="doan-the" value={this.state.svdoanthe}
                     onChange={ManageUserAction.updateDoanThe} ref='doanthe'>
                    <option value =''>-- Chọn đoàn thể --</option>
                    <option value='k'>Không</option>
                    <option value='dangvien'>Đảng viên</option>
                    <option value='doanvien'>Đoàn viên</option>

                  </select>
              </div>
            </div>
            <div className={'form-group  ' } >
              <label htmlFor="cmnd" className="col-md-3 control-label">Số CMND<span className="text-danger">(*)</span></label>
              <div className="col-md-7">
                  <input type='number' className="form-control" id='cmnd' value={this.state.socmnd}
                    onChange={ManageUserAction.updateSoCMND} ref='socmnd'/>
              </div>
            </div>
            <div className={'form-group ' } >
                                  <label htmlFor="ho-khau" className="col-md-3 control-label">Hộ khẩu thường trú<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <input type='text' className="form-control" id='ho-khau' value={this.state.hokhau}
                                       onChange={ManageUserAction.updateHoKhau} ref='hokhau'/>
                                  </div>
                                </div>
            <div className={'form-group ' } >
              <label htmlFor="dien-thoai-sv" className="col-md-3 control-label">Điện thoại sinh viên<span className="text-danger">(*)</span></label>
              <div className="col-md-7">
                  <input type='tel' className="form-control" id='dien-thoai-sv' value={this.state.svdienthoai}
                    onChange={ManageUserAction.updateDienThoaiSV} ref='sdtsinhvien'/>
                  <div className=''><span className="control-label text-danger">{}</span></div>
              </div>
            </div>
          {/*dien thoai gia dinh*/}
            <div className={'form-group ' } >
              <label htmlFor="dien-thoai-gia-dinh" className="col-md-3 control-label">Điện thoại gia đình<span className="text-danger">(*)</span></label>
              <div className="col-md-7">
                  <input type='tel' className="form-control" id='dien-thoai-gia-dinh' value={this.state.giadinhdienthoai}
                    onChange={ManageUserAction.updateDienThoaiGiaDinh} ref='sdtgiadinh'/>
                  <div className=''><span className="control-label text-danger">{}</span></div>
              </div>
            </div>
          {/*dien thoai gia dinh*/}
            <div className={'form-group ' } >
              <label htmlFor="email-thuong-dung" className="col-md-3 control-label">Email thường dùng</label>
              <div className="col-md-7">
                  <input type='email' className="form-control" id='email-thuong-dung' value={this.state.emailThuongDung}
                    onChange={ManageUserAction.updateEmailThuongDung} ref='emailkhac'/>
                  <div className=''><span className="control-label text-danger">{}</span></div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Học Lực</label>
              <div className="col-md-7">
                  <select className="form-control" onChange={this.handleChangeHocluc.bind(this)} value={this.state.svhocluc}>
                      <option value='0'>--Chọn--</option>
                      {listHocluc}
                  </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Hoàn Cảnh Gia Đình</label>
              <div className="col-md-7">
                <select className="form-control" onChange={this.handleChangeHoancanh.bind(this)} value={this.state.svhoancanh}>
                    <option value='0'>--Chọn--</option>
                    {listHoancanh}
                </select>
              </div>
            </div>
            <div className={'form-group  ' }>
              <label htmlFor="phong-luu-tru" className="col-md-3 control-label">Nguyện vọng lưu trú<span className="text-danger">(*)</span></label>
              <div className="col-md-7">
                  <select className="form-control" id="phong-luu-tru" onChange={ManageUserAction.updateTen} 
                      value={this.state.svloaiphong} ref='loaiphong'>
                    <option value=''>-- Chọn loại phòng --</option>
                    
                  </select>
                  <div className=''><span className="control-label text-danger">{}</span></div>
              </div>
            </div>
            <div className={'form-group  ' } style={{'display':'none'}}>
              <label htmlFor="dich-vu-phong-thuong" className="col-md-3 control-label">Dịch vụ<span className="text-danger">(*)</span></label>
              <div className="col-md-7">

                 
                  
                  <div className=''><span className="control-label text-danger"></span></div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="Avatar">Ảnh đại diện</label>
              <input type="file" ref="avatar" />
            </div>
            <button className="btn btn-success btn-large" type="submit">Lưu</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

class ManageStudent extends React.Component {

  constructor(props)
	{
		super(props);
		this.state = {state1 : ManageUserStore.getState(), state2 : ManageUuTienStore.getState(), khuvuc : '', tinh: '', doituong: '', hocluc: '', hoancanh: '',
                  state3: KhoaAdminStore.getState(), state4: HeDaoTaoStore.getState(), state5: ManagePhongStore.getState()};
    // this.state = {};
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
    this.state.editModalShow = false;

  }

  componentWillMount() {

  }

  componentDidMount() {
    ManageUserStore.listen(this.onChange);
    ManageUserAction.getUsers();
    ManageUuTienAction.getKhuvuc();
    ManageUuTienAction.getTinh();
    ManageUuTienAction.getDoituong();
    ManageUuTienAction.getHocluc();
    ManageUuTienAction.getHoancanh();
    KhoaAdminAction.getListKhoa();
    HeDaoTaoAction.getListHeDaoTao();

    ManagePhongAction.getPhong();
  }

  componentWillUnmount() {
    ManageUserStore.unlisten(this.onChange);
  }

  handleDelStudent(userId) {
    ManageUserAction.deleteUser(userId);
  }

  handleGetStudent(userId) {
    this.setState({ editModalShow: true });
    ManageUserAction.getUser(userId);
  }

  handleChangeNgaySinh(date){
    ManageUserAction.updateNgaySinh(date);
  }

  handleEditUser(e) {

    e.preventDefault()
    const data = {
        email: this.refs.email.value,
        id: this.props.user._id,
        holot: this.refs.holot.value,
        ten: this.refs.ten.value,
        khuvuc: this.refs.khuvuc.value,
        tinh: this.props.user.tinh,
        doituong: this.props.user.doituong,
        hocluc: this.props.user.hocluc,
        hoancanh: this.props.user.hoancanh
    };
    console.log(data);
    // ManageUserAction.editUser(data);
  }
  upload(event)
  {
      var imgfile = this.state.state1.fileAvatar;
      var imgURL = this.state.state1.imagePreviewUrl;
      ManageUserAction.handleUpload();
      ManageUserAction.uploadImage(imgfile);
  }
  detele(event)
  {
      console.log(this.state.state1.imageUrl);
  }

  closeMDEdit(){
    this.setState({ editModalShow: false });
  }

  onChange(state) {
    this.setState({state1 : ManageUserStore.getState(), state2 : ManageUuTienStore.getState(),  
        state3: KhoaAdminStore.getState(), state4: HeDaoTaoStore.getState(), state5: ManagePhongStore.getState()});
  }

  render() {

    let listKhuvuc = this.state.state2.khuvuc.map(function(khuvuc, index){
      return(
        <option value={khuvuc._id} key={index}>
          {khuvuc.ten}
        </option>
      );
    });
    let listTinh = this.state.state2.tinh.map(function(tinh, index){
      return(
        <option value={tinh._id} key={index}>
          {tinh.ten}
        </option>
      );
    });
    let listDoituong = this.state.state2.doituong.map(function(doituong, index){
      return(
        <option value={doituong._id} key={index}>
          {doituong.ten}
        </option>
      );
    });
    let listHocluc = this.state.state2.hocluc.map(function(hocluc, index){
      return(
        <option value={hocluc._id} key={index}>
          {hocluc.ten}
        </option>
      );
    });
    let listHoancanh = this.state.state2.hoancanh.map(function(hoancanh, index){
      return(
        <option value={hoancanh._id} key={index}>
          {hoancanh.ten}
        </option>
      );
    });

    let listKhoa = this.state.state3.listKhoa.map(function(khoa, index){
      return (
            <option value={khoa._id} key={index}>{khoa.ten}</option>
        );
    });
    let listHeDaoTao = this.state.state4.listHeDaoTao.map(function(hdt, index){
      return (
            <option value={hdt._id} key={index}>{hdt.ten}</option>
        );
    });

    let loaiPhong = this.state.state5.phong.map((po, index) =>{
        return (
              <option value={po._id} key={index}>{po.ten}</option>
          );
    });

    let listUsers = this.state.state1.users.map(function(user, index){
        return (
          <tr>
           <th scope="row">{index + 1}</th>
           <td>{user.ho_lot}' '{user.ten}</td>
           <td>{user.email}</td>
           <td>{user.ma_sinh_vien}</td>
           <td>{user.ma_ktx}</td>
           {/*// <td>{user.ma_giuong}</td>
           // <td>{user.ten_giuong}</td>
           // <td>{user.ten_phong}</td>*/}
           <td>{user.so_cmnd}</td>
           <td>{user.dien_thoai}</td>
           <td>
               <button className="btn btn-primary" onClick={this.handleGetStudent.bind(this, user._id)}>Edit</button>
               <button className="btn btn-danger" onClick={this.handleDelStudent.bind(this, user._id)}>Delete</button>
           </td>
          </tr>
        )
    }, this);

    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    const props = {user : this.state.state1.user, khuvuc : this.state.state2.khuvuc, doituong : this.state.state2.doituong,
                   tinh : this.state.state2.tinh, hocluc : this.state.state2.hocluc, hoancanh : this.state.state2.hoancanh,
                    khoa: this.state.state3.listKhoa, hedaotao: this.state.state4.listHeDaoTao };

    return (
      <div>
        <div className="table-responsive">
          <table className="table">
            <thead>
             <tr>
               <th>STT</th>
               <th>Họ Tên</th>
               <th>Email</th>
               <th>MSSV</th>
               <th>Mã KTX</th>
               {/*<th>Mã Giường</th>
               <th>Tên Giường</th>
               <th>Tên Phòng</th>*/}
               <th>CMND</th>
               <th>SDT</th>
               <th>Hành động</th>
               

               </tr>
             </thead>
             <tbody>
              {listUsers}
             </tbody>
          </table>
        </div>
        <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
          Add Student
        </Button>
        <AddUserModal show={this.state.addModalShow} onHide={addModalClose} />
        <FormUpload />



        <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.editModalShow} onHide={editModalClose}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">Sửa thông tin sinh viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.handleEditUser.bind(this)} className="form-horizontal">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="col-md-3 control-label">Email</label>
                  <div className="col-md-7">
                    <input type="email" className="form-control" ref="email" value={this.state.state1.email} disabled="disabled"/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">MSSV</label>
                  <div className="col-md-7">
                    <input type="number" className="form-control" ref="code" value={this.state.state1.mssv} disabled="disabled"/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputHoLot1" className="col-md-3 control-label">Họ lót</label>
                  <div className="col-md-7">
                    <input type="text" className="form-control" ref="holot" value={this.state.state1.holot} 
                      onChange={ManageUserAction.updateHoLot} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputTen1" className="col-md-3 control-label">Tên</label>
                  <div className="col-md-7">
                    <input type="text" className="form-control" ref="ten" value={this.state.state1.ten} 
                        onChange={ManageUserAction.updateTen} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Khu Vực</label>
                  <div className="col-md-7">
                    <select className="form-control" onChange={ManageUserAction.updateKhuVuc} value={this.state.state1.svkhuvuc}>
                      <option value='0'>--Chọn--</option>
                      {listKhuvuc}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Giới tính</label>
                  <div className="col-md-7">
                    <select className="form-control" ref="gioitinh" onChange={ManageUserAction.updateGioiTinh} value={this.state.state1.gioitinh}>
                        <option value='0'>--Chọn--</option>
                        <option value="m">Nam</option>
                        <option value="f">Nữ</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputTen1" className="col-md-3 control-label">Ngày sinh</label>
                  <div className="col-md-7">
                    <DatePicker
                        dateFormat="YYYY-MM-DD"
                        selected={this.state.state1.ngaySinh}
                        onChange={this.handleChangeNgaySinh}
                        peekNextMonth 
                        showMonthDropdown 
                        showYearDropdown 
                        scrollableYearDropdown
                            dropdownMode="select" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Tỉnh</label>
                  <div className="col-md-7">
                    <select className="form-control" ref="tinh" onChange={ManageUserAction.updateTinh} value={this.state.state1.svtinh}>
                        <option value='0'>--Chọn--</option>
                        {listTinh}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Khoa</label>
                  <div className="col-md-7">
                    <select className="form-control" ref="khoa" onChange={ManageUserAction.updateKhoa} value={this.state.state1.svkhoa}>
                        <option value='0'>--Chọn--</option>
                        {listKhoa}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Hệ đào tạo</label>
                  <div className="col-md-7">
                    <select className="form-control" ref="hedaotao" onChange={ManageUserAction.updateHeDaoTao} value={this.state.state1.svhedaotao}>
                        <option value='0'>--Chọn--</option>
                        {listHeDaoTao}
                    </select>
                  </div>
                </div>
                <div className={'form-group  ' }>
                  <label htmlFor="nam-vao-truong" className="col-md-3 control-label">Năm vào trường<span className="text-danger">(*)</span></label>
                  <div className="col-md-7">
                      <input type='number' className="form-control" id='nam-vao-truong' value={this.state.state1.namvaotruong}
                        onChange={ManageUserAction.updateNamVaoTruong} ref='namvaotruong'/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Dân tộc</label>
                  <div className="col-md-7">
                    <select className="form-control" onChange={ManageUserAction.updateDoiTuong} value={this.state.state1.svdoituong}>
                        <option value='0'>--Chọn--</option>
                        {listDoituong}
                    </select>
                  </div>
                </div>
                <div className={'form-group  ' } >
                  <label htmlFor="ton-giao" className="col-md-3 control-label">Tôn giáo<span className="text-danger">(*)</span></label>
                  <div className="col-md-7">
                      <input type='text' className="form-control" id='ton-giao' value={this.state.state1.svtongiao}
                        onChange={ManageUserAction.updateTonGiao} ref='tongiao'/>
                  </div>
                </div>
                <div className={'form-group ' } >
                  <label htmlFor="doan-the" className="col-md-3 control-label">Đoàn thể<span className="text-danger">(*)</span></label>
                  <div className="col-md-7">
                      <select className="form-control" id="doan-the" value={this.state.state1.svdoanthe}
                         onChange={ManageUserAction.updateDoanThe} ref='doanthe'>
                        <option value =''>-- Chọn đoàn thể --</option>
                        <option value='k'>Không</option>
                        <option value='dangvien'>Đảng viên</option>
                        <option value='doanvien'>Đoàn viên</option>

                      </select>
                  </div>
                </div>
                <div className={'form-group  ' } >
                  <label htmlFor="cmnd" className="col-md-3 control-label">Số CMND<span className="text-danger">(*)</span></label>
                  <div className="col-md-7">
                      <input type='number' className="form-control" id='cmnd' value={this.state.state1.socmnd}
                        onChange={ManageUserAction.updateSoCMND} ref='socmnd'/>
                  </div>
                </div>
                <div className={'form-group ' } >
                                      <label htmlFor="ho-khau" className="col-md-3 control-label">Hộ khẩu thường trú<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <input type='text' className="form-control" id='ho-khau' value={this.state.state1.hokhau}
                                           onChange={ManageUserAction.updateHoKhau} ref='hokhau'/>
                                      </div>
                                    </div>
                <div className={'form-group ' } >
                  <label htmlFor="dien-thoai-sv" className="col-md-3 control-label">Điện thoại sinh viên<span className="text-danger">(*)</span></label>
                  <div className="col-md-7">
                      <input type='tel' className="form-control" id='dien-thoai-sv' value={this.state.state1.svdienthoai}
                        onChange={ManageUserAction.updateDienThoaiSV} ref='sdtsinhvien'/>
                      <div className=''><span className="control-label text-danger">{}</span></div>
                  </div>
                </div>
              {/*dien thoai gia dinh*/}
                <div className={'form-group ' } >
                  <label htmlFor="dien-thoai-gia-dinh" className="col-md-3 control-label">Điện thoại gia đình<span className="text-danger">(*)</span></label>
                  <div className="col-md-7">
                      <input type='tel' className="form-control" id='dien-thoai-gia-dinh' value={this.state.state1.giadinhdienthoai}
                        onChange={ManageUserAction.updateDienThoaiGiaDinh} ref='sdtgiadinh'/>
                      <div className=''><span className="control-label text-danger">{}</span></div>
                  </div>
                </div>
              {/*dien thoai gia dinh*/}
                <div className={'form-group ' } >
                  <label htmlFor="email-thuong-dung" className="col-md-3 control-label">Email thường dùng</label>
                  <div className="col-md-7">
                      <input type='email' className="form-control" id='email-thuong-dung' value={this.state.state1.emailThuongDung}
                        onChange={ManageUserAction.updateEmailThuongDung} ref='emailkhac'/>
                      <div className=''><span className="control-label text-danger">{}</span></div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Học Lực</label>
                  <div className="col-md-7">
                      <select className="form-control" onChange={ManageUserAction.updateHocLuc} value={this.state.state1.svhocluc}>
                          <option value='0'>--Chọn--</option>
                          {listHocluc}
                      </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="col-md-3 control-label">Hoàn Cảnh Gia Đình</label>
                  <div className="col-md-7">
                    <select className="form-control" onChange={ManageUserAction.updateHoanCanh} value={this.state.state1.svhoancanh}>
                        <option value='0'>--Chọn--</option>
                        {listHoancanh}
                    </select>
                  </div>
                </div>
                <div className={'form-group  ' }>
                  <label htmlFor="phong-luu-tru" className="col-md-3 control-label">Loại phòng<span className="text-danger">(*)</span></label>
                  <div className="col-md-7">
                      <select className="form-control" id="phong-luu-tru" onChange={ManageUserAction.updateLoaiPhong} 
                          value={this.state.state1.svloaiphong} ref='loaiphong'>
                        <option value=''>-- Chọn loại phòng --</option>
                        {loaiPhong}
                      </select>
                      <div className=''><span className="control-label text-danger">{}</span></div>
                  </div>
                </div>
                <div className={'form-group  ' } style={{'display':'none'}}>
                  <label htmlFor="dich-vu-phong-thuong" className="col-md-3 control-label">Dịch vụ<span className="text-danger">(*)</span></label>
                  <div className="col-md-7">

                     
                      
                      <div className=''><span className="control-label text-danger"></span></div>
                  </div>
                </div>
                <div className='form-group'>
                    <label className='col-sm-3 control-label'>Chọn ảnh đại diện</label>
                    <div className ="clear-both"></div>
                    <div  className ='col-sm-7'>
                      <div className="avatar-photo">
                          <ImgUpload actions ={ManageUserAction} />
                          <div className="avatar-edit">
                            <i className="fa fa-camera"></i>
                        </div>
                      <img src ={this.state.state1.imagePreviewUrl} height ="200px" width="200px" alt = "avatar"/>
                    </div>
                    <div>
                        <button type='button' className = 'btn btn-success'onClick = {this.upload.bind(this)} ><i className="fa fa-check"></i></button>
                        <button type='button' className = 'btn btn-danger' onClick = {this.detele.bind(this)} ><i className="fa fa-times"></i></button>
                        <span className='help-block'>{this.state.state1.helpBlockUpload}</span>
                    </div>
                  </div>
                </div>
                <div className ="clear-both"></div>
                <div className="form-group">
                    <div className="col-sm-offset-3">
                      <button className="btn btn-success btn-large" type="submit">Lưu</button>
                    </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeMDEdit.bind(this)}>Hủy</Button>
            </Modal.Footer>
          </Modal>

      </div>
    );
  }
}

export default ManageStudent;
