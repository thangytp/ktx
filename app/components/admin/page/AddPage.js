import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';

import AddPageAction from '../../../actions/admin/page/AddPageAction';
import AddPageStore from '../../../stores/admin/page/AddPageStore';
import AddImgItem from '../../../shared/AddImgItem';
import AddVideoItem from '../../../shared/AddVideoItem';

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
		console.log(this.state);
	}

	componentWillUnmount() {
		AddPageStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
		console.log(state);
	}

	

	addImageItem(event){
		var num = $('.image-wrap').children().length;
		console.log(num);
		var htmlItem='<div class="form-group image-item" id="image-item-'+ (num+1) +'"> ' 
					    + '<label class="control-label col-sm-2" for="">Tiêu đề ảnh:</label>'
					    + '<div class="col-sm-10"> '
				      	+ '	<input type="text" class="form-control" id="image-item-text" placeholder="VD: Giới thiệu"/>'
				    	+ '</div>'
					+ '</div>'
					+'<div class="form-group has-success">'
	                   	+'<label class="control-label">Chọn ảnh đại diện</label>'
	                   	+'<div class ="clear-both"></div>'
	                    +'<div class="avatar-photo">'
	                      	+this.renderImgComponent.bind(this)
	                      	+'<div class="avatar-edit">'
	                      		+'<i class="fa fa-camera"></i>'
	                      	+'</div>'
	                      	+'<img src ='+this.state.imagePreviewUrl+' height ="200px" width="200px" alt = "avatar"/>'
	                    +'</div>'
	                    +'<div>'
	                     	+'<button type="button" class = "btn btn-success" onClick = '+upload()+' ><i class="fa fa-check"></i></button>'
	                     	+'<button type="button" class = "btn btn-danger" onClick = {this.detele.bind(this)} ><i class="fa fa-times"></i></button>'
	                    	+'<span class="help-block">'+this.state.helpBlockUpload+'</span>'
	                   	+'</div>'
                  	+'</div>'
                   	+'<div class ="clear-both"></div>';
		console.log(htmlItem);
		$('.image-wrap').append(htmlItem);
	}
	addVideoItem(event){
		var num = $('.video-wrap').children().length;
		var htmlItem='<div class="form-group video-item" id="video-item-'+ (num+1) +'"> ' 
					    + '<label class="control-label col-sm-2" for="">Tiêu đề video:</label>'
					    + '<div class="col-sm-10"> '
				      	+ '	<input type="text" class="form-control" id="video-item-text" placeholder="VD: Giới thiệu"/>'
				    	+ '</div>'
				    	+ '<label class="control-label col-sm-2" for="">Link video:</label>'
				    	 + '<div class="col-sm-10"> '
				      	+ '	<input type="text" class="form-control" id="video-item-link" placeholder="VD: https://youtube.com/watch?v=ktxbachkhoa"/>'
				    	+ '</div>'
					+ '</div>';
		$('.video-wrap').append(htmlItem);
	}	

	// them page
	handleSubmitPage(event){
		event.preventDefault();
		for ( var instance in CKEDITOR.instances )
        	CKEDITOR.instances[instance].updateElement();
		var id = this.state.idPage;
		var title = this.state.titlePage;
		var contentLeft = ReactDom.findDOMNode(this.refs.ContentPageField).value;
		var layoutType = this.state.layoutType;
		if(layoutType==1){
			
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
    	<div className="row">
            <div className="col-md-12">
    			<div className="panel panel-default">
				  	<div className="panel-heading">Thêm trang</div>
				</div>

				<form className="form-horizontal" encType="multipart/form-data" onSubmit={this.handleSubmitPage.bind(this)}>
				  	<div className="form-group">
					    <label className="control-label col-sm-2" htmlFor="name-item">Tên trang:</label>
					    <div className="col-sm-10">
				      		<input type="text" className="form-control" id="name-item" placeholder="Nhập tên trang" 
				      			value={this.state.title} onChange={AddPageAction.updateTitlePage}/>
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
                      		<span className='help-block'></span>
                    	</div>
                  	</div>

                  	<div className="panel panel-default" style={{'display':this.state.styleContentRight}}>
					  	<div className="panel-heading">Nội dung cột bên phải</div>
					  	
					  		
					  	 
					  	<div className="panel-body">
					  		<label>
					  			<input type="checkbox" value={this.state.cotphaiHome} onChange={AddPageAction.cotphaiHome}/>
					  			Dùng nội dung cột bên phải trang Home cho trang này?
					  		</label>
					  		<div style={{'display': this.state.styleCustomContentRight}}>
						  		<div className=" col-sm-10 col-sm-offset-2 form-group">
						  			<button type="button" className="btn btn-default" onClick={AddPageAction.addImg}>Thêm hình ảnh</button>
								  	<button type="button" className="btn btn-primary" onClick={AddPageAction.addVideo}>Thêm video</button>
						  		</div>
						  		<div className="col-sm-12 image-wrap form-horizontal">
						  			<input type="hidden" value="image"/>
						  			{listImageItem}
						  		</div>
						  		<div className="col-sm-12 video-wrap form-horizontal">
						  			<input type="hidden" value="video"/>
						  			{listVideoItem}
						  		</div>
						  	</div>
					  	</div>
					</div>
					
				  	<div className="form-group"> 
				    	<div className="col-sm-offset-2 col-sm-10">
				      		<button type="submit" className="btn btn-default">Thêm</button>
				    	</div>
				  	</div>
				</form>

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

        </div>
    );
  }
}

export default AddPage;