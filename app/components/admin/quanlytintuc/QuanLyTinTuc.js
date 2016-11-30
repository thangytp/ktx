import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';

import QuanLyTinTucAction from '../../../actions/admin/quanlytintuc/QuanLyTinTucAction';
import QuanLyTinTucStore from '../../../stores/admin/quanlytintuc/QuanLyTinTucStore';

import ListQuanLyTinTuc from './ListQuanLyTinTuc';

class QuanLyTinTuc extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = QuanLyTinTucStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		QuanLyTinTucStore.listen(this.onChange);
		CKEDITOR.replace( 'ckedit', {
		allowedContent : true,
		pasteFromWordRemoveFontStyles : false,
		pasteFromWordRemoveStyles : false
		});
		// console.log(this.state);
	}

	componentWillUnmount() {
		QuanLyTinTucStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
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

	// them tin tuc
	handleSubmitTinTuc(event){
		event.preventDefault();
		for ( var instance in CKEDITOR.instances )
        	CKEDITOR.instances[instance].updateElement();

		var id = this.state.idTinTuc;
		var title = this.state.titleTinTuc;
		var contentLeft = ReactDom.findDOMNode(this.refs.ContentTinTucField).value;
		var slug = this.ChangeToSlug(title);
		var dateCreate = new Date();
		var dateModify = new Date();
		console.log(dateCreate);


		if(!title){
			QuanLyTinTucAction.invalidTitle();
			this.refs.TitlePageField.focus();
		}
		if(!contentLeft){
			QuanLyTinTucAction.invalidContent();
			this.refs.ContentTinTucField.focus();
		}
		

		// goi ham add page
		if(title && contentLeft){
			if(id==''){
				QuanLyTinTucAction.addTinTuc({ title: title, contentLeft: contentLeft, dateCreate: dateCreate, slug: slug });
			}
			else{
				QuanLyTinTucAction.updateTinTuc({ id: id, title: title, contentLeft: contentLeft, dateModify: dateModify, slug: slug });
			}
		}

	}

	deleteTinTuc(e){
		e.preventDefault();
		var id = this.state.idTinTucToDelete;
		if(id){
			QuanLyTinTucAction.deleteTinTuc(id);
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
									      		<input type="text" className="form-control" id="name-item" placeholder="Nhập tên trang" 
									      			ref="TitlePageField" value={this.state.titleTinTuc} onChange={QuanLyTinTucAction.updateTitleTinTuc}/>
									      		<span className='help-block'>{this.state.helpBlockTitle}</span>
									    	</div>
									  	</div>
									  	
										<div className='form-group '>
					                    	<label className='col-sm-2 control-label'>Nội dung:</label>
					                      	<div  className ='col-sm-10'>
					                      		<textarea id ='ckedit' value ="" ref ='ContentTinTucField' value={this.state.contentPage} ></textarea>
					                      		<span className='help-block'>{this.state.helpBlockContent}</span>
					                    	</div>
					                  	</div>

					                  	
									</div>
									<div className="form-footer">
									  	<div className="form-group"> 
									    	<div className="col-sm-offset-2">
									      		<button type="submit" className="btn btn-success">{this.state.textButton}</button><span className='help-block'> {this.state.helpBlockAddTinTuc}</span>
									    	</div>
									  	</div>
									</div>
								</form>
							</div>
	                    </div>

                </div>
            	{/*display list of tin tuc*/}
            	<ListQuanLyTinTuc />
    		</div>


            {/* modal xoa item */}
              <Modal show={this.state.modalIsOpenDeleteTinTuc} onHide ={QuanLyTinTucAction.closeModalDeleteTinTuc}>
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