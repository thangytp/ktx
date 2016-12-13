import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';

export default class InfoPage extends React.Component {
	constructor(props)
  {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
   componentDidMount() {  
  }
  componentWillUnmount() {
  }
  onChange(state) {
    this.setState(state);
  } 
  render(){
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
				      	<img src="/uploads/LogoBK.png" className="img-responsive avatar"/>
				      	<p className="text-center bold">Nguyễn Văn A</p>
				      	<p className="text-center bold">51300000</p>
				    </div>
  				</div>
  				<div className="col-md-9 col-sm-12 mT20">
  					<h4 className="nMT head4"><i className="fa fa-user" aria-hidden="true"></i> Tài khoản</h4>
  					<div className="info1">
  						<p>Họ tên: </p>
  						<p>MSSV: </p>
  						<p>Khoa: </p>
  						<p>Ngành: </p>
  						<p>Ngày sinh: </p>
  						<p>Giới tính: </p>
  						<p>Số CMND: </p>
  						<p>Hộ khẩu thường trú: </p>
  					</div>
  					<h4 className="head4 mT20"><i className="fa fa-info-circle" aria-hidden="true"></i> Thông tin liên lạc <Link to="" className="pull-right normal-text">Cập nhật <i className="fa fa-angle-double-right" aria-hidden="true"></i></Link></h4>
  					<div className="info2">
  						<p>Di động: </p>
  						<p>Số điện thoại gia đình:</p>
  						<p>Email (ngoài email sinh viên): </p>
  					</div>
  					<h4 className="head4 mT20"><i className="fa fa-bed" aria-hidden="true"></i> Thông tin lưu trú</h4>
  					<div className="info3">
  						<p>Phòng</p>
  						<p>Vị trí giường</p>
  						<p>Tiện ích</p>
  					</div>
  				</div>
  			</div>
  		</div>
  		);
  }
}