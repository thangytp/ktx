import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal, Tabs, Tab} from 'react-bootstrap';

import AddPageAction from '../../../actions/admin/page/AddPageAction';
import AddPageStore from '../../../stores/admin/page/AddPageStore';
import AddImgItem from '../../../shared/AddImgItem';
import AddVideoItem from '../../../shared/AddVideoItem';

import ListPage from './ListPage';

class AddPage extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = AddPageStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		AddPageStore.listen(this.onChange);
		CKEDITOR.replace( 'ckedit', {
		allowedContent : true,
		pasteFromWordRemoveFontStyles : false,
		pasteFromWordRemoveStyles : false
		});
		// console.log(this.state);
	}

	componentWillUnmount() {
		AddPageStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	// them page
	handleSubmitPage(event){
		event.preventDefault();
		for ( var instance in CKEDITOR.instances )
        	CKEDITOR.instances[instance].updateElement();

        var numberOfImageItem = this.state.numberOfImageItem;
        var numberOfVideoItem = this.state.numberOfVideoItem;

		var id = this.state.idPage;
		var title = this.state.titlePage;
		var contentLeft = ReactDom.findDOMNode(this.refs.ContentPageField).value;

		var layoutType = this.state.layoutType;
		var cotphaiHome = this.state.cotphaiHome;
		console.log(cotphaiHome);
		var imgRight = [];
		var videoRight = [];

		if(layoutType==1){
			imgRight = [];
			videoRight = [];
		}
		else{
			if(cotphaiHome==1){
				imgRight = [];
				videoRight = [];
			}
			else{
				imgRight = this.state.arrImg;
				videoRight = this.state.arrVideo;
			}
		}

		if(!title){
			AddPageAction.invalidTitle();
			this.refs.TitlePageField.focus();
		}
		if(!contentLeft){
			AddPageAction.invalidContent();
			this.refs.ContentPageField.focus();
		}
		if(layoutType==2 && cotphaiHome==0){
			if(imgRight.length == 0 || videoRight.length ==0){
				AddPageAction.invalidContentRight();
			}
			else{
				for(var i=0; i<imgRight.length; i++){
					if(!imgRight[i].link){
						AddPageAction.invalidImgLink();
					}
				}
				for(var i=0; i<videoRight.length; i++){
					if(!videoRight[i].link){
						AddPageAction.invalidVideoLink();
					}
				}
			}
		}

		// goi ham add page
		if(title && contentLeft){
			if(id==''){
				AddPageAction.addPage({title: title, contentLeft: contentLeft, layoutType: layoutType,
					cotphaiHome: cotphaiHome, imgRight: imgRight, videoRight: videoRight,
					numberOfImageItem: numberOfImageItem, numberOfVideoItem: numberOfVideoItem});
			}
			else{
				AddPageAction.updatePage({id: id, title: title, contentLeft: contentLeft, layoutType: layoutType,
					cotphaiHome: cotphaiHome, imgRight: imgRight, videoRight: videoRight,
					numberOfImageItem: numberOfImageItem, numberOfVideoItem: numberOfVideoItem});
			}
		}

	}

	deletePage(e){
		e.preventDefault();
		var id = this.state.idPageToDelete;
		if(id){
			AddPageAction.deletePage(id);
		}
	}


  	render() {
  		let styleContentRight = {'display' : this.state.styleContentRight};
  		let numberOfImageItem = this.state.numberOfImageItem;
  		let numberOfVideoItem = this.state.numberOfVideoItem;

  		let listImageItem = [];
  		for (var i = 0; i < numberOfImageItem; i++) {
		  listImageItem.push(<AddImgItem actions ={AddPageAction} state={this.state.arrImg[i]} number={i} key={i}/>);
		}
		let listVideoItem = [];
  		for (var i = 0; i < numberOfVideoItem; i++) {
		  listVideoItem.push(<AddVideoItem actions ={AddPageAction} state={this.state.arrVideo[i]} number={i} key={i}/>);
		}

    return (
    	<div className="body-content animated fadeIn no-overflow">
              <div className="row">
                  	<div className="col-md-12">
                    	<ol className="breadcrumb no-overflow">
                      		<li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
                      		<li>Quản lý trang</li>
                    	</ol>
											<Tabs defaultActiveKey={1}>
				                <Tab eventKey={1} title="Thêm Trang">
												<div className="panel rounded shadow no-overflow">
														<div className="panel-heading">
															<div className="pull-left"><h3 className="panel-title">Thêm trang</h3></div>
															<div className="pull-right">
																	<button className="btn btn-sm" data-action="collapse" data-container="body" data-toggle="panel-body" data-placement="top"
																			data-title="Collapse" data-original-title="" title=""><i className="fa fa-angle-up"></i></button>
															</div>
															<div className="clearfix"></div>
														</div>
														<div className="panel-body no-padding">
									<form className="form-horizontal" encType="multipart/form-data" onSubmit={this.handleSubmitPage.bind(this)}>
											<div className="form-body">
												<div className="form-group">
													<label className="control-label col-sm-2" htmlFor="name-item">Tên trang:</label>
													<div className="col-sm-10">
															<input type="text" className="form-control" id="name-item" placeholder="Nhập tên trang"
																ref="TitlePageField" value={this.state.titlePage} onChange={AddPageAction.updateTitlePage}/>
															<span className='help-block'>{this.state.helpBlockTitle}</span>
													</div>
												</div>

											<div className="form-group">
													<label className="control-label col-sm-2" htmlFor="">Dạng giao diện:</label>
													<div className="col-sm-10">
														<label className="radio-inline"><input type="radio" name="dang-layout" value="1" onClick={AddPageAction.hideContentRight} checked={this.state.checkedLayoutOne} />Giao diện 1 cột</label>
														<label className="radio-inline"><input type="radio" name="dang-layout" value="2" onClick={AddPageAction.showContentRight} checked={this.state.checkedLayoutTwo} />Giao diện 2 cột</label>
													</div>
											</div>

											<div className='form-group '>
																	<label className='col-sm-2 control-label'>Nội dung:</label>
																		<div  className ='col-sm-10'>
																			<textarea id ='ckedit' value ="" ref ='ContentPageField' value={this.state.contentPage} ></textarea>
																			<span className='help-block'>{this.state.helpBlockContent}</span>
																	</div>
																</div>

																<div className="panel panel-default" style={{'display':this.state.styleContentRight}}>
													<div className="panel-heading">Nội dung cột bên phải</div>



													<div className="panel-body">
														<label>
															<input type="checkbox" value={this.state.cotphaiHome} checked={this.state.checkCotPhaiHome} onChange={AddPageAction.cotphaiHome}/>
															Dùng nội dung cột bên phải trang Home cho trang này?
														</label>
														<div style={{'display': this.state.styleCustomContentRight}}>
															<div className=" col-sm-10 col-sm-offset-2 form-group">
																<button type="button" className="btn btn-default" onClick={AddPageAction.addImg}>Thêm hình ảnh</button>
																<button type="button" className="btn btn-primary" onClick={AddPageAction.addVideo}>Thêm video</button>
															</div>
															<div><span className='help-block'>{this.state.helpBlockContentRight}</span></div>
															<div><span className='help-block'>{this.state.helpBlockImage}</span></div>
															<div className="col-sm-12 image-wrap form-horizontal">
																<input type="hidden" value="image"/>
																{listImageItem}
															</div>
															<div><span className='help-block'>{this.state.helpBlockVideo}</span></div>
															<div className="col-sm-12 video-wrap form-horizontal">
																<input type="hidden" value="video"/>
																{listVideoItem}
															</div>
														</div>
													</div>
											</div>
										</div>
										<div className="form-footer">
												<div className="form-group">
													<div className="col-sm-offset-2">
															<button type="submit" className="btn btn-success">{this.state.textButton}</button><span className='help-block'> {this.state.helpBlockAddPage}</span>
													</div>
												</div>
										</div>
									</form>
								</div>
												</div>
				                </Tab>
				                <Tab eventKey={2}  title="Danh sách trang">
												<ListPage/>
				                </Tab>
				              </Tabs>


                </div>
    		</div>

    		{/* modal xoa item*/}
        	<Modal show={this.state.modalIsOpenDelete} onHide ={AddPageAction.closeModalDelete}>
              	<Modal.Header>
	                <Modal.Title>
	                	Xóa
	                </Modal.Title>
              	</Modal.Header>
              	<Modal.Body>
              		<p>Đồng ý xóa?</p>
              	</Modal.Body>
              	<Modal.Footer>
                  	<button
                      	className="btn btn-warning"
                    	onClick={AddPageAction.closeModalDelete}><i className="fa fa-times"> Hủy bỏ</i> </button>
                  	<button
                      	className="btn btn-success"
                    	onClick={AddPageAction.deleteItemOfRight}><i className="fa fa-check"> Xóa</i> </button>
              	</Modal.Footer>
            </Modal>

            {/* modal xoa item */}
              <Modal show={this.state.modalIsOpenDeletePage} onHide ={AddPageAction.closeModalDeletePage}>
                  <Modal.Header>
                    <Modal.Title>
                      Xóa
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Bạn có chắc muốn xóa trang này?</p>
                  </Modal.Body>
                  <Modal.Footer>
                      <button
                          className="btn btn-warning"
                        onClick={AddPageAction.closeModalDeletePage}><i className="fa fa-times"> Hủy bỏ</i> </button>
                      <button
                          className="btn btn-success"
                        onClick={this.deletePage.bind(this)}><i className="fa fa-check"> Xóa</i> </button>
                  </Modal.Footer>
              </Modal>


        </div>
    );
  }
}

export default AddPage;
