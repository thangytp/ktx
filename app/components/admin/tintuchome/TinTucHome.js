import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal, Tabs, Tab} from 'react-bootstrap';

import TinTucHomeAction from '../../../actions/admin/tintuchome/TinTucHomeAction';
import TinTucHomeStore from '../../../stores/admin/tintuchome/TinTucHomeStore';

import ListTinTucHome from './ListTinTucHome';

class TinTucHome extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = TinTucHomeStore.getState();
		this.onChange = this.onChange.bind(this);

	}
	componentDidMount() {
		TinTucHomeStore.listen(this.onChange);
		CKEDITOR.replace( 'ckedit', {
		allowedContent : true,
		pasteFromWordRemoveFontStyles : false,
		pasteFromWordRemoveStyles : false
		});
		// console.log(this.state);
	}

	componentWillUnmount() {
		TinTucHomeStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	// them tin tuc
	handleSubmitTinTucHome(event){
		event.preventDefault();
		for ( var instance in CKEDITOR.instances )
        	CKEDITOR.instances[instance].updateElement();

		var id = this.state.idTinTucHome;
		var title = this.state.titleTinTucHome;
		var contentLeft = ReactDom.findDOMNode(this.refs.ContentTinTucField).value;
		var linkChitiet = this.state.linkChitiet;
		var hienthi = this.state.hienthi;

		if(!title){
			TinTucHomeAction.invalidTitle();
			this.refs.TitlePageField.focus();
		}
		else if(!contentLeft){
			TinTucHomeAction.invalidContent();
			this.refs.ContentTinTucField.focus();
		}
		else if(!linkChitiet){
			TinTucHomeAction.invalidLinkChitiet();
			this.refs.LinkTinTucField.focus();
		}


		// goi ham add page
		if(title && contentLeft && linkChitiet){
			if(id==''){
				TinTucHomeAction.addTinTucHome({ title: title, contentLeft: contentLeft, linkChitiet: linkChitiet, hienthi: hienthi });
			}
			else{
				TinTucHomeAction.updateTinTucHome({ id: id, title: title, contentLeft: contentLeft, linkChitiet: linkChitiet, hienthi: hienthi });
			}
		}

	}

	deleteTinTuc(e){
		e.preventDefault();
		var id = this.state.idTinTucToDelete;
		if(id){
			TinTucHomeAction.deleteTinTuc(id);
		}
	}

	itemTinTucClick(slug){
	    TinTucHomeAction.updateTinTucSelect({slug: slug});
	}


  	render() {

  		let listTinTucSearch;
      	if(this.state.listTinTucSearch.length>0){
	        listTinTucSearch = this.state.listTinTucSearch.map((item, index) =>{
	          return (
	              <div className="item-page" key={index} onClick={this.itemTinTucClick.bind(this, item.slug)}>{item.title}</div>
	            );
	        });
	    }
	    else{
	        listTinTucSearch = (
	            <span className='err-findpage'>Không tìm thấy trang, vui lòng thử với từ khóa khác</span>
	        );
	    }

    return (
    	<div className="body-content animated fadeIn no-overflow">
              <div className="row">
                  	<div className="col-md-12">
                    	<ol className="breadcrumb no-overflow">
                      		<li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
                      		<li>Quản lý tin tức trang chủ</li>
                    	</ol>

							<Tabs defaultActiveKey={1} >
                <Tab eventKey={1} title="Thêm tin tức">
								<div className="panel rounded shadow no-overflow">
									<div className="panel-heading">
										<div className="pull-left"><h3 className="panel-title">Thêm tin tức hiển thị</h3></div>
										<div className="pull-right">
												<button className="btn btn-sm" data-action="collapse" data-container="body" data-toggle="panel-body" data-placement="top"
														data-title="Collapse" data-original-title="" title=""><i className="fa fa-angle-up"></i></button>
										</div>
										<div className="clearfix"></div>
									</div>
								<div className="panel-body no-padding">
			<form className="form-horizontal" encType="multipart/form-data" onSubmit={this.handleSubmitTinTucHome.bind(this)}>
					<div className="form-body">
						<div className="form-group">
							<label className="control-label col-sm-2" htmlFor="name-item">Tiêu đề:</label>
							<div className="col-sm-10">
									<input type="text" className="form-control" id="name-item" placeholder="Nhập tên trang"
										ref="TitlePageField" onChange={TinTucHomeAction.updateTitleTinTucHome}/>
									<span className='help-block'>{this.state.helpBlockTitle}</span>
							</div>
						</div>

					<div className='form-group '>
											<label className='col-sm-2 control-label'>Nội dung:</label>
												<div  className ='col-sm-10'>
													<textarea id ='ckedit'  ref ='ContentTinTucField'></textarea>
													<span className='help-block'>{this.state.helpBlockContent}</span>
											</div>
										</div>

										<div className="form-group">
														<label className="control-label col-sm-2" htmlFor="link-to-page">Link tin tức:</label>
														<div className="col-sm-10">
																<input type="text" className="form-control" id="link-to-page" placeholder="VD: /gioi-thieu"
																	ref="LinkTinTucField" onChange={TinTucHomeAction.updateLinkChitiet}/>

																<div className="live-search" style={{'display':this.state.displayListTinTuc}}>
																		{listTinTucSearch}
																</div>

																<span className='help-block text-danger'>{this.state.helpBlockLinkTinTuc}</span>
														</div>
												</div>

												<div className="form-group">

							<div className="col-sm-10 col-sm-offset-2">
									<label>
									<input type="checkbox" onChange={TinTucHomeAction.updateHienThi}/>
									Hiển thị ở trang chủ?
								</label>
							</div>
						</div>


				</div>
				<div className="form-footer">
						<div className="form-group">
							<div className="col-sm-offset-2">
									<button type="submit" className="btn btn-success" disabled={this.state.disableButtonAddPage}>{this.state.textButton}</button><span className='help-block'> {this.state.helpBlockAddTinTuc}</span>
							</div>
						</div>
				</div>
			</form>
		</div>
		</div>
                </Tab>
                <Tab eventKey={2} title="Danh sách tin tức">
                  <ListTinTucHome />
                </Tab>
              </Tabs>

                </div>
            	{/*display list of tin tuc*/}

    		</div>

				<Modal show={this.state.modalIsOpen} bsSize="large" onHide ={TinTucHomeAction.closeModal}>
						<Modal.Header>
							<Modal.Title>
								Sửa
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
						<form className="form-horizontal" encType="multipart/form-data" onSubmit={this.handleSubmitTinTucHome.bind(this)}>
								<div className="form-body">
									<div className="form-group">
										<label className="control-label col-sm-2" htmlFor="name-item">Tiêu đề:</label>
										<div className="col-sm-10">
												<input type="text" className="form-control" id="name-item" placeholder="Nhập tên trang"
													ref="TitlePageField" value={this.state.titleTinTucHome} onChange={TinTucHomeAction.updateTitleTinTucHome}/>
												<span className='help-block'>{this.state.helpBlockTitle}</span>
										</div>
									</div>

								<div className='form-group '>
														<label className='col-sm-2 control-label'>Nội dung:</label>
															<div  className ='col-sm-10'>
																<textarea ref='ContentTinTucField' cols="50" rows="10">{this.state.contentLeft}</textarea>
																<span className='help-block'>{this.state.helpBlockContent}</span>
														</div>
													</div>

													<div className="form-group">
																	<label className="control-label col-sm-2" htmlFor="link-to-page">Link tin tức:</label>
																	<div className="col-sm-10">
																			<input type="text" className="form-control" id="link-to-page" placeholder="VD: /gioi-thieu"
																				ref="LinkTinTucField" value={this.state.linkChitiet} onChange={TinTucHomeAction.updateLinkChitiet}/>

																			<div className="live-search" style={{'display':this.state.displayListTinTuc}}>
																					{listTinTucSearch}
																			</div>

																			<span className='help-block text-danger'>{this.state.helpBlockLinkTinTuc}</span>
																	</div>
															</div>

															<div className="form-group">

										<div className="col-sm-10 col-sm-offset-2">
												<label>
												<input type="checkbox" value={this.state.hienthi} checked={this.state.checkHienThi} onChange={TinTucHomeAction.updateHienThi}/>
												Hiển thị ở trang chủ?
											</label>
										</div>
									</div>


							</div>
									<div className="form-group">
										<div className="col-sm-offset-2">
												<button type="submit" className="btn btn-success" disabled={this.state.disableButtonAddPage}>{this.state.textButton}</button><span className='help-block'> {this.state.helpBlockAddTinTuc}</span>
										</div>
									</div>
						</form>
						</Modal.Body>
						<Modal.Footer>
								<button
										className="btn btn-warning"
									onClick={TinTucHomeAction.closeModal}><i className="fa fa-times"> Hủy bỏ</i> </button>
						</Modal.Footer>
				</Modal>
            {/* modal xoa item */}
              <Modal show={this.state.modalIsOpenDeleteTinTuc} onHide ={TinTucHomeAction.closeModalDeleteTinTuc}>
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
                        onClick={TinTucHomeAction.closeModalDeleteTinTuc}><i className="fa fa-times"> Hủy bỏ</i> </button>
                      <button
                          className="btn btn-success"
                        onClick={this.deleteTinTuc.bind(this)}><i className="fa fa-check"> Xóa</i> </button>
                  </Modal.Footer>
              </Modal>


        </div>
    );
  }
}

export default TinTucHome;
