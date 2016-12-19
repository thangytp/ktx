import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import localStorage from 'localStorage';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import ManageUuTienAction from '../../../actions/admin/manage-uutien/ManageUuTienAction';
import ManageUuTienStore from '../../../stores/admin/manage-uutien/ManageUuTienStore';

import ManagePhongAction from '../../../actions/admin/manage-phong/ManagePhongAction';
import ManagePhongStore from '../../../stores/admin/manage-phong/ManagePhongStore';

import DangKyLuuTruAction from '../../../actions/main/luutru/DangKyLuuTruAction';
import DangKyLuuTruStore from '../../../stores/main/luutru/DangKyLuuTruStore';

import ManageDichvuAction from '../../../actions/admin/manage-dichvu/ManageDichvuAction';
import ManageDichvuStore from '../../../stores/admin/manage-dichvu/ManageDichvuStore';

import KhoaAdminAction from '../../../actions/admin/khoa/KhoaAdminAction';
import KhoaAdminStore from '../../../stores/admin/khoa/KhoaAdminStore';
import HeDaoTaoAction from '../../../actions/admin/hedaotao/HeDaoTaoAction';
import HeDaoTaoStore from '../../../stores/admin/hedaotao/HeDaoTaoStore';

import CaiDatLuuTruAction from '../../../actions/admin/caidatluutru/CaiDatLuuTruAction';
import CaiDatLuuTruStore from '../../../stores/admin/caidatluutru/CaiDatLuuTruStore';

import LogInStore from '../../../stores/main/user/LogInstore';

import CotPhaiHome from '../CotPhaiHome';

export default class SignUp extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {state1: ManageUuTienStore.getState(), state2: DangKyLuuTruStore.getState(), 
      state3: ManagePhongStore.getState(), state4: ManageDichvuStore.getState(), state5: KhoaAdminStore.getState(),
      state6: HeDaoTaoStore.getState(), state7: CaiDatLuuTruStore.getState() };
    this.onChange = this.onChange.bind(this);
  }
   componentDidMount() {
    document.title = "Đăng ký lưu trú | Ký túc xá Bách Khoa"; 
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
    ManageDichvuStore.listen(this.onChange);
    KhoaAdminStore.listen(this.onChange);
    HeDaoTaoStore.listen(this.onChange);
    CaiDatLuuTruStore.listen(this.onChange);


    ManageUuTienAction.getKhuvuc();
    ManageUuTienAction.getTinh();
    ManageUuTienAction.getDoituong();
    ManageUuTienAction.getHocluc();
    ManageUuTienAction.getHoancanh();

    ManagePhongAction.getPhong();

    ManageDichvuAction.getDichvu();
    KhoaAdminAction.getListKhoa();
    HeDaoTaoAction.getListHeDaoTao();

    CaiDatLuuTruAction.getCaiDatDangKyMoi();
  }
  componentWillUnmount() {
    ManageUuTienStore.unlisten(this.onChange);
    DangKyLuuTruStore.unlisten(this.onChange);
    ManagePhongStore.unlisten(this.onChange);
    ManageDichvuStore.unlisten(this.onChange);
    KhoaAdminStore.unlisten(this.onChange);
    HeDaoTaoStore.unlisten(this.onChange);
    CaiDatLuuTruStore.unlisten(this.onChange);


  }
  onChange(state) {
    this.setState({state1: ManageUuTienStore.getState(), state2: DangKyLuuTruStore.getState(), 
      state3: ManagePhongStore.getState(), state4: ManageDichvuStore.getState(), state5: KhoaAdminStore.getState(),
      state6: HeDaoTaoStore.getState(), state7: CaiDatLuuTruStore.getState() });
  }

  handleChangeNgaySinh(date){
    DangKyLuuTruAction.updateNgaySinh(date);
  }

  updateDV(id){

    DangKyLuuTruAction.updateDV({id: id});
  }

  nhapThongTin(event){
    event.preventDefault();
    var holot = this.state.state2.holot;
    var ten = this.state.state2.ten;
    var svkhuvuc = this.state.state2.svkhuvuc;
    var gioitinh = this.state.state2.gioitinh;    
    var ngaySinh = this.state.state2.ngaySinh;
    console.log(ngaySinh._d.getFullYear());
    var svtinh = this.state.state2.svtinh;
    var svkhoa = this.state.state2.svkhoa;
    var namvaotruong = this.state.state2.namvaotruong;
    var svhedaotao = this.state.state2.svhedaotao;
    var svdoituong = this.state.state2.svdoituong;
    var svtongiao = this.state.state2.svtongiao;
    var svdoanthe = this.state.state2.svdoanthe;
    var socmnd = this.state.state2.socmnd;
    var hokhau = this.state.state2.hokhau;
    var svdienthoai = this.state.state2.svdienthoai;
    var giadinhdienthoai = this.state.state2.giadinhdienthoai;
    var emailThuongDung = this.state.state2.emailThuongDung;
    var dongY = this.state.state2.dongY;

    var presentYear = new Date().getFullYear();

    if(!holot){
        DangKyLuuTruAction.invalidHoLot();
        this.refs.HoLotTextField.focus();
    }
    else if(!ten) {
        DangKyLuuTruAction.invalidTen();
        this.refs.TenTextField.focus();
    }
    else if(!svkhuvuc){
        DangKyLuuTruAction.invalidKhuVuc();
        this.refs.KhuVucTextField.focus();
    }
    else if(gioitinh == ''){
        DangKyLuuTruAction.invalidGioiTinh();
    }
    else if(!ngaySinh || (presentYear - ngaySinh._d.getFullYear()) < 18 ){
        DangKyLuuTruAction.invalidNgaySinh();
    }
    else if(!svtinh){
        DangKyLuuTruAction.invalidTinh();
        this.refs.TinhTextField.focus();
    }
    else if(!khoa){
        DangKyLuuTruAction.invalidKhoa();
        this.refs.KhoaTextField.focus();
    }
    else if (namvaotruong > presentYear || (presentYear - namvaotruong) > 6) {
        DangKyLuuTruAction.invalidNam();
        this.refs.NamTextField.focus();
    }
    else if(!svhedaotao){
        DangKyLuuTruAction.invalidHeDaoTao();
        this.refs.HeDaoTaoTextField.focus();
    }
    else if(!svdoituong){
        DangKyLuuTruAction.invalidDoiTuong();
        this.refs.DoiTuongTextField.focus();
    }
    else if(!svtongiao){
        DangKyLuuTruAction.invalidTonGiao();
        this.refs.TonGiaoTextField.focus();
    }
    else if(!svdoanthe){
        DangKyLuuTruAction.invalidDoanThe();
        this.refs.DoanTheTextField.focus();
    }
    else if(!socmnd){
        DangKyLuuTruAction.invalidSoCMND();
        this.refs.SoCMNDTextField.focus();
    }
    else if(!hokhau){
        DangKyLuuTruAction.invalidHoKhau();
        this.refs.HoKhauTextField.focus();
    }
    else if(!svdienthoai){
        DangKyLuuTruAction.invalidSVDienThoai();
        this.refs.DienThoaiSVTextField.focus();
    }
    else if(!giadinhdienthoai){
        DangKyLuuTruAction.invalidGiaDinhDienThoai();
        this.refs.DienThoaiGiaDinhTextField.focus();
    }
    else if(!dongY){
        DangKyLuuTruAction.invalidDongY();

    }

    else DangKyLuuTruAction.updateNhapThongTin();
  }

  dangKyLuuTru(event)
  {
    event.preventDefault();
    var idStu = this.state.state2.idStu;

    var userEmail = localStorage.getItem('email');
    var userName = localStorage.getItem('name');
    var mssv = userEmail.split('@');
    var svmssv = mssv[0];
    
    var holot = this.state.state2.holot;
    var ten = this.state.state2.ten;
    var svkhuvuc = this.state.state2.svkhuvuc;
    var gioitinh = this.state.state2.gioitinh;    
    var ngaySinh = this.state.state2.ngaySinh._d;
    console.log(ngaySinh);
    var svtinh = this.state.state2.svtinh;
    var svkhoa = this.state.state2.svkhoa;
    var namvaotruong = this.state.state2.namvaotruong;
    var svhedaotao = this.state.state2.svhedaotao;
    var svdoituong = this.state.state2.svdoituong;
    var svtongiao = this.state.state2.svtongiao;
    var svdoanthe = this.state.state2.svdoanthe;
    var socmnd = this.state.state2.socmnd;
    var hokhau = this.state.state2.hokhau;
    var svdienthoai = this.state.state2.svdienthoai;
    var giadinhdienthoai = this.state.state2.giadinhdienthoai;
    var emailThuongDung = this.state.state2.emailThuongDung;
    var dongY = this.state.state2.dongY;
    
    var svhocluc = this.state.state2.svhocluc;
    var svhoancanh = this.state.state2.svhoancanh;
    var svloaiphong = this.state.state2.svloaiphong;
    var dichvu = this.state.state2.dichvu;
    // console.log(dichvu);
    
    if(!svhocluc){
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
      if(userEmail){
        if(!idStu){
          DangKyLuuTruAction.showLoading();
          DangKyLuuTruAction.dangKyLuuTru({ userEmail: userEmail, svmssv: svmssv, holot: holot, ten: ten, svkhuvuc: svkhuvuc, 
            gioitinh: gioitinh, ngaySinh: ngaySinh, svtinh: svtinh, svkhoa: svkhoa, namvaotruong: namvaotruong,  
              svhedaotao: svhedaotao, svdoituong: svdoituong, svtongiao: svtongiao, svdoanthe: svdoanthe, socmnd: socmnd, 
              hokhau: hokhau, svdienthoai: svdienthoai, giadinhdienthoai: giadinhdienthoai, emailThuongDung: emailThuongDung, 
              svhocluc: svhocluc, svhoancanh: svhoancanh, svloaiphong: svloaiphong, dichvu: dichvu});
        }
        else {
          DangKyLuuTruAction.showLoading();
          DangKyLuuTruAction.giaHanLuuTru({ idStu: idStu, svhocluc: svhocluc, svhoancanh: svhoancanh, svloaiphong: svloaiphong, dichvu: dichvu});
        }
      }
    }


  }

  render() {

    let listKhoa = this.state.state5.listKhoa.map((khoa, index)=>{
        return (
              <option value={khoa._id} key={index}>{khoa.ten}</option>
          );
    });

    let listHeDaoTao = this.state.state6.listHeDaoTao.map((hdt, index)=>{
        return (
              <option value={hdt._id} key={index}>{hdt.ten}</option>
          );
    });    

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
              <option value={po._id} key={index}>{po.ten}</option>
          );
    });

    let dichVu = this.state.state4.dichvu.map((dv, index) =>{
        return (
              <div className="checkbox" key={index}>
                <label><input type="checkbox" value={dv._id} onChange={this.updateDV.bind(this, dv._id)}/>{dv.ten + ' - ' + dv.gia}</label>
              </div>
          );
    });

    let daGiaHan = this.state.state2.daGiaHan;

    let presentDate = moment();
    // if(presentDate < this.state.state7.ngayBatDauDangKyMain || presentDate > this.state.state7.ngayKetThucDangKyMain || 
    //   !this.state.state7.ngayBatDauDangKyMain || !this.state.state7.ngayKetThucDangKyMain ){
    //     return (
    //           <div className="container luu-tru">

    //             <div className="row">
    //               <div className="col-md-9" >
    //                 <ol className="breadcrumb no-overflow">
    //                     <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
    //                     <li></li>
    //                 </ol>
    //                 <div className="panel rounded shadow no-overflow">
    //                   <div className="panel-heading">
    //                       <div className="pull-left"><h3 className="panel-title"></h3></div>
    //                       <div className="clearfix"></div>
    //                   </div>
    //                   <div className="panel-body no-padding">
    //                       <h3 className='text-center'>Chưa đến hạn đăng ký lưu trú!</h3>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div className="col-md-3 col-sm-12">
    //                   <CotPhaiHome />
    //               </div>

    //             </div>
    //           </div>
    //       );
    // }

    // else if( presentDate < this.state.state7.ngayBatDauGiaHanMain || presentDate > this.state.state7.ngayKetThucGiaHanMain || 
    //   !this.state.state7.ngayBatDauGiaHanMain || !this.state.state7.ngayKetThucGiaHanMain ){
    //     return (
    //           <div className="container luu-tru">

    //             <div className="row">
    //               <div className="col-md-9" >
    //                 <ol className="breadcrumb no-overflow">
    //                     <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
    //                     <li></li>
    //                 </ol>
    //                 <div className="panel rounded shadow no-overflow">
    //                   <div className="panel-heading">
    //                       <div className="pull-left"><h3 className="panel-title"></h3></div>
    //                       <div className="clearfix"></div>
    //                   </div>
    //                   <div className="panel-body no-padding">
    //                       <h3 className='text-center'>Chưa đến hạn gia hạn lưu trú!</h3>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div className="col-md-3 col-sm-12">
    //                   <CotPhaiHome />
    //               </div>

    //             </div>
    //           </div>
    //       );
    // }

    //check dang ky
    //neu da co thong tin trong db ktx
    console.log(this.state.state2.daDangKyLuuTru);
    if(this.state.state2.daDangKyLuuTru){
        //neu dang o ktx true
        if(this.state.state2.daDangKyLuuTru.dang_o_ktx){
            //neu khong trong thoi gian gia han
            if( presentDate < this.state.state7.ngayBatDauGiaHanMain || presentDate > this.state.state7.ngayKetThucGiaHanMain || 
              !this.state.state7.ngayBatDauGiaHanMain || !this.state.state7.ngayKetThucGiaHanMain ){
                return (
                      <div className="container luu-tru">

                        <div className="row">
                          <div className="col-md-9" >
                            <ol className="breadcrumb no-overflow">
                                <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
                                <li></li>
                            </ol>
                            <div className="panel rounded shadow no-overflow">
                              <div className="panel-heading">
                                  <div className="pull-left"><h3 className="panel-title"></h3></div>
                                  <div className="clearfix"></div>
                              </div>
                              <div className="panel-body no-padding">
                                  <h3 className='text-center'>Đã tắt chức năng đăng ký lưu trú!</h3>
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
            // neu trong thoi gian gia han
            else{
                //neu da gia han -> thong bao da gia han
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
                // neu chua gia han -> hien form gia han
                else{
                    return(
                        
                        <div className="panel rounded shadow no-overflow" >
                          <div className="panel-heading">
                              <div className="pull-left"><h3 className="panel-title">{this.state.state2.titleForm}</h3></div>
                              <div className="clearfix"></div>
                          </div>
                          <div className="panel-body no-padding">
                            
                            <form className="form-horizontal" role="form" onSubmit ={this.dangKyLuuTru.bind(this)}>
                              <div className="form-body">
                                
                                <div className={'form-group  ' }>
                                  <label htmlFor="sinh-vien" className="col-md-3 control-label">Học lực<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <select className="form-control" id="sinh-vien" value={this.state.state2.svhocluc}
                                          onChange={DangKyLuuTruAction.updateHocLuc} ref='HocLucTextField'>
                                        <option value =''>-- Chọn học lực --</option>
                                        {sinhvien}
                                      </select>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateHocLuc}</span></div>
                                  </div>
                                </div>
                                <div className={'form-group ' }>
                                  <label htmlFor="hoan-canh" className="col-md-3 control-label">Hoàn cảnh gia đình<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <select className="form-control" id="hoan-canh" value={this.state.state2.svhoancanh}
                                          onChange={DangKyLuuTruAction.updateHoanCanh} ref='HoanCanhTextField'>
                                        <option value =''>-- Chọn hoàn cảnh --</option>
                                        {hoanCanh}
                                      </select>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateHoanCanh}</span></div>
                                  </div>
                                </div>
                                <div className={'form-group  ' }>
                                  <label htmlFor="phong-luu-tru" className="col-md-3 control-label">Nguyện vọng lưu trú<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <select className="form-control" id="phong-luu-tru" onChange={DangKyLuuTruAction.updateLoaiPhong}
                                          value={this.state.state2.svloaiphong} ref='LoaiPhongTextField'>
                                        <option value=''>-- Chọn loại phòng --</option>
                                        {loaiPhong}
                                      </select>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateLoaiPhong}</span></div>
                                  </div>
                                </div>
                                <div className={'form-group  ' } style={{'display':this.state.state2.styleDichVu}}>
                                  <label htmlFor="dich-vu-phong-thuong" className="col-md-3 control-label">Dịch vụ<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">

                                      {dichVu}
                                      
                                      <div className=''><span className="control-label text-danger"></span></div>
                                  </div>
                                </div>

                              </div>

                              <div className="form-footer">
                                  <div className="form-group">
                                    <div className="col-sm-offset-3">
                                      <button type="button" className="btn btn-warning" onClick={DangKyLuuTruAction.quayLai} style={{'display':this.state.state2.displayQuayLaiBtn}}>Quay lại</button>
                                      <button type="submit" className="btn btn-success" disabled={this.state.state2.disableDK}><span><i className="fa fa-refresh fa-spin" style={{'display': this.state.state2.loading}}></i> <span>{this.state.state2.textButtonDangKy}</span></span></button>
                                      <span className="text-success">{this.state.state2.messDK}</span>
                                    </div>
                                  </div>
                              </div>
                            </form>
                          </div>
                        </div>
                    );
                }
            }
        }
        // neu khong o trong ktx
        else{
            //neu khong trong thoi gian dang ky
            console.log(presentDate);
            console.log(this.state.state7.ngayKetThucDangKyMain);
            if(presentDate < this.state.state7.ngayBatDauDangKyMain._d || presentDate > this.state.state7.ngayKetThucDangKyMain._d || 
              !this.state.state7.ngayBatDauDangKyMain || !this.state.state7.ngayKetThucDangKyMain ){
                return (
                      <div className="container luu-tru">

                        <div className="row">
                          <div className="col-md-9" >
                            <ol className="breadcrumb no-overflow">
                                <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
                                <li></li>
                            </ol>
                            <div className="panel rounded shadow no-overflow">
                              <div className="panel-heading">
                                  <div className="pull-left"><h3 className="panel-title">Đăng ký lưu trú</h3></div>
                                  <div className="clearfix"></div>
                              </div>
                              <div className="panel-body no-padding">
                                  <h3 className='text-center'>Đã tắt chức năng đăng ký lưu trú!</h3>
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
            //neu trong thoi gian dang ky -> ban da dang ky
            else{
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
                                  <h3 className='text-center'>Bạn đã đăng ký lưu trú. Vui lòng chờ kết quả xét duyệt!</h3>
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
    }
    // neu chua co thong tin trong ktx -> dang ky moi
    else{
        //neu khong trong thoi gian dang ky
        if(presentDate < this.state.state7.ngayBatDauDangKyMain || presentDate > this.state.state7.ngayKetThucDangKyMain || 
          !this.state.state7.ngayBatDauDangKyMain || !this.state.state7.ngayKetThucDangKyMain ){
            return (
                  <div className="container luu-tru">

                    <div className="row">
                      <div className="col-md-9" >
                        <ol className="breadcrumb no-overflow">
                            <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
                            <li></li>
                        </ol>
                        <div className="panel rounded shadow no-overflow">
                          <div className="panel-heading">
                              <div className="pull-left"><h3 className="panel-title"></h3></div>
                              <div className="clearfix"></div>
                          </div>
                          <div className="panel-body no-padding">
                              <h3 className='text-center'>Đã tắt chức năng đăng ký lưu trú!</h3>
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
        // neu trong thoi gian dang ky
        else{
            return (
                <div className="container luu-tru">

                  <div className="row">
                    <div className="col-md-9 ">
                      <ol className="breadcrumb no-overflow">
                          <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
                          <li>{this.state.state2.titleForm}</li>
                      </ol>

                      {/*form nhap thong tin ca nhan*/}
                      <div className="panel rounded shadow no-overflow" style={{'display': this.state.state2.styleFormThongTinCaNhan}}>
                        <div className="panel-heading">
                            <div className="pull-left"><h3 className="panel-title">{this.state.state2.titleForm}</h3></div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="panel-body no-padding">
                            <form className="form-horizontal" role="form" >
                                <div className="form-body">
                                    {/*ho lot*/}
                                    <div className={'form-group ' } >
                                      <label htmlFor="ho-lot" className="col-md-3 control-label">Họ Lót<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <input type='text' className="form-control" id='ho-lot' value={this.state.state2.holot}
                                            onChange={DangKyLuuTruAction.updateHoLot} ref='HoLotTextField'/>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateHoLot}</span></div>
                                      </div>
                                    </div>
                                    {/*ten*/}
                                    <div className={'form-group  ' } >
                                      <label htmlFor="ten" className="col-md-3 control-label">Tên<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <input type='text' className="form-control" id='ten' value={this.state.state2.ten}
                                            onChange={DangKyLuuTruAction.updateTen} ref='TenTextField'/>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateTen}</span></div>
                                      </div>
                                    </div>
                                    {/*khu vuc uu tien*/}
                                    <div className={'form-group ' } >
                                      <label htmlFor="khu-vuc-uu-tien" className="col-md-3 control-label">Khu vực ưu tiên<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <select className="form-control" id="khu-vuc-uu-tien" value={this.state.state2.svkhuvuc}
                                              onChange={DangKyLuuTruAction.updateKhuVuc} ref='KhuVucTextField'>
                                            <option value =''>-- Chọn khu vực ưu tiên --</option>
                                            {khuVucUuTien}
                                          </select>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateKhuVuc}</span></div>
                                      </div>
                                    </div>
                                  {/*gioi tinh*/}
                                    <div className="form-group"  >
                                        <label className="control-label col-md-3 col-sm-3" htmlFor="">Giới tính<span className="text-danger">(*)</span></label>
                                        <div className="col-md-7 col-sm-7"> 
                                            <label className="radio-inline"><input type="radio" name="gender" value="m" onClick={DangKyLuuTruAction.updateGioiTinhNam} checked={this.state.state2.checkNam}/>Nam</label>
                                            <label className="radio-inline"><input type="radio" name="gender" value="f" onClick={DangKyLuuTruAction.updateGioiTinhNu} checked={this.state.state2.checkNu}/>Nữ</label>
                                            <div className=''><span className="control-label text-danger">{this.state.state2.validateGioiTinh}</span></div>
                                        </div>
                                    </div>
                                    {/*ngay sinh*/}
                                    <div className="form-group"  >
                                        <label className="control-label col-md-3 col-sm-3" htmlFor="">Ngày sinh<span className="text-danger">(*)</span></label>
                                        <div className="col-md-7 col-sm-7"> 
                                          <DatePicker
                                              openToDate={moment("1994-09-28")}
                                              dateFormat="YYYY-MM-DD"
                                              selected={this.state.state2.ngaySinh}
                                              onChange={this.handleChangeNgaySinh}
                                              peekNextMonth 
                                              showMonthDropdown 
                                              showYearDropdown 
                                              scrollableYearDropdown
                                                  dropdownMode="select" />
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateNgaySinh}</span></div>
                                        </div>
                                    </div>
                                    {/*tinh*/}
                                    <div className={'form-group ' } >
                                      <label htmlFor="tinh" className="col-md-3 control-label">Tỉnh<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <select className="form-control" id="tinh" value={this.state.state2.svtinh}
                                              onChange={DangKyLuuTruAction.updateTinh} ref='TinhTextField'>
                                            <option value =''>-- Chọn tỉnh --</option>
                                            {tinh}

                                          </select>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateTinh}</span></div>
                                      </div>
                                    </div>
                                  {/*Khoa*/}
                                    <div className={'form-group ' } >
                                      <label htmlFor="khoa" className="col-md-3 control-label">Khoa<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <select className="form-control" id="khoa" value={this.state.state2.svkhoa}
                                              onChange={DangKyLuuTruAction.updateKhoa} ref='KhoaTextField'>
                                            <option value =''>-- Chọn khoa --</option>
                                            
                                            {listKhoa}

                                          </select>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateKhoa}</span></div>
                                      </div>
                                    </div>
                                  {/*nam vao truong*/}
                                    <div className={'form-group  ' }>
                                      <label htmlFor="nam-vao-truong" className="col-md-3 control-label">Năm vào trường<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <input type='number' className="form-control" id='nam-vao-truong' value={this.state.state2.namvaotruong}
                                            onChange={DangKyLuuTruAction.updateNamVaoTruong} ref='NamTextField'/>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateNam}</span></div>
                                      </div>
                                    </div>
                                  {/*He dao tao*/}
                                    <div className={'form-group  ' } >
                                      <label htmlFor="he-dao-tao" className="col-md-3 control-label">Hệ đào tạo<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <select className="form-control" id="he-dao-tao" value={this.state.state2.svhedaotao}
                                              onChange={DangKyLuuTruAction.updateHeDaoTao} ref='HeDaoTaoTextField'>
                                            <option value =''>-- Chọn hệ dào tạo --</option>
                                            {listHeDaoTao}

                                          </select>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateHeDaoTao}</span></div>
                                      </div>
                                    </div>
                                  {/*Dan toc*/}
                                    <div className={'form-group  ' } >
                                      <label htmlFor="dan-toc" className="col-md-3 control-label">Dân tộc<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <select className="form-control" id="dan-toc" value={this.state.state2.svdoituong}
                                              onChange={DangKyLuuTruAction.updateDoiTuong} ref='DoiTuongTextField'>
                                            <option value =''>-- Chọn dân tộc --</option>
                                            {doiTuongUuTien}
                                          </select>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateDoiTuong}</span></div>
                                      </div>
                                    </div>
                                  {/*Ton giao*/}
                                    <div className={'form-group  ' } >
                                      <label htmlFor="ton-giao" className="col-md-3 control-label">Tôn giáo<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <input type='text' className="form-control" id='ton-giao' value={this.state.state2.svtongiao}
                                            onChange={DangKyLuuTruAction.updateTonGiao} ref='TonGiaoTextField'/>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateTonGiao}</span></div>
                                      </div>
                                    </div>
                                  {/*Doan the*/}
                                    <div className={'form-group ' } >
                                      <label htmlFor="doan-the" className="col-md-3 control-label">Đoàn thể<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <select className="form-control" id="doan-the" value={this.state.state2.svdoanthe}
                                              onChange={DangKyLuuTruAction.updateDoanThe} ref='DoanTheTextField'>
                                            <option value =''>-- Chọn đoàn thể --</option>
                                            <option value='k'>Không</option>
                                            <option value='dangvien'>Đảng viên</option>
                                            <option value='doanvien'>Đoàn viên</option>

                                          </select>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateDoanThe}</span></div>
                                      </div>
                                    </div>
                                    {/*So cmnd*/}
                                    <div className={'form-group  ' } >
                                      <label htmlFor="cmnd" className="col-md-3 control-label">Số CMND<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <input type='number' className="form-control" id='cmnd' value={this.state.state2.socmnd}
                                            onChange={DangKyLuuTruAction.updateSoCMND} ref='SoCMNDTextField'/>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateSoCMND}</span></div>
                                      </div>
                                    </div>
                                  {/*Ho khau thuong tru*/}
                                    <div className={'form-group ' } >
                                      <label htmlFor="ho-khau" className="col-md-3 control-label">Hộ khẩu thường trú<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <input type='text' className="form-control" id='ho-khau' value={this.state.state2.hokhau}
                                            onChange={DangKyLuuTruAction.updateHoKhau} ref='HoKhauTextField'/>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateHoKhau}</span></div>
                                      </div>
                                    </div>
                                  {/*dien thoai sv*/}
                                    <div className={'form-group ' } >
                                      <label htmlFor="dien-thoai-sv" className="col-md-3 control-label">Điện thoại sinh viên<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <input type='tel' className="form-control" id='dien-thoai-sv' value={this.state.state2.svdienthoai}
                                            onChange={DangKyLuuTruAction.updateDienThoaiSV} ref='DienThoaiSVTextField'/>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateDienThoaiSV}</span></div>
                                      </div>
                                    </div>
                                  {/*dien thoai gia dinh*/}
                                    <div className={'form-group ' } >
                                      <label htmlFor="dien-thoai-gia-dinh" className="col-md-3 control-label">Điện thoại gia đình<span className="text-danger">(*)</span></label>
                                      <div className="col-md-7">
                                          <input type='tel' className="form-control" id='dien-thoai-gia-dinh' value={this.state.state2.giadinhdienthoai}
                                            onChange={DangKyLuuTruAction.updateDienThoaiGiaDinh} ref='DienThoaiGiaDinhTextField'/>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateDienThoaiGiaDinh}</span></div>
                                      </div>
                                    </div>
                                  {/*dien thoai gia dinh*/}
                                    <div className={'form-group ' } >
                                      <label htmlFor="email-thuong-dung" className="col-md-3 control-label">Email thường dùng</label>
                                      <div className="col-md-7">
                                          <input type='email' className="form-control" id='email-thuong-dung' value={this.state.state2.emailThuongDung}
                                            onChange={DangKyLuuTruAction.updateEmailThuongDung} ref='EmailThuongDungTextField'/>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateEmailThuongDung}</span></div>
                                      </div>
                                    </div>
                                    
                                    
                                </div>
                                <div className="form-footer">
                                    <div className="panel-body quy-dinh-dang-ky">
                                        <div>
                                            <p className="text-red bold">Những lưu ý cần biết khi thực hiện đăng ký lưu trú qua mạng:</p>
                                            <ul className="list-number">
                                                <li>Sinh viên phải nhập thông tin đầy đủ, chính xác theo yêu cầu và phải chịu trách nhiệm trước thông tin do mình nhập vào, sau khi đăng ký thành công, những sinh viên có thông tin không chính xác mặc nhiên sẽ mất quyền ưu tiên được xét.</li>
                                                <li>Thông tin sinh viên gửi đến đăng ký đặt chỗ nhằm làm cơ sở cho hội đồng xét chọn lưu trú tham khảo ban đầu, những thông tin này không có giá trị thay thế cho hồ sơ lưu trú.</li>
                                                <li>Việc đăng ký qua mạng được thực hiện cho sinh viên đang thuê chỗ ở và sinh viên chưa thuê chỗ ở tại KTXBK, sinh viên check vào ô tương ứng để đăng ký. Việc đăng ký mới chỉ được thực hiện cho những sinh viên chưa được thuê chỗ ở và chỉ được đăng ký một lần cho một mã số sinh viên trong một học kỳ của một năm học, vì vậy những sinh viên đang lưu trú tại KTX, đương nhiên sẽ không đăng ký mới được.</li>
                                                <li>Danh sách sinh viên được xét lưu trú tại ký túc xá sẽ được thông báo trên Web Site KTX, Sinh viên theo dõi các thông báo tại khoa – Phòng – Ban – Trung tâm hoặc trên Web Site KTX để biết thêm chi tiết.  </li>
                                                <li>Nếu có thông tin sai sót cần sửa đổi hoặc thắc mắc xin vui lòng liên hệ trực tiếp theo địa chỉ:</li>
                                            </ul>
                                            <p className="bold">Ký túc xá Bách Khoa</p>
                                            <p className="bold">Địa chỉ        : 497 Hòa Hảo, P7, Q10, Tp Hồ Chí Minh</p>
                                            <p className="bold">Điện thoại  :  08.39573946</p>
                                            <p className="bold">Email          : <a href="mailto:ktx@hcmut.edu.vn" target="_top">ktx@hcmut.edu.vn</a></p>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                      <div className="col-sm-offset-3">
                                        <div className="checkbox col-sm-12">
                                          <label><input type="checkbox" value={this.state.state2.dongY} onChange={DangKyLuuTruAction.updateDongY}/>Tôi đã đọc và đồng ý các qui định trên, chọn tiếp tục đăng ký.</label>
                                          <div className=''><span className="control-label text-danger">{this.state.state2.validateDongY}</span></div>
                                        </div>
                                        <button type="submit" className="btn btn-success" onClick={this.nhapThongTin.bind(this)}><span>Đăng ký</span></button>
                                        
                                      </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                      </div>

                      {/*form nhap thong tin dang ky luu tru*/}
                      <div className="panel rounded shadow no-overflow" style={{'display': this.state.state2.styleFormDangKyLuuTru}}>
                        <div className="panel-heading">
                            <div className="pull-left"><h3 className="panel-title">{this.state.state2.titleForm}</h3></div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="panel-body no-padding">
                          
                          <form className="form-horizontal" role="form" onSubmit ={this.dangKyLuuTru.bind(this)}>
                            <div className="form-body">
                              
                              
                              
                              
                              
                              <div className={'form-group  ' }>
                                <label htmlFor="sinh-vien" className="col-md-3 control-label">Học lực<span className="text-danger">(*)</span></label>
                                <div className="col-md-7">
                                    <select className="form-control" id="sinh-vien" value={this.state.state2.svhocluc}
                                        onChange={DangKyLuuTruAction.updateHocLuc} ref='HocLucTextField'>
                                      <option value =''>-- Chọn học lực --</option>
                                      {sinhvien}
                                    </select>
                                    <div className=''><span className="control-label text-danger">{this.state.state2.validateHocLuc}</span></div>
                                </div>
                              </div>
                              <div className={'form-group ' }>
                                <label htmlFor="hoan-canh" className="col-md-3 control-label">Hoàn cảnh gia đình<span className="text-danger">(*)</span></label>
                                <div className="col-md-7">
                                    <select className="form-control" id="hoan-canh" value={this.state.state2.svhoancanh}
                                        onChange={DangKyLuuTruAction.updateHoanCanh} ref='HoanCanhTextField'>
                                      <option value =''>-- Chọn hoàn cảnh --</option>
                                      {hoanCanh}
                                    </select>
                                    <div className=''><span className="control-label text-danger">{this.state.state2.validateHoanCanh}</span></div>
                                </div>
                              </div>
                              <div className={'form-group  ' }>
                                <label htmlFor="phong-luu-tru" className="col-md-3 control-label">Nguyện vọng lưu trú<span className="text-danger">(*)</span></label>
                                <div className="col-md-7">
                                    <select className="form-control" id="phong-luu-tru" onChange={DangKyLuuTruAction.updateLoaiPhong}
                                        value={this.state.state2.svloaiphong} ref='LoaiPhongTextField'>
                                      <option value=''>-- Chọn loại phòng --</option>
                                      {loaiPhong}
                                    </select>
                                    <div className=''><span className="control-label text-danger">{this.state.state2.validateLoaiPhong}</span></div>
                                </div>
                              </div>
                              <div className={'form-group  ' } style={{'display':this.state.state2.styleDichVu}}>
                                <label htmlFor="dich-vu-phong-thuong" className="col-md-3 control-label">Dịch vụ<span className="text-danger">(*)</span></label>
                                <div className="col-md-7">

                                    {dichVu}
                                    
                                    <div className=''><span className="control-label text-danger"></span></div>
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
                                    <button type="button" className="btn btn-warning" onClick={DangKyLuuTruAction.quayLai} style={{'display':this.state.state2.displayQuayLaiBtn}}>Quay lại</button>
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


    //return (
            {/*<div className="container luu-tru">

              <div className="row">
                <div className="col-md-9 ">
                  <ol className="breadcrumb no-overflow">
                      <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Trang chủ</Link></li>
                      <li>{this.state.state2.titleForm}</li>
                  </ol>*/}

                  {/*form nhap thong tin ca nhan*/}
                  {/*<div className="panel rounded shadow no-overflow" style={{'display': this.state.state2.styleFormThongTinCaNhan}}>
                    <div className="panel-heading">
                        <div className="pull-left"><h3 className="panel-title">{this.state.state2.titleForm}</h3></div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="panel-body no-padding">
                        <form className="form-horizontal" role="form" >
                            <div className="form-body">
                                
                                <div className={'form-group ' } >
                                  <label htmlFor="ho-lot" className="col-md-3 control-label">Họ Lót<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <input type='text' className="form-control" id='ho-lot' value={this.state.state2.holot}
                                        onChange={DangKyLuuTruAction.updateHoLot} ref='HoLotTextField'/>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateHoLot}</span></div>
                                  </div>
                                </div>
                                
                                <div className={'form-group  ' } >
                                  <label htmlFor="ten" className="col-md-3 control-label">Tên<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <input type='text' className="form-control" id='ten' value={this.state.state2.ten}
                                        onChange={DangKyLuuTruAction.updateTen} ref='TenTextField'/>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateTen}</span></div>
                                  </div>
                                </div>
                                
                                <div className={'form-group ' } >
                                  <label htmlFor="khu-vuc-uu-tien" className="col-md-3 control-label">Khu vực ưu tiên<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <select className="form-control" id="khu-vuc-uu-tien" value={this.state.state2.svkhuvuc}
                                          onChange={DangKyLuuTruAction.updateKhuVuc} ref='KhuVucTextField'>
                                        <option value =''>-- Chọn khu vực ưu tiên --</option>
                                        {khuVucUuTien}
                                      </select>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateKhuVuc}</span></div>
                                  </div>
                                </div>
                              
                                <div className="form-group"  >
                                    <label className="control-label col-md-3 col-sm-3" htmlFor="">Giới tính<span className="text-danger">(*)</span></label>
                                    <div className="col-md-7 col-sm-7"> 
                                        <label className="radio-inline"><input type="radio" name="gender" value="m" onClick={DangKyLuuTruAction.updateGioiTinhNam} checked={this.state.state2.checkNam}/>Nam</label>
                                        <label className="radio-inline"><input type="radio" name="gender" value="f" onClick={DangKyLuuTruAction.updateGioiTinhNu} checked={this.state.state2.checkNu}/>Nữ</label>
                                        <div className=''><span className="control-label text-danger">{this.state.state2.validateGioiTinh}</span></div>
                                    </div>
                                </div>
                                
                                <div className="form-group"  >
                                    <label className="control-label col-md-3 col-sm-3" htmlFor="">Ngày sinh<span className="text-danger">(*)</span></label>
                                    <div className="col-md-7 col-sm-7"> 
                                      <DatePicker
                                          openToDate={moment("1994-09-28")}
                                          dateFormat="YYYY-MM-DD"
                                          selected={this.state.state2.ngaySinh}
                                          onChange={this.handleChangeNgaySinh}
                                          peekNextMonth 
                                          showMonthDropdown 
                                          showYearDropdown 
                                          scrollableYearDropdown
                                              dropdownMode="select" />
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateNgaySinh}</span></div>
                                    </div>
                                </div>
                                
                                <div className={'form-group ' } >
                                  <label htmlFor="tinh" className="col-md-3 control-label">Tỉnh<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <select className="form-control" id="tinh" value={this.state.state2.svtinh}
                                          onChange={DangKyLuuTruAction.updateTinh} ref='TinhTextField'>
                                        <option value =''>-- Chọn tỉnh --</option>
                                        {tinh}

                                      </select>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateTinh}</span></div>
                                  </div>
                                </div>
                              
                                <div className={'form-group ' } >
                                  <label htmlFor="khoa" className="col-md-3 control-label">Khoa<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <select className="form-control" id="khoa" value={this.state.state2.svkhoa}
                                          onChange={DangKyLuuTruAction.updateKhoa} ref='KhoaTextField'>
                                        <option value =''>-- Chọn khoa --</option>
                                        
                                        {listKhoa}

                                      </select>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateKhoa}</span></div>
                                  </div>
                                </div>
                              
                                <div className={'form-group  ' }>
                                  <label htmlFor="nam-vao-truong" className="col-md-3 control-label">Năm vào trường<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <input type='number' className="form-control" id='nam-vao-truong' value={this.state.state2.namvaotruong}
                                        onChange={DangKyLuuTruAction.updateNamVaoTruong} ref='NamTextField'/>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateNam}</span></div>
                                  </div>
                                </div>
                              
                                <div className={'form-group  ' } >
                                  <label htmlFor="he-dao-tao" className="col-md-3 control-label">Hệ đào tạo<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <select className="form-control" id="he-dao-tao" value={this.state.state2.svhedaotao}
                                          onChange={DangKyLuuTruAction.updateHeDaoTao} ref='HeDaoTaoTextField'>
                                        <option value =''>-- Chọn hệ dào tạo --</option>
                                        {listHeDaoTao}

                                      </select>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateHeDaoTao}</span></div>
                                  </div>
                                </div>
                              
                                <div className={'form-group  ' } >
                                  <label htmlFor="dan-toc" className="col-md-3 control-label">Dân tộc<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <select className="form-control" id="dan-toc" value={this.state.state2.svdoituong}
                                          onChange={DangKyLuuTruAction.updateDoiTuong} ref='DoiTuongTextField'>
                                        <option value =''>-- Chọn dân tộc --</option>
                                        {doiTuongUuTien}
                                      </select>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateDoiTuong}</span></div>
                                  </div>
                                </div>
                              
                                <div className={'form-group  ' } >
                                  <label htmlFor="ton-giao" className="col-md-3 control-label">Tôn giáo<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <input type='text' className="form-control" id='ton-giao' value={this.state.state2.svtongiao}
                                        onChange={DangKyLuuTruAction.updateTonGiao} ref='TonGiaoTextField'/>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateTonGiao}</span></div>
                                  </div>
                                </div>
                             
                                <div className={'form-group ' } >
                                  <label htmlFor="doan-the" className="col-md-3 control-label">Đoàn thể<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <select className="form-control" id="doan-the" value={this.state.state2.svdoanthe}
                                          onChange={DangKyLuuTruAction.updateDoanThe} ref='DoanTheTextField'>
                                        <option value =''>-- Chọn đoàn thể --</option>
                                        <option value='k'>Không</option>
                                        <option value='dangvien'>Đảng viên</option>
                                        <option value='doanvien'>Đoàn viên</option>

                                      </select>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateDoanThe}</span></div>
                                  </div>
                                </div>
                                
                                <div className={'form-group  ' } >
                                  <label htmlFor="cmnd" className="col-md-3 control-label">Số CMND<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <input type='number' className="form-control" id='cmnd' value={this.state.state2.socmnd}
                                        onChange={DangKyLuuTruAction.updateSoCMND} ref='SoCMNDTextField'/>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateSoCMND}</span></div>
                                  </div>
                                </div>
                              
                                <div className={'form-group ' } >
                                  <label htmlFor="ho-khau" className="col-md-3 control-label">Hộ khẩu thường trú<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <input type='text' className="form-control" id='ho-khau' value={this.state.state2.hokhau}
                                        onChange={DangKyLuuTruAction.updateHoKhau} ref='HoKhauTextField'/>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateHoKhau}</span></div>
                                  </div>
                                </div>
                              
                                <div className={'form-group ' } >
                                  <label htmlFor="dien-thoai-sv" className="col-md-3 control-label">Điện thoại sinh viên<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <input type='tel' className="form-control" id='dien-thoai-sv' value={this.state.state2.svdienthoai}
                                        onChange={DangKyLuuTruAction.updateDienThoaiSV} ref='DienThoaiSVTextField'/>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateDienThoaiSV}</span></div>
                                  </div>
                                </div>
                              
                                <div className={'form-group ' } >
                                  <label htmlFor="dien-thoai-gia-dinh" className="col-md-3 control-label">Điện thoại gia đình<span className="text-danger">(*)</span></label>
                                  <div className="col-md-7">
                                      <input type='tel' className="form-control" id='dien-thoai-gia-dinh' value={this.state.state2.giadinhdienthoai}
                                        onChange={DangKyLuuTruAction.updateDienThoaiGiaDinh} ref='DienThoaiGiaDinhTextField'/>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateDienThoaiGiaDinh}</span></div>
                                  </div>
                                </div>
                              
                                <div className={'form-group ' } >
                                  <label htmlFor="email-thuong-dung" className="col-md-3 control-label">Email thường dùng</label>
                                  <div className="col-md-7">
                                      <input type='email' className="form-control" id='email-thuong-dung' value={this.state.state2.emailThuongDung}
                                        onChange={DangKyLuuTruAction.updateEmailThuongDung} ref='EmailThuongDungTextField'/>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateEmailThuongDung}</span></div>
                                  </div>
                                </div>
                                
                                
                            </div>
                            <div className="form-footer">
                                <div className="panel-body quy-dinh-dang-ky">
                                    <div>
                                        <p className="text-red bold">Những lưu ý cần biết khi thực hiện đăng ký lưu trú qua mạng:</p>
                                        <ul className="list-number">
                                            <li>Sinh viên phải nhập thông tin đầy đủ, chính xác theo yêu cầu và phải chịu trách nhiệm trước thông tin do mình nhập vào, sau khi đăng ký thành công, những sinh viên có thông tin không chính xác mặc nhiên sẽ mất quyền ưu tiên được xét.</li>
                                            <li>Thông tin sinh viên gửi đến đăng ký đặt chỗ nhằm làm cơ sở cho hội đồng xét chọn lưu trú tham khảo ban đầu, những thông tin này không có giá trị thay thế cho hồ sơ lưu trú.</li>
                                            <li>Việc đăng ký qua mạng được thực hiện cho sinh viên đang thuê chỗ ở và sinh viên chưa thuê chỗ ở tại KTXBK, sinh viên check vào ô tương ứng để đăng ký. Việc đăng ký mới chỉ được thực hiện cho những sinh viên chưa được thuê chỗ ở và chỉ được đăng ký một lần cho một mã số sinh viên trong một học kỳ của một năm học, vì vậy những sinh viên đang lưu trú tại KTX, đương nhiên sẽ không đăng ký mới được.</li>
                                            <li>Danh sách sinh viên được xét lưu trú tại ký túc xá sẽ được thông báo trên Web Site KTX, Sinh viên theo dõi các thông báo tại khoa – Phòng – Ban – Trung tâm hoặc trên Web Site KTX để biết thêm chi tiết.  </li>
                                            <li>Nếu có thông tin sai sót cần sửa đổi hoặc thắc mắc xin vui lòng liên hệ trực tiếp theo địa chỉ:</li>
                                        </ul>
                                        <p className="bold">Ký túc xá Bách Khoa</p>
                                        <p className="bold">Địa chỉ        : 497 Hòa Hảo, P7, Q10, Tp Hồ Chí Minh</p>
                                        <p className="bold">Điện thoại  :  08.39573946</p>
                                        <p className="bold">Email          : <a href="mailto:ktx@hcmut.edu.vn" target="_top">ktx@hcmut.edu.vn</a></p>
                                    </div>
                                </div>
                                <div className="form-group">
                                  <div className="col-sm-offset-3">
                                    <div className="checkbox col-sm-12">
                                      <label><input type="checkbox" value={this.state.state2.dongY} onChange={DangKyLuuTruAction.updateDongY}/>Tôi đã đọc và đồng ý các qui định trên, chọn tiếp tục đăng ký.</label>
                                      <div className=''><span className="control-label text-danger">{this.state.state2.validateDongY}</span></div>
                                    </div>
                                    <button type="submit" className="btn btn-success" onClick={this.nhapThongTin.bind(this)}><span>Đăng ký</span></button>
                                    
                                  </div>
                                </div>
                            </div>
                        </form>
                    </div>
                  </div>

                  
                  <div className="panel rounded shadow no-overflow" style={{'display': this.state.state2.styleFormDangKyLuuTru}}>
                    <div className="panel-heading">
                        <div className="pull-left"><h3 className="panel-title">{this.state.state2.titleForm}</h3></div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="panel-body no-padding">
                      
                      <form className="form-horizontal" role="form" onSubmit ={this.dangKyLuuTru.bind(this)}>
                        <div className="form-body">
                          
                          
                          
                          
                          
                          <div className={'form-group  ' }>
                            <label htmlFor="sinh-vien" className="col-md-3 control-label">Học lực<span className="text-danger">(*)</span></label>
                            <div className="col-md-7">
                                <select className="form-control" id="sinh-vien" value={this.state.state2.svhocluc}
                                    onChange={DangKyLuuTruAction.updateHocLuc} ref='HocLucTextField'>
                                  <option value =''>-- Chọn học lực --</option>
                                  {sinhvien}
                                </select>
                                <div className=''><span className="control-label text-danger">{this.state.state2.validateHocLuc}</span></div>
                            </div>
                          </div>
                          <div className={'form-group ' }>
                            <label htmlFor="hoan-canh" className="col-md-3 control-label">Hoàn cảnh gia đình<span className="text-danger">(*)</span></label>
                            <div className="col-md-7">
                                <select className="form-control" id="hoan-canh" value={this.state.state2.svhoancanh}
                                    onChange={DangKyLuuTruAction.updateHoanCanh} ref='HoanCanhTextField'>
                                  <option value =''>-- Chọn hoàn cảnh --</option>
                                  {hoanCanh}
                                </select>
                                <div className=''><span className="control-label text-danger">{this.state.state2.validateHoanCanh}</span></div>
                            </div>
                          </div>
                          <div className={'form-group  ' }>
                            <label htmlFor="phong-luu-tru" className="col-md-3 control-label">Nguyện vọng lưu trú<span className="text-danger">(*)</span></label>
                            <div className="col-md-7">
                                <select className="form-control" id="phong-luu-tru" onChange={DangKyLuuTruAction.updateLoaiPhong}
                                    value={this.state.state2.svloaiphong} ref='LoaiPhongTextField'>
                                  <option value=''>-- Chọn loại phòng --</option>
                                  {loaiPhong}
                                </select>
                                <div className=''><span className="control-label text-danger">{this.state.state2.validateLoaiPhong}</span></div>
                            </div>
                          </div>
                          <div className={'form-group  ' } style={{'display':this.state.state2.styleDichVu}}>
                            <label htmlFor="dich-vu-phong-thuong" className="col-md-3 control-label">Dịch vụ<span className="text-danger">(*)</span></label>
                            <div className="col-md-7">

                                {dichVu}
                                
                                <div className=''><span className="control-label text-danger"></span></div>
                            </div>
                          </div>

                        </div>

                         
                        <div className="form-footer">
                            <div className="form-group">
                              <div className="col-sm-offset-3">
                                <button type="button" className="btn btn-warning" onClick={DangKyLuuTruAction.quayLai} style={{'display':this.state.state2.displayQuayLaiBtn}}>Quay lại</button>
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
            </div>*/}
    //);
  
  }
}
