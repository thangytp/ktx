import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import localStorage from 'localStorage';

import ManageUuTienAction from '../../../actions/admin/manage-uutien/ManageUuTienAction';
import ManageUuTienStore from '../../../stores/admin/manage-uutien/ManageUuTienStore';

import DangKyLuuTruAction from '../../../actions/main/luutru/DangKyLuuTruAction';
import DangKyLuuTruStore from '../../../stores/main/luutru/DangKyLuuTruStore';

export default class SignUp extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {state1: ManageUuTienStore.getState(), state2: DangKyLuuTruStore.getState()};
    this.onChange = this.onChange.bind(this);
  }
   componentDidMount() {
    ManageUuTienStore.listen(this.onChange);
    DangKyLuuTruStore.listen(this.onChange);

    ManageUuTienAction.getKhuvuc();
    ManageUuTienAction.getTinh();
    ManageUuTienAction.getDoituong();
    ManageUuTienAction.getHocluc();
    ManageUuTienAction.getHoancanh();
  }
  componentWillUnmount() {
    ManageUuTienStore.unlisten(this.onChange);
    DangKyLuuTruStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState({state1: ManageUuTienStore.getState(), state2: DangKyLuuTruStore.getState()});
  }
  dangKyLuuTru(event)
  {
    console.log('aaa');
    var userEmail = localStorage.getItem('email');
    var userName = localStorage.getItem('name');
    var namvaotruong = this.state.state2.namvaotruong;
    var svkhuvuc = this.state.state2.svkhuvuc;
    var svtinh = this.state.state2.svtinh;
    var svdoituong = this.state.state2.svdoituong;
    var svhocluc = this.state.state2.svhocluc;
    var svhoancanh = this.state.state2.svhoancanh;
    var svloaiphong = this.state.state2.svloaiphong;
    console.log(userName);

    var presentYear = new Date().getFullYear();

    if (namvaotruong > presentYear || (presentYear - namvaotruong) > 6) {
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

    else {
        DangKyLuuTruAction.dangKyLuuTru({ userEmail: userEmail, userName: userName,  svkhuvuc: svkhuvuc, svtinh: svtinh,
            svdoituong: svdoituong, svhocluc: svhocluc, svhoancanh: svhoancanh, svloaiphong: svloaiphong});
    }
    event.preventDefault();

  }

  render() {

    let khuVucUuTien = this.state.state1.khuvuc.map((kv, index)=>{
        return(
              <option value={kv._id} key={index}>{kv.ten}</option>
          );
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

    return (
            <div className="container luu-tru">

              <div className="row">
                <div className="col-md-10 col-md-offset-1">
                  <h2>Đăng ký lưu trú ký túc xá</h2>
                  <div ><span>{this.state.state2.messDK}</span></div>
                  <form className="form-horizontal" role="form" onSubmit ={this.dangKyLuuTru.bind(this)}>
                    <div className="form-body">
                      <div className={'form-group has-feedback ' }>
                        <label htmlFor="nam-vao-truong" className="col-md-3 control-label">Năm vào trường</label>
                        <div className="col-md-9">
                            <input type='number' className="form-control" id='nam-vao-truong' value={this.state.state2.namvaotruong}
                              onChange={DangKyLuuTruAction.updateNamVaoTruong} ref='NamTextField'/>
                            <div className=''><span className="control-label">{this.state.state2.validateNam}</span></div>
                        </div>
                      </div>
                      <div className={'form-group has-feedback ' }>
                        <label htmlFor="khu-vuc-uu-tien" className="col-md-3 control-label">Khu vực ưu tiên</label>
                        <div className="col-md-9">
                            <select className="form-control" id="khu-vuc-uu-tien" value={this.state.state2.svkhuvuc}
                                onChange={DangKyLuuTruAction.updateKhuVuc} ref='KhuVucTextField'>
                              <option value =''>-- Chọn khu vực ưu tiên --</option>
            					        {khuVucUuTien}
                            </select>
                            <div className=''><span className="control-label">{this.state.state2.validateKhuVuc}</span></div>
                        </div>
                      </div>
                      <div className={'form-group has-feedback ' }>
                        <label htmlFor="tinh" className="col-md-3 control-label">Tỉnh</label>
                        <div className="col-md-9">
                            <select className="form-control" id="tinh" value={this.state.state2.svtinh}
                                onChange={DangKyLuuTruAction.updateTinh} ref='TinhTextField'>
                              <option value =''>-- Chọn tỉnh --</option>
                              {tinh}
                              {/*<option value="0">-Tỉnh-</option>

                              <option value="1">Hồ Chí Minh</option>

                              <option value="2">Hà Nội</option>

                              <option value="3">Đà Nẵng</option>

                              <option value="4">Cần Thơ</option>

                              <option value="5">Hải Phòng</option>

                              <option value="6">An Giang</option>

                              <option value="7">Bà Rịa Vũng Tàu</option>

                              <option value="8">Bắc Giang</option>

                              <option value="9">Bắc Kạn</option>

                              <option value="10">Bạc Liêu</option>

                              <option value="11">Bắc Ninh</option>

                              <option value="12">Bến Tre</option>

                              <option value="13">Bình Định</option>

                              <option value="14">Bình Dương</option>

                              <option value="15">Bình Phước</option>

                              <option value="16">Bình Thuận</option>

                              <option value="17">Cà Mau</option>

                              <option value="18">Cao Bằng</option>

                              <option value="19">Đăk Lăk</option>

                              <option value="20">Đăk Nông</option>

                              <option value="21">Điện Biên</option>

                              <option value="22">Đồng Nai</option>

                              <option value="23">Đồng Tháp</option>

                              <option value="24">Gia Lai</option>

                              <option value="25">Hà Giang</option>

                              <option value="26">Hà Nam</option>

                              <option value="27">Hà Tĩnh</option>

                              <option value="28">Hải Dương</option>

                              <option value="29">Hậu Giang</option>

                              <option value="30">Hòa Bình</option>

                              <option value="31">Hưng Yên</option>

                              <option value="32">Khánh Hòa</option>

                              <option value="33">Kiên Giang</option>

                              <option value="34">Kon Tum</option>

                              <option value="35">Lai Châu</option>

                              <option value="36">Lâm Đồng</option>

                              <option value="37">Lạng Sơn</option>

                              <option value="38">Lào Cai</option>

                              <option value="39">Long An</option>

                              <option value="40">Nam Định</option>

                              <option value="41">Nghệ An</option>

                              <option value="42">Ninh Bình</option>

                              <option value="43">Ninh Thuận</option>

                              <option value="44">Phú Thọ</option>

                              <option value="45">Phú Yên</option>

                              <option value="46">Quảng Bình</option>

                              <option value="47">Quảng Nam</option>

                              <option value="48">Quảng Ngãi</option>

                              <option value="49">Quảng Ninh</option>

                              <option value="50">Quảng Trị</option>

                              <option value="51">Sóc Trăng</option>

                              <option value="52">Sơn La</option>

                              <option value="53">Tây Ninh</option>

                              <option value="54">Thái Bình</option>

                              <option value="55">Thái Nguyên</option>

                              <option value="56">Thanh Hóa</option>

                              <option value="57">Thừa Thiên Huế</option>

                              <option value="58">Tiền Giang</option>

                              <option value="59">Trà Vinh</option>

                              <option value="60">Tuyên Quang</option>

                              <option value="61">Vĩnh Long</option>

                              <option value="62">Vĩnh Phúc</option>

                              <option value="63">Yên Bái</option>*/}

                            </select>
                            <div className=''><span className="control-label">{this.state.state2.validateTinh}</span></div>
                        </div>
                      </div>
                      <div className={'form-group has-feedback ' }>
                        <label htmlFor="doi-tuong-uu-tien" className="col-md-3 control-label">Đối tượng ưu tiên</label>
                        <div className="col-md-9">
                            <select className="form-control" id="doi-tuong-uu-tien" value={this.state.state2.svdoituong}
                                onChange={DangKyLuuTruAction.updateDoiTuong} ref='DoiTuongTextField'>
                              <option value =''>-- Chọn đối tượng ưu tiên --</option>
                              {doiTuongUuTien}
                            </select>
                            <div className=''><span className="control-label">{this.state.state2.validateDoiTuong}</span></div>
                        </div>
                      </div>
                      <div className={'form-group has-feedback ' }>
                        <label htmlFor="sinh-vien" className="col-md-3 control-label">Là sinh viên</label>
                        <div className="col-md-9">
                            <select className="form-control" id="sinh-vien" value={this.state.state2.svhocluc}
                                onChange={DangKyLuuTruAction.updateHocLuc} ref='HocLucTextField'>
                              <option value =''>-- Chọn học lực --</option>
                              {sinhvien}
                            </select>
                            <div className=''><span className="control-label">{this.state.state2.validateHocLuc}</span></div>
                        </div>
                      </div>
                      <div className={'form-group has-feedback ' }>
                        <label htmlFor="hoan-canh" className="col-md-3 control-label">Hoàn cảnh gia đình</label>
                        <div className="col-md-9">
                            <select className="form-control" id="hoan-canh" value={this.state.state2.svhoancanh}
                                onChange={DangKyLuuTruAction.updateHoanCanh} ref='HoanCanhTextField'>
                              <option value =''>-- Chọn hoàn cảnh --</option>
                              {hoanCanh}
                            </select>
                            <div className=''><span className="control-label">{this.state.state2.validateHoanCanh}</span></div>
                        </div>
                      </div>
                      <div className={'form-group has-feedback ' }>
                        <label htmlFor="phong-luu-tru" className="col-md-3 control-label">Nguyện vọng lưu trú</label>
                        <div className="col-md-9">
                            <select className="form-control" id="phong-luu-tru" onChange={DangKyLuuTruAction.updateLoaiPhong}
                                value={this.state.state2.svloaiphong}>
                              <option value='0'>Phòng thông thường</option>
                              <option value='1'>Phòng dịch vụ</option>
                            </select>
                        </div>
                      </div>

                    </div>

                     {/* <div className="form-group">
                        <label className="col-md-3 control-label" />
                        <div className="col-md-9">
                          <input type="checkbox" name="remember" defaultValue={1} /> Nhớ đến tôi?
                        </div>
                      </div>  */}
                    <div className="form-group">
                      <div className="col-sm-offset-3 col-sm-9">
                        <button type="submit" className="btn btn-default btn-signup" disabled={this.state.state2.disableDK}>Đăng ký lưu trú</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
    );
  }
}
