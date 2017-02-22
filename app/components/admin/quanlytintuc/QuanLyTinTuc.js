import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal, Tabs, Tab} from 'react-bootstrap';

import QuanLyTinTucAction from '../../../actions/admin/quanlytintuc/QuanLyTinTucAction';
import QuanLyTinTucStore from '../../../stores/admin/quanlytintuc/QuanLyTinTucStore';

import LogInAdminStore from '../../../stores/admin/login/LogInAdminStore';

import ListQuanLyTinTuc from './ListQuanLyTinTuc';
import ImgUpload from '../../../shared/ImgUpload';

class QuanLyTinTuc extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {state1: QuanLyTinTucStore.getState(), state2: LogInAdminStore.getState() };
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		QuanLyTinTucStore.listen(this.onChange);
		LogInAdminStore.listen(this.onChange);

		CKEDITOR.replace( 'ckedit', {
		allowedContent : true,
		pasteFromWordRemoveFontStyles : false,
		pasteFromWordRemoveStyles : false
		});
		// console.log(this.state);
	}

	componentWillUnmount() {
		QuanLyTinTucStore.unlisten(this.onChange);
		LogInAdminStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState({state1: QuanLyTinTucStore.getState(), state2: LogInAdminStore.getState() });
	}

	ChangeToSlug(title)
		{
		 	// var title = title.trim();
		    //Đổi chữ hoa thành chữ thường
		    var slug = title.toLowerCase();

		    //Đổi ký tự có dấu thành không dấu
		    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
		    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
		    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
		    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
		    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
		    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
		    slug = slug.replace(/đ/gi, 'd');
		    //Xóa các ký tự đặt biệt
		    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
		    //Đổi khoảng trắng thành ký tự gạch ngang
		    slug = slug.replace(/ /gi, "-");
		    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
		    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
		    slug = slug.replace(/\-\-\-\-\-/gi, '-');
		    slug = slug.replace(/\-\-\-\-/gi, '-');
		    slug = slug.replace(/\-\-\-/gi, '-');
		    slug = slug.replace(/\-\-/gi, '-');
		    //Xóa các ký tự gạch ngang ở đầu và cuối
		    slug = '@' + slug + '@';
		    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

		    return slug;
		}

	upload(event)
  	{
      	var imgfile = this.state.state1.fileAvatar;
      	var imgURL = this.state.state1.imagePreviewUrl;
        QuanLyTinTucAction.handleUpload();
        QuanLyTinTucAction.uploadImage(imgfile);
        console.log(this.state.state1.imageUrl);
  	}
   	detele(event)
  	{
        console.log(this.state.state1.imageUrl);
  	}

	// them tin tuc
	handleSubmitTinTuc(event){
		event.preventDefault();
		for ( var instance in CKEDITOR.instances )
        	CKEDITOR.instances[instance].updateElement();

		var id = this.state.state1.idTinTuc;
		var title = this.state.state1.titleTinTuc;
		var contentLeft = ReactDom.findDOMNode(this.refs.ContentTinTucField).value;
		var description = this.state.state1.description;
		var img = this.state.state1.imageUrl;
		var slug = this.ChangeToSlug(title);
		var dateCreate = new Date();
		var dateModify = new Date();
		var hienthi = this.state.state1.hienthi;

		var access_token = localStorage.getItem('access_token');
		if(!title){
			QuanLyTinTucAction.invalidTitle();
			this.refs.TitlePageField.focus();
		}
		else if(!contentLeft){
			QuanLyTinTucAction.invalidContent();
			this.refs.ContentTinTucField.focus();
		}
		else if(!description){
			QuanLyTinTucAction.invalidDes();
			this.refs.Description.focus();
		}

		// goi ham add page
		if(title && contentLeft){
			if(id==''){
				QuanLyTinTucAction.addTinTuc({access_token: access_token, title: title, contentLeft: contentLeft, description: description, img: img, dateCreate: dateCreate, slug: slug, hienthi: hienthi });
			}
			else{
				QuanLyTinTucAction.updateTinTuc({access_token: access_token, id: id, title: title, contentLeft: contentLeft, description: description, img: img, dateModify: dateModify, slug: slug, hienthi: hienthi });
			}
		}

	}

	deleteTinTuc(e){
		e.preventDefault();
		var access_token = localStorage.getItem('access_token');
		var id = this.state.state1.idTinTucToDelete;
		if(id){
			QuanLyTinTucAction.deleteTinTuc({access_token: access_token, id: id});
		}
	}


  	render() {




    return (
    	<div className="body-content animated fadeIn no-overflow">
              <div className="row">
                  	<div className="col-md-12">
                    	<ol className="breadcrumb no-overflow">
                      		<li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
                      		<li>Quản lý tin tức</li>
                    	</ol>
											<Tabs defaultActiveKey={1}>
				                <Tab eventKey={1} title="Thêm tin tức">
												<div className="panel rounded shadow no-overflow">
														<div className="panel-heading">
															<div className="pull-left"><h3 className="panel-title">Thêm tin tức</h3></div>
															<div className="pull-right">
																	<button className="btn btn-sm" data-action="collapse" data-container="body" data-toggle="panel-body" data-placement="top"
																			data-title="Collapse" data-original-title="" title=""><i className="fa fa-angle-up"></i></button>
															</div>
															<div className="clearfix"></div>
														</div>
														<div className="panel-body no-padding">
									<form className="form-horizontal" encType="multipart/form-data" onSubmit={this.handleSubmitTinTuc.bind(this)}>
											<div className="form-body">
												<div className="form-group">
													<label className="control-label col-sm-2" htmlFor="name-item">Tiêu đề:</label>
													<div className="col-sm-10">
															<input type="text" className="form-control" id="name-item" placeholder="Nhập tiêu đề"
																ref="TitlePageField" value={this.state.state1.titleTinTuc} onChange={QuanLyTinTucAction.updateTitleTinTuc}/>
															<span className='help-block'>{this.state.state1.helpBlockTitle}</span>
													</div>
												</div>

											<div className='form-group '>
																	<label className='col-sm-2 control-label'>Nội dung:</label>
																		<div  className ='col-sm-10'>
																			<textarea id ='ckedit' value ="" ref ='ContentTinTucField' value={this.state.state1.contentPage} ></textarea>
																			<span className='help-block'>{this.state.state1.helpBlockContent}</span>
																	</div>
																</div>
																<div className='form-group '>
																	<label className='col-sm-2 control-label'>Nội dung rút gọn:</label>
																		<div  className ='col-sm-10'>
																			<textarea className="form-control" rows="5" ref ='Description' value={this.state.state1.description} onChange={QuanLyTinTucAction.updateDescription}></textarea>
																			<span className='help-block'>{this.state.state1.helpBlockDescription}</span>
																	</div>
																</div>

																<div className='form-group'>
																	<label className='col-sm-2 control-label'>Chọn ảnh đại diện</label>
																	<div className ="clear-both"></div>
																	<div  className ='col-sm-10'>
																		<div className="avatar-photo">
																				<ImgUpload actions ={QuanLyTinTucAction} />
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

													<div className="col-sm-10 col-sm-offset-2">
															<label>
															<input type="checkbox" value={this.state.state1.hienthi} checked={this.state.state1.checkHienThi} onChange={QuanLyTinTucAction.updateHienThi}/>
															Hiển thị là thông báo mới?
														</label>
													</div>
												</div>

										</div>
										<div className="form-footer">
												<div className="form-group">
													<div className="col-sm-offset-2">
															<button type="submit" className="btn btn-success">{this.state.state1.textButton}</button><span className='help-block'> {this.state.state1.helpBlockAddTinTuc}</span>
													</div>
												</div>
										</div>
									</form>
								</div>
												</div>
				                </Tab>
				                <Tab eventKey={2} title="Danh sách tin tức">
													<ListQuanLyTinTuc />
				                </Tab>
				              </Tabs>

                </div>
            	{/*display list of tin tuc*/}
    		</div>

				<Modal show={this.state.state1.modalIsOpen} bsSize="large" onHide ={QuanLyTinTucAction.closeModal}>
						<Modal.Header>
							<Modal.Title>
								Sửa
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
						<form className="form-horizontal" encType="multipart/form-data" onSubmit={this.handleSubmitTinTuc.bind(this)}>
								<div className="form-body">
									<div className="form-group">
										<label className="control-label col-sm-2" htmlFor="name-item">Tiêu đề:</label>
										<div className="col-sm-10">
												<input type="text" className="form-control" id="name-item" placeholder="Nhập tiêu đề"
													ref="TitlePageField" value={this.state.state1.titleTinTuc} onChange={QuanLyTinTucAction.updateTitleTinTuc}/>
												<span className='help-block'>{this.state.state1.helpBlockTitle}</span>
										</div>
									</div>

								<div className='form-group '>
														<label className='col-sm-2 control-label'>Nội dung:</label>
															<div  className ='col-sm-10'>
																<textarea ref ='ContentTinTucField' cols="50" rows="10">{this.state.state1.contentLeft}</textarea>
																<span className='help-block'>{this.state.state1.helpBlockContent}</span>
														</div>
													</div>
													<div className='form-group '>
														<label className='col-sm-2 control-label'>Nội dung rút gọn:</label>
															<div  className ='col-sm-10'>
																<textarea className="form-control" rows="5" ref ='Description' value={this.state.state1.description} onChange={QuanLyTinTucAction.updateDescription}></textarea>
																<span className='help-block'>{this.state.state1.helpBlockDescription}</span>
														</div>
													</div>

													<div className='form-group'>
														<label className='col-sm-2 control-label'>Chọn ảnh đại diện</label>
														<div className ="clear-both"></div>
														<div  className ='col-sm-10'>
															<div className="avatar-photo">
																	<ImgUpload actions ={QuanLyTinTucAction} />
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

										<div className="col-sm-10 col-sm-offset-2">
												<label>
												<input type="checkbox" value={this.state.state1.hienthi} checked={this.state.state1.checkHienThi} onChange={QuanLyTinTucAction.updateHienThi}/>
												Hiển thị là thông báo mới?
											</label>
										</div>
									</div>

							</div>
									<div className="form-group">
										<div className="col-sm-offset-2">
												<button type="submit" className="btn btn-success">{this.state.state1.textButton}</button><span className='help-block'> {this.state.state1.helpBlockAddTinTuc}</span>
										</div>
									</div>
						</form>
						</Modal.Body>
						<Modal.Footer>
								<button
										className="btn btn-warning"
									onClick={QuanLyTinTucAction.closeModal}><i className="fa fa-times"> Hủy bỏ</i> </button>
						</Modal.Footer>
				</Modal>
            {/* modal xoa item */}
              <Modal show={this.state.state1.modalIsOpenDeleteTinTuc} onHide ={QuanLyTinTucAction.closeModalDeleteTinTuc}>
                  <Modal.Header>
                    <Modal.Title>
                      Xóa
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Bạn có chắc muốn xóa tin này?</p>
                  </Modal.Body>
                  <Modal.Footer>
                      <button
                          className="btn btn-warning"
                        onClick={QuanLyTinTucAction.closeModalDeleteTinTuc}><i className="fa fa-times"> Hủy bỏ</i> </button>
                      <button
                          className="btn btn-success"
                        onClick={this.deleteTinTuc.bind(this)}><i className="fa fa-check"> Xóa</i> </button>
                  </Modal.Footer>
              </Modal>


        </div>
    );
  }
}

export default QuanLyTinTuc;
