import React from 'react';
import AddItemMenuAction from '../../../actions/admin/menu/AddItemMenuAction';
import AddItemMenuStore from '../../../stores/admin/menu/AddItemMenuStore';

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

	addImageItem(event){
		var num = $('.image-wrap').children().length;
		console.log(num);
		var htmlItem='<div class="form-group image-item" id="image-item-'+ (num+1) +'"> ' 
					    + '<label class="control-label col-sm-2" for="">Tiêu đề ảnh:</label>'
					    + '<div class="col-sm-10"> '
				      	+ '	<input type="text" class="form-control" id="image-item-text" placeholder="VD: Giới thiệu"/>'
				    	+ '</div>'
					+ '</div>';
		console.log(htmlItem);
		$('.image-wrap').append(htmlItem);
	}

  	render() {  
  		let styleContentRight = {'display' : this.state.styleContentRight};
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
				      		<input type="text" className="form-control" id="name-item" placeholder="Nhập tên menu item"/>
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
					  		<div className="form-group col-sm-10 col-sm-offset-2">
					  			<button type="button" className="btn btn-default" onClick={this.addImageItem.bind(this)}>Thêm hình ảnh</button>
							  	<button type="button" className="btn btn-primary">Thêm video</button>
							  	<button type="button" className="btn btn-success">Success</button>
					  		</div>
					  		<div className="col-sm-12 image-wrap form-horizontal">
					  			<input type="hidden" value="image"/>
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