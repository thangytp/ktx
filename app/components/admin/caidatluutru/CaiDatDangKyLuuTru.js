import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import CaiDatLuuTruAction from '../../../actions/admin/caidatluutru/CaiDatLuuTruAction';
import CaiDatLuuTruStore from '../../../stores/admin/caidatluutru/CaiDatLuuTruStore';

class CaiDatDangKyLuuTru extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = CaiDatLuuTruStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		CaiDatLuuTruStore.listen(this.onChange);
		CaiDatLuuTruAction.getCaiDatDangKyMoi();
	}

	componentWillUnmount() {
		CaiDatLuuTruStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}


	handleChangeNgayBatDauDangKy(date){
	    CaiDatLuuTruAction.updateNgayBatDauDangKy(date);
	}
	handleChangeNgayKetThucDangKy(date){
	    CaiDatLuuTruAction.updateNgayKetThucDangKy(date);
	}

	luuDangKyLuuTruMoi(e){
		e.preventDefault();
		var idNgayBatDauDangKy = this.state.idNgayBatDauDangKy;
		var ngayBatDauDangKy = this.state.ngayBatDauDangKy._d;
		var ngayKetThucDangKy = this.state.ngayKetThucDangKy._d;
		if(idNgayBatDauDangKy){
			CaiDatLuuTruAction.updateDangKyLuuTruMoi({idNgayBatDauDangKy: idNgayBatDauDangKy, ngayBatDauDangKy: ngayBatDauDangKy, ngayKetThucDangKy: ngayKetThucDangKy});
		}
		else{
			CaiDatLuuTruAction.luuDangKyLuuTruMoi({ngayBatDauDangKy: ngayBatDauDangKy, ngayKetThucDangKy: ngayKetThucDangKy});
		}
	}

	handleChangeNgayBatDauGiaHan(date){
	    CaiDatLuuTruAction.updateNgayBatDauGiaHan(date);
	}
	handleChangeNgayKetThucGiaHan(date){
	    CaiDatLuuTruAction.updateNgayKetThucGiaHan(date);
	}
	luuGiaHanLuuTru(e){
		e.preventDefault();
		var idNgayBatDauDangKy = this.state.idNgayBatDauDangKy;
		console.log(idNgayBatDauDangKy);
		var ngayBatDauGiaHan = this.state.ngayBatDauGiaHan._d;
		var ngayKetThucGiaHan = this.state.ngayKetThucGiaHan._d;

		if(idNgayBatDauDangKy){
			CaiDatLuuTruAction.updateGiaHanLuuTru({idNgayBatDauDangKy: idNgayBatDauDangKy, ngayBatDauGiaHan: ngayBatDauGiaHan, ngayKetThucGiaHan: ngayKetThucGiaHan});
		}
		else{
			CaiDatLuuTruAction.luuGiaHanLuuTru({ ngayBatDauGiaHan: ngayBatDauGiaHan, ngayKetThucGiaHan: ngayKetThucGiaHan});
		}
	}

	editKhoa(id, ten){
		KhoaAdminAction.editKhoa({id: id, ten: ten});
	}

	

	render() { 

		
		return (
	    	<div className="body-content animated fadeIn">
		    	<div className="row">
		    		<div className="col-md-12">
		    			<ol className="breadcrumb">
	                      <li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
	                      <li>Cài đặt lưu trú</li>
	                    </ol>
	                    <div className="panel rounded shadow no-overflow">
	                      	<div className="panel-heading">
		                        <div className="pull-left"><h3 className="panel-title">Đăng ký lưu trú mới</h3></div>
		                        <div className="pull-right">
	                            	<button className="btn btn-sm" data-action="collapse" data-container="body" data-toggle="panel-body" data-placement="top" 
	                                	data-title="Collapse" data-original-title="" title=""><i className="fa fa-angle-up"></i></button>
	                        	</div>
	                        	<div className="clearfix"></div>
	                      	</div>
	                      	<div className="panel-body no-padding">
	                      		<form className="form-horizontal mt-10" encType="multipart/form-data" onSubmit={this.luuDangKyLuuTruMoi.bind(this)}>
                            		<div className="form-body">
	                            		<div className="form-group">
			                                <label className="control-label col-sm-3" htmlFor="name-item">Ngày bắt đầu đăng ký:</label>
			                                <div className="col-sm-7">
			                                	
			    								<DatePicker
		                                          dateFormat="YYYY-MM-DD"
		                                          selected={this.state.ngayBatDauDangKy}
		                                          onChange={this.handleChangeNgayBatDauDangKy}
		                                          peekNextMonth 
		                                          showMonthDropdown={true}
		                                          showYearDropdown={true}
		                                          scrollableYearDropdown
		                                              dropdownMode="select" />
									    		<span className='text-danger'>{this.state.helpBlockNgayBatDauDangKy}</span>
								    		</div>
								    	</div>
								    	<div className="form-group">
			                                <label className="control-label col-sm-3" htmlFor="name-item">Ngày kết thúc đăng ký:</label>
			                                <div className="col-sm-7">
			                                	
			    								<DatePicker
		                                          dateFormat="YYYY-MM-DD"
		                                          selected={this.state.ngayKetThucDangKy}
		                                          onChange={this.handleChangeNgayKetThucDangKy}
		                                          peekNextMonth 
		                                          showMonthDropdown 
		                                          showYearDropdown 
		                                          scrollableYearDropdown
		                                              dropdownMode="select" />
									    		<span className='text-danger'>{this.state.helpBlockNgayKetThucDangKy}</span>
								    		</div>
								    	</div>
				    				</div>
				    				<div className="form-footer">
		                              	<div className="form-group"> 
			                                <div className="col-sm-offset-3">
			                                    <button type="submit" className="btn btn-success">Lưu</button>
			                                    <span>{this.state.mesLuu}</span>
			                                </div>
		                              	</div>
		                            </div>
				    			</form>
				    		</div>
				    	</div>

				    	<div className="panel rounded shadow no-overflow">
	                      	<div className="panel-heading">
		                        <div className="pull-left"><h3 className="panel-title">Gia hạn lưu trú</h3></div>
		                        <div className="pull-right">
	                            	<button className="btn btn-sm" data-action="collapse" data-container="body" data-toggle="panel-body" data-placement="top" 
	                                	data-title="Collapse" data-original-title="" title=""><i className="fa fa-angle-up"></i></button>
	                        	</div>
	                        	<div className="clearfix"></div>
	                      	</div>
	                      	<div className="panel-body no-padding">
	                      		<form className="form-horizontal mt-10" encType="multipart/form-data" onSubmit={this.luuGiaHanLuuTru.bind(this)}>
                            		<div className="form-body">
	                            		<div className="form-group">
			                                <label className="control-label col-sm-3" htmlFor="name-item">Ngày bắt đầu gia hạn:</label>
			                                <div className="col-sm-7">
			                                	
			    								<DatePicker
		                                          dateFormat="YYYY-MM-DD"
		                                          selected={this.state.ngayBatDauGiaHan}
		                                          onChange={this.handleChangeNgayBatDauGiaHan}
		                                          peekNextMonth 
		                                          showMonthDropdown={true}
		                                          showYearDropdown={true}
		                                          scrollableYearDropdown
		                                              dropdownMode="select" />
									    		<span className='text-danger'>{this.state.helpBlockNgayBatDauGiaHan}</span>
								    		</div>
								    	</div>
								    	<div className="form-group">
			                                <label className="control-label col-sm-3" htmlFor="name-item">Ngày kết thúc gia hạn:</label>
			                                <div className="col-sm-7">
			                                	
			    								<DatePicker
		                                          dateFormat="YYYY-MM-DD"
		                                          selected={this.state.ngayKetThucGiaHan}
		                                          onChange={this.handleChangeNgayKetThucGiaHan}
		                                          peekNextMonth 
		                                          showMonthDropdown 
		                                          showYearDropdown 
		                                          scrollableYearDropdown
		                                              dropdownMode="select" />
									    		<span className='text-danger'>{this.state.helpBlockNgayKetThucGiaHan}</span>
								    		</div>
								    	</div>
				    				</div>
				    				<div className="form-footer">
		                              	<div className="form-group"> 
			                                <div className="col-sm-offset-3">
			                                    <button type="submit" className="btn btn-success">Lưu</button>
			                                    <span>{this.state.mesLuuGiaHan}</span>
			                                </div>
		                              	</div>
		                            </div>
				    			</form>
				    		</div>
				    	</div>

		    		</div>

		        </div>
		    </div>
	    );
  }
}

export default CaiDatDangKyLuuTru;