import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';

import InfoPageAction from '../../../actions/main/user/InfoPageAction';
import InfoPageStore from '../../../stores/main/user/InfoPageStore';

export default class InfoPage extends React.Component {
	constructor(props)
  {
    super(props);
    this.state = InfoPageStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    let userEmail = localStorage.getItem('email');
    console.log(userEmail);
    if(!userEmail){
      window.location.href="/login";
    }
    else {
      var mssv = userEmail.split('@');
      var svmssv = mssv[0];
      InfoPageAction.getStudent(svmssv);
    };
    InfoPageStore.listen(this.onChange);
  }
  componentWillUnmount() {
    InfoPageStore.unlisten(this.onChange);

  }
  onChange(state) {
    this.setState(state);
  }
  render(){

    // neu dang o ktx thi hien thong tin
    console.log(this.state.stu);
    if(this.state.id){
        let ngaySinh = new Date(this.state.stu.ngay_sinh);
        let gioiTinh = (this.state.stu.phai == "m") ? "Nam" : "Nữ";

      	return(
      		<div className="container info-page">
      			{/*breadcum*/}
      			<ol className="breadcrumb">
      			    <li><Link to="/">Trang chủ</Link></li>
      			    <li className="active">Thông tin sinh viên</li>
      			</ol>
      			<div className="row nM white-bg">
      				<div className="col-md-3 col-sm-12 mT20">
      					<div className="panel panel-fb">
    				      	<div className="panel-heading text-center text-upper bold">Sinh viên</div>
    				      	<img src={this.state.stu.avatar? this.state.stu.avatar : "/uploads/LogoBK.png"} className="img-responsive avatar"/>
    				      	<p className="text-center bold">{this.state.stu.ho_lot + " " + this.state.stu.ten}</p>
    				      	<p className="text-center bold">{this.state.stu.ma_sinh_vien}</p>
                    {this.state.stu.role === 1 ? <div className="col-sm-12 text-center"><button className="btn btn-fb"><Link to="/cau-hoi">Báo Hỏng Vật Dụng</Link></button></div> : ''}
    				    </div>
      				</div>
      				<div className="col-md-9 col-sm-12 mT20">
      					<h4 className="nMT head4"><i className="fa fa-user" aria-hidden="true"></i> Tài khoản</h4>
      					<div className="info1">
      						<p>Họ tên: {this.state.holot + " " + this.state.ten}</p>
      						<p>MSSV: {this.state.stu.ma_sinh_vien}</p>
      						<p>Khoa: {this.state.stu._khoa_id ? this.state.stu._khoa_id.ten : ''}</p>

      						<p>Ngày sinh: {ngaySinh.getDate() + "/" + (ngaySinh.getMonth() + 1) + "/" + ngaySinh.getFullYear()}</p>
      						<p>Giới tính: {gioiTinh}</p>
      						<p>Số CMND: {this.state.stu.so_cmnd}</p>
      						<p>Hộ khẩu thường trú: {this.state.stu.dia_chi_gia_dinh}</p>
      					</div>
      					<h4 className="head4 mT20"><i className="fa fa-info-circle" aria-hidden="true"></i> Thông tin liên lạc </h4>
      					<div className="info2">
      						<p>Di động: {this.state.stu.sdt_sinhvien}</p>
      						<p>Số điện thoại gia đình: {this.state.stu.sdt_giadinh}</p>
      						<p>Email (ngoài email sinh viên): {this.state.stu.email_khac}</p>
      					</div>
      					<h4 className="head4 mT20"><i className="fa fa-bed" aria-hidden="true"></i> Thông tin lưu trú</h4>
      					<div className="info3">
      						<p>Phòng: {this.state.stu._phongchitiet_id ? this.state.stu._phongchitiet_id.ma : ''}</p>
      						<p>Vị trí giường: TT1-1{this.state.stu._phongchitiet_id ? this.state.stu._phongchitiet_id.giuong.ten : ''}</p>

      					</div>
      				</div>
      			</div>
      		</div>
      		);
    }
    // else neu khong o ktx
    else{
        return(
          <div className="container info-page">
            {/*breadcum*/}
            <ol className="breadcrumb">
                <li><Link to="/">Trang chủ</Link></li>
                <li className="active">Thông tin sinh viên</li>
            </ol>
            <div className="row nM white-bg">
              <div className="panel rounded shadow no-overflow">
                <div className="panel-heading">
                    <div className="pull-left"><h3 className="panel-title">Thông tin sinh viên</h3></div>
                    <div className="clearfix"></div>
                </div>
                <div className="panel-body no-padding">
                    <h3 className='text-center'>Không có thông tin hiển thị</h3>
                </div>
              </div>
            </div>
          </div>
          );
    }
  }
}
