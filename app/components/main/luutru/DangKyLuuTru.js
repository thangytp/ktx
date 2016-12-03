import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import localStorage from 'localStorage';

import ManageUuTienAction from '../../../actions/admin/manage-uutien/ManageUuTienAction';
import ManageUuTienStore from '../../../stores/admin/manage-uutien/ManageUuTienStore';

import ManagePhongAction from '../../../actions/admin/manage-phong/ManagePhongAction';
import ManagePhongStore from '../../../stores/admin/manage-phong/ManagePhongStore';

import DangKyLuuTruAction from '../../../actions/main/luutru/DangKyLuuTruAction';
import DangKyLuuTruStore from '../../../stores/main/luutru/DangKyLuuTruStore';

import CotPhaiHome from '../CotPhaiHome';

export default class SignUp extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {state1: ManageUuTienStore.getState(), state2: DangKyLuuTruStore.getState(), state3: ManagePhongStore.getState()};
    this.onChange = this.onChange.bind(this);
  }
   componentDidMount() {
    var userEmail = localStorage.getItem('email');
    if(!userEmail){
      window.location.href="/login";
    }
    else { 
      var mssv = userEmail.split('@');
      var svmssv = mssv[0];
      DangKyLuuTruAction.getStudent(svmssv);
    };
    ManageUuTienStore.listen(this.onChange);
    DangKyLuuTruStore.listen(this.onChange);
    ManagePhongStore.listen(this.onChange);

    ManageUuTienAction.getKhuvuc();
    ManageUuTienAction.getTinh();
    ManageUuTienAction.getDoituong();
    ManageUuTienAction.getHocluc();
    ManageUuTienAction.getHoancanh();

    ManagePhongAction.getPhong();
  }
  componentWillUnmount() {
    ManageUuTienStore.unlisten(this.onChange);
    DangKyLuuTruStore.unlisten(this.onChange);
    ManagePhongStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState({state1: ManageUuTienStore.getState(), state2: DangKyLuuTruStore.getState(), state3: ManagePhongStore.getState()});
  }
  dangKyLuuTru(event)
  {
    event.preventDefault();
    var idStu = this.state.state2.idStu;

    var userEmail = localStorage.getItem('email');
    var userName = localStorage.getItem('name');
    var mssv = userEmail.split('@');
    var svmssv = mssv[0];
    
    var gioitinh = this.state.state2.gioitinh;    
    var namvaotruong = this.state.state2.namvaotruong;
    var svkhuvuc = this.state.state2.svkhuvuc;
    var svtinh = this.state.state2.svtinh;
    var svdoituong = this.state.state2.svdoituong;
    var svhocluc = this.state.state2.svhocluc;
    var svhoancanh = this.state.state2.svhoancanh;
    var svloaiphong = this.state.state2.svloaiphong;

    var presentYear = new Date().getFullYear();

    if(gioitinh == ''){
        DangKyLuuTruAction.invalidGioiTinh();
    }
    else if (namvaotruong > presentYear || (presentYear - namvaotruong) > 6) {
        DangKyLuuTruAction.invalidNam();
        this.refs.NamTextField.focus();
    }

    else if(!svkhuvuc){
        DangKyLuuTruAction.invalidKhuVuc();
        this.refs.KhuVucTextField.focus();
    }
    else if(!svtinh){
        DangKyLuuTruAction.invalidTinh();
        this.refs.TinhTextField.focus();
    }
    else if(!svdoituong){
        DangKyLuuTruAction.invalidDoiTuong();
        this.refs.DoiTuongTextField.focus();
    }
    else if(!svhocluc){
        DangKyLuuTruAction.invalidHocluc();
        this.refs.HocLucTextField.focus();
    }
    else if(!svhoancanh){
        DangKyLuuTruAction.invalidHoanCanh();
        this.refs.HoanCanhTextField.focus();
    }
    else if(!svloaiphong){
        DangKyLuuTruAction.invalidLoaiPhong();
        this.refs.LoaiPhongTextField.focus();
    }

    else {
        if(!idStu){
          DangKyLuuTruAction.showLoading();
          DangKyLuuTruAction.dangKyLuuTru({ userEmail: userEmail, userName: userName, svmssv: svmssv, gioitinh: gioitinh, namvaotruong: namvaotruong, svkhuvuc: svkhuvuc, svtinh: svtinh,
              svdoituong: svdoituong, svhocluc: svhocluc, svhoancanh: svhoancanh, svloaiphong: svloaiphong});
        }
        else {
          DangKyLuuTruAction.showLoading();
          DangKyLuuTruAction.giaHanLuuTru({ idStu: idStu, svhocluc: svhocluc, svhoancanh: svhoancanh, svloaiphong: svloaiphong});
        }
    }


  }

  render() {

    let khuVucUuTien = this.state.state1.khuvuc.map((kv, index)=>{
      //if(kv._id === this.state.state2.svkhuvuc){
        return(
              <option value={kv._id} key={index}>{kv.ten}</option>
          );
      // }
      // else {
      //   return(
      //         <option value={kv._id} key={index}>{kv.ten}</option>
      //     );
      // }
    });
    let tinh = this.state.state1.tinh.map((ti, index)=>{
        return(
              <option value={ti._id} key={index}>{ti.ten}</option>
          );
    });
    let doiTuongUuTien = this.state.state1.doituong.map((dt, index)=>{
        return(
              <option value={dt._id} key={index}>{dt.ten}</option>
          );
    });
    let sinhvien = this.state.state1.hocluc.map((hl, index)=>{
        return(
              <option value={hl._id} key={index}>{hl.ten}</option>
          );
    });
    let hoanCanh = this.state.state1.hoancanh.map((hc, index)=>{
        return(
              <option value={hc._id} key={index}>{hc.ten}</option>
          );
    });

    let loaiPhong = this.state.state3.phong.map((po, index) =>{
        return (
              <option value={po._id} key={index}>{po.loai}</option>
          );
    });

    let daGiaHan = this.state.state2.daGiaHan;
    if(daGiaHan){
      return(
          <div className="container luu-tru">

              <div className="row">
                <div className="col-md-9" >
                  <ol className="breadcrumb no-overflow">
                      <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
                      <li>{this.state.state2.titleForm}</li>
                  </ol>
                  <div className="panel rounded shadow no-overflow">
                    <div className="panel-heading">
                        <div className="pull-left"><h3 className="panel-title">{this.state.state2.titleForm}</h3></div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="panel-body no-padding">
                        <h3 className='text-center'>Bạn đã đăng ký gia hạn. Vui lòng chờ kết quả xét duyệt!</h3>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 col-sm-12">
                    <CotPhaiHome />
                </div>

              </div>
            </div>
        );
    }

    return (
            <div className="container luu-tru">

              <div className="row">
                <div className="col-md-9 ">
                  <ol className="breadcrumb no-overflow">
                      <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
                      <li>{this.state.state2.titleForm}</li>
                  </ol>

                  <div className="panel rounded shadow no-overflow">
                    <div className="panel-heading">
                        <div className="pull-left"><h3 className="panel-title">{this.state.state2.titleForm}</h3></div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="panel-body no-padding">
                      
                      <form className="form-horizontal" role="form" onSubmit ={this.dangKyLuuTru.bind(this)}>
                        <div className="form-body">
                          <div className="form-group" style={{'display': this.state.state2.styleGioiTinh}} >
                              <label className="control-label col-md-3 col-sm-3" htmlFor="">Giới tính</label>
                              <div className="col-md-7 col-sm-7"> 
                                  <label className="radio-inline"><input type="radio" name="gender" value="m" onClick={DangKyLuuTruAction.updateGioiTinhNam} checked={this.state.state2.checkNam}/>Nam</label>
                                  <label className="radio-inline"><input type="radio" name="gender" value="f" onClick={DangKyLuuTruAction.updateGioiTinhNu} checked={this.state.state2.checkNu}/>Nữ</label>
                                  <div className=''><span className="control-label text-danger">{this.state.state2.validateGioiTinh}</span></div>
                              </div>
                          </div>
                          <div className={'form-group has-feedback ' } style={{'display': this.state.state2.styleNamVaoTruong}}>
                            <label htmlFor="nam-vao-truong" className="col-md-3 control-label">Năm vào trường</label>
                            <div className="col-md-7">
                                <input type='number' className="form-control" id='nam-vao-truong' value={this.state.state2.namvaotruong}
                                  onChange={DangKyLuuTruAction.updateNamVaoTruong} ref='NamTextField'/>
                                <div className=''><span className="control-label text-danger">{this.state.state2.validateNam}</span></div>
                            </div>
                          </div>
                          <div className={'form-group has-feedback ' } style={{'display': this.state.state2.styleKhuVuc}}>
                            <label htmlFor="khu-vuc-uu-tien" className="col-md-3 control-label">Khu vực ưu tiên</label>
                            <div className="col-md-7">
                                <select className="form-control" id="khu-vuc-uu-tien" value={this.state.state2.svkhuvuc}
                                    onChange={DangKyLuuTruAction.updateKhuVuc} ref='KhuVucTextField'>
                                  <option value =''>-- Chọn khu vực ưu tiên --</option>
                					        {khuVucUuTien}
                                </select>
                                <div className=''><span className="control-label text-danger">{this.state.state2.validateKhuVuc}</span></div>
                            </div>
                          </div>
                          <div className={'form-group has-feedback ' } style={{'display': this.state.state2.styleTinh}}>
                            <label htmlFor="tinh" className="col-md-3 control-label">Tỉnh</label>
                            <div className="col-md-7">
                                <select className="form-control" id="tinh" value={this.state.state2.svtinh}
                                    onChange={DangKyLuuTruAction.updateTinh} ref='TinhTextField'>
                                  <option value =''>-- Chọn tỉnh --</option>
                                  {tinh}

                                </select>
                                <div className=''><span className="control-label text-danger">{this.state.state2.validateTinh}</span></div>
                            </div>
                          </div>
                          <div className={'form-group has-feedback ' } style={{'display': this.state.state2.styleDoiTuong}}>
                            <label htmlFor="doi-tuong-uu-tien" className="col-md-3 control-label">Đối tượng ưu tiên</label>
                            <div className="col-md-7">
                                <select className="form-control" id="doi-tuong-uu-tien" value={this.state.state2.svdoituong}
                                    onChange={DangKyLuuTruAction.updateDoiTuong} ref='DoiTuongTextField'>
                                  <option value =''>-- Chọn đối tượng ưu tiên --</option>
                                  {doiTuongUuTien}
                                </select>
                                <div className=''><span className="control-label text-danger">{this.state.state2.validateDoiTuong}</span></div>
                            </div>
                          </div>
                          <div className={'form-group has-feedback ' }>
                            <label htmlFor="sinh-vien" className="col-md-3 control-label">Là sinh viên</label>
                            <div className="col-md-7">
                                <select className="form-control" id="sinh-vien" value={this.state.state2.svhocluc}
                                    onChange={DangKyLuuTruAction.updateHocLuc} ref='HocLucTextField'>
                                  <option value =''>-- Chọn học lực --</option>
                                  {sinhvien}
                                </select>
                                <div className=''><span className="control-label text-danger">{this.state.state2.validateHocLuc}</span></div>
                            </div>
                          </div>
                          <div className={'form-group has-feedback ' }>
                            <label htmlFor="hoan-canh" className="col-md-3 control-label">Hoàn cảnh gia đình</label>
                            <div className="col-md-7">
                                <select className="form-control" id="hoan-canh" value={this.state.state2.svhoancanh}
                                    onChange={DangKyLuuTruAction.updateHoanCanh} ref='HoanCanhTextField'>
                                  <option value =''>-- Chọn hoàn cảnh --</option>
                                  {hoanCanh}
                                </select>
                                <div className=''><span className="control-label text-danger">{this.state.state2.validateHoanCanh}</span></div>
                            </div>
                          </div>
                          <div className={'form-group has-feedback ' }>
                            <label htmlFor="phong-luu-tru" className="col-md-3 control-label">Nguyện vọng lưu trú</label>
                            <div className="col-md-7">
                                <select className="form-control" id="phong-luu-tru" onChange={DangKyLuuTruAction.updateLoaiPhong}
                                    value={this.state.state2.svloaiphong} ref='LoaiPhongTextField'>
                                  <option value=''>-- Chọn loại phòng --</option>
                                  {loaiPhong}
                                </select>
                                <div className=''><span className="control-label text-danger">{this.state.state2.validateLoaiPhong}</span></div>
                            </div>
                          </div>

                        </div>

                         {/* <div className="form-group">
                            <label className="col-md-3 control-label" />
                            <div className="col-md-9">
                              <input type="checkbox" name="remember" defaultValue={1} /> Nhớ đến tôi?
                            </div>
                          </div>  */}
                        <div className="form-footer">
                            <div className="form-group">
                              <div className="col-sm-offset-3">
                                <button type="submit" className="btn btn-success" disabled={this.state.state2.disableDK}><span><i className="fa fa-refresh fa-spin" style={{'display': this.state.state2.loading}}></i> <span>{this.state.state2.textButtonDangKy}</span></span></button>
                                <span className="text-success">{this.state.state2.messDK}</span>
                              </div>
                            </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 col-sm-12">
                    <CotPhaiHome />
                </div>

              </div>
            </div>
    );
  }
}
