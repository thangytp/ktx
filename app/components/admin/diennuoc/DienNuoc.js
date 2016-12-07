import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import DienNuocAction from '../../../actions/admin/diennuoc/DienNuocAction';
import DienNuocStore from '../../../stores/admin/diennuoc/DienNuocStore';

class DienNuoc extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = DienNuocStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		DienNuocStore.listen(this.onChange);
		
	}

	componentWillUnmount() {
		DienNuocStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}


	luuDangKyLuuTruMoi(e){
		e.preventDefault();
		var idNgayBatDauDangKy = this.state.idNgayBatDauDangKy;
		var ngayBatDauDangKy = this.state.ngayBatDauDangKy._d;
		var ngayKetThucDangKy = this.state.ngayKetThucDangKy._d;
		if(idNgayBatDauDangKy){
			DienNuocAction.updateDangKyLuuTruMoi({idNgayBatDauDangKy: idNgayBatDauDangKy, ngayBatDauDangKy: ngayBatDauDangKy, ngayKetThucDangKy: ngayKetThucDangKy});
		}
		else{
			DienNuocAction.luuDangKyLuuTruMoi({ngayBatDauDangKy: ngayBatDauDangKy, ngayKetThucDangKy: ngayKetThucDangKy});
		}
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

export default DienNuoc;