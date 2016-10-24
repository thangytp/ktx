import React from 'react';

class AddItemMenu extends React.Component {

	constructor(props)
	{
		super(props);
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		CKEDITOR.replace( 'ckedit', {
		allowedContent : true,
		pasteFromWordRemoveFontStyles : false,
		pasteFromWordRemoveStyles : false
		});
	}

	componentWillUnmount() {
	
	}

	onChange(state) {
		this.setState(state);  
	}

  	render() {  
    return (
    	<div className="row">
            <div className="col-md-12">
    			<div className="panel panel-default">
				  	<div className="panel-heading">Thêm menu item</div>
				</div>

				<form className="form-horizontal">
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
					    <label className="control-label col-sm-2" for="">Đường dẫn tới trang:</label>
					    <div className="col-sm-10"> 
				      		<div className="radio">
							  <label><input type="radio" name="dang-layout" value="1"/>Giao diện 1 cột</label>
							</div>
							<div className="radio">
							  <label><input type="radio" name="dang-layout" value="2"/>Giao diện 2 cột</label>
							</div>
				    	</div>
					</div>

					<div className='form-group '>
                    	<label className='col-sm-2 control-label'>Nội dung:</label>
                      	<div  className ='col-sm-10'>
                      		<textarea id ='ckedit' value ="" ref ='body' ></textarea>
                      		<span className='help-block'></span>
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