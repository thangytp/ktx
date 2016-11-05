import React from 'react';
import ReactDom from 'react-dom';
import AddItemMenuAction from '../../../actions/admin/menu/AddItemMenuAction';
import AddItemMenuStore from '../../../stores/admin/menu/AddItemMenuStore';
import AddImgItem from '../../../shared/AddImgItem';
import AddVideoItem from '../../../shared/AddVideoItem';

class AddItemMenu extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = AddItemMenuStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		AddItemMenuStore.listen(this.onChange);
		CKEDITOR.replace( 'ckedit', {
		allowedContent : true,
		pasteFromWordRemoveFontStyles : false,
		pasteFromWordRemoveStyles : false
		});
	}

	componentWillUnmount() {
		AddItemMenuStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}

	renderImgComponent(){
		return <ImgUpload actions ={AddItemMenuAction} />;
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

	upload(event)
  	{
      	var imgfile = this.state.fileAvatar;
      	var imgURL = this.state.imagePreviewUrl;
        AddItemMenuAction.handleUpload();
        AddItemMenuAction.uploadImage(imgfile);
        console.log(this.state.imageUrl);
  	}
   	detele(event)
  	{
        console.log(this.state.imageUrl);
  	}

  	handleFile(e){
	    var reader = new FileReader();
	    var file = e.target.files[0];   
	    if (!file) return;
	    reader.onload = function(img) {
	      ReactDom.findDOMNode(this.refs.in).value = '';
	      AddItemMenuAction.updateImagepreview(img.target.result);   
	      AddItemMenuAction.updateImagefile(file);      
	    }.bind(this);
	    reader.readAsDataURL(file);
	}

  	render() {  
  		let styleContentRight = {'display' : this.state.styleContentRight};
  		let numberOfImageItem = this.state.numberOfImageItem;
  		let numberOfVideoItem = this.state.numberOfVideoItem;

  		let listImageItem = [];
  		for (var i = 0; i < numberOfImageItem; i++) {
		  listImageItem.push(<AddImgItem actions ={AddItemMenuAction} state={this.state} key={i}/>);
		}
		let listVideoItem = [];
  		for (var i = 0; i < numberOfVideoItem; i++) {
		  listVideoItem.push(<AddVideoItem actions ={AddItemMenuAction} state={this.state} key={i}/>);
		}

    return (
    	<div className="row">
            <div className="col-md-12">
    			<div className="panel panel-default">
				  	<div className="panel-heading">Thêm menu item</div>
				</div>

				<form className="form-horizontal" enctype="multipart/form-data">
				  	<div className="form-group">
					    <label className="control-label col-sm-2" for="name-item">Tên menu item:</label>
					    <div className="col-sm-10">
				      		<input type="text" className="form-control" id="name-item" placeholder="Nhập tên menu item" onChange={AddItemMenuAction.addImg}/>
				    	</div>
				  	</div>
				  	<div className="form-group">
					    <label className="control-label col-sm-2" for="link-item">Đường dẫn tới trang:</label>
					    <div className="col-sm-10"> 
				      		<input type="text" className="form-control" id="link-item" placeholder="VD: /gioi-thieu-chung"/>
				    	</div>
					</div>
					<div className="form-group">
					    <label className="control-label col-sm-2" for="">Danh mục menu:</label>
					    <div className="col-sm-10"> 
						  	<select className="form-control" id="sel1">
						    	<option value="0">---</option>
						    	<option value="1">2</option>
						    	<option value="2">3</option>
						    	<option value="3">4</option>
						  	</select>
				    	</div>
					</div>
					<div className="form-group">
					    <label className="control-label col-sm-2" for="">Dạng giao diện:</label>
					    <div className="col-sm-10"> 
							  <label className="radio-inline"><input type="radio" name="dang-layout" value="1" onClick={AddItemMenuAction.hideContentRight}/>Giao diện 1 cột</label>
							  <label className="radio-inline"><input type="radio" name="dang-layout" value="2" onClick={AddItemMenuAction.showContentRight}/>Giao diện 2 cột</label>
				    	</div>
					</div>

					<div className='form-group '>
                    	<label className='col-sm-2 control-label'>Nội dung:</label>
                      	<div  className ='col-sm-10'>
                      		<textarea id ='ckedit' value ="" ref ='body' ></textarea>
                      		<span className='help-block'></span>
                    	</div>
                  	</div>

                  	<div className="panel panel-default" style={{'display':this.state.styleContentRight}}>
					  	<div className="panel-heading">Nội dung cột bên phải</div>
					  	<div className="panel-body">
					  		<div className=" col-sm-10 col-sm-offset-2 form-group">
					  			<button type="button" className="btn btn-default" onClick={AddItemMenuAction.addImg}>Thêm hình ảnh</button>
							  	<button type="button" className="btn btn-primary" onClick={AddItemMenuAction.addVideo}>Thêm video</button>
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
					
				  	<div className="form-group"> 
				    	<div className="col-sm-offset-2 col-sm-10">
				      		<button type="submit" className="btn btn-default">Thêm</button>
				    	</div>
				  	</div>
				</form>

    		</div>
        </div>
    );
  }
}

export default AddItemMenu;