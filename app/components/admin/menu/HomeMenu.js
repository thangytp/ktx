import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';

import HomeMenuAction from '../../../actions/admin/menu/HomeMenuAction';
import HomeMenuStore from '../../../stores/admin/menu/HomeMenuStore';

import ListItemMenu from './ListItemMenu';
import GetChild from '../../../shared/GetChild';

class HomeMenu extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = HomeMenuStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		HomeMenuStore.listen(this.onChange);
		HomeMenuAction.getListCha();
	}

	componentWillUnmount() {
		HomeMenuStore.unlisten(this.onChange);
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

	themMenuItem(event){
		event.preventDefault();
		var title = this.state.itemMenuName.trim();
		
		var slug = this.ChangeToSlug(title);
		console.log(slug);
		var parent = this.state.parent;
		
		if(!title){
			HomeMenuAction.invalidName();
			this.refs.NameItemMenu.focus();
		}

		if(title){
			HomeMenuAction.addItemMenu({title: title, slug: slug, _parentId: parent});
		}
	}
	test(event){
		if (event.key === 'Enter') {
	      console.log('do validate');
	    }
	}

	openMoD(idParent){
		HomeMenuAction.openMD(idParent);
	}

  render() {  
  	// let listCha = this.state.listCha.map((cha, index) => {
  	// 	return(
  	// 			<li key={index+1}>
  	// 				{cha.title} <button onClick ={this.openMoD.bind(this, cha._id)}>Add</button>
  	// 				<GetChild action={HomeMenuAction} item={cha} list={this.state.listCon}/>
  	// 			</li>
  				
  	// 		);
  	// });

    return (
    	<div className="row">
    {/*//         <div className="col-md-12">
    // 			<h2>Quản lý menu</h2>
    // 			<form className="form-inline" onSubmit={this.themMenuItem.bind(this)}>
				//   	<div className="form-group">
				// 	    <label for="item-menu-name">Tên item menu:</label>
				// 	    <input type="text" className="form-control" id="item-menu-name" ref='NameItemMenu' value={this.state.itemMenuName} 
				// 	    	onChange={HomeMenuAction.updateItemMenuName} autoFocus onKeyPress={this.test.bind(this)}/>
					    
				//   	</div>
				//   	<div className="form-group">
				// 	    <select className="form-control" id="sel-parent" value={this.state.parent} 
				// 	    	onChange={HomeMenuAction.updateParent}>
				// 			    <option value='5126bbf64aed4daf9e2ab771'>--Chọn--</option>
				// 			    {listCha}
				// 	  	</select>
				//   	</div>
				  	
				//   	<button type="submit" className="btn btn-default">Thêm</button>
				//   	<span className='help-block has-error'>{this.state.helpBlock}</span>
				// </form>
    // 		</div>*/}

    		<div className="col-md-12">
    			<button type="submit" className="btn btn-default" onClick ={this.openMoD.bind(this, this.state.parent)}>Thêm danh mục cấp 1</button>
    		</div>

    		{/*hien thi danh sach menu item*/}
    		<ListItemMenu/>

    		<Modal show={this.state.modalIsOpen} onHide ={HomeMenuAction.closeModal}>
              	<Modal.Header>
	                <Modal.Title>
	                	Thêm danh mục
	                </Modal.Title>
              	</Modal.Header>
              	<Modal.Body>
              	<div>
              		<label>Tên danh mục</label>
              		<input type="text" className="form-control" id="item-menu-name" ref='NameItemMenu' value={this.state.itemMenuName} 
					    	onChange={HomeMenuAction.updateItemMenuName} autoFocus onKeyPress={this.test.bind(this)}/>
              	</div>
              	</Modal.Body>      
              	<Modal.Footer>
                  	<button
                      	className="btn btn-warning"
                    	onClick={HomeMenuAction.closeModal}><i className="fa fa-times"> Hủy bỏ</i> </button>          
                  	<button
                      	className="btn btn-success"
                    	onClick={this.themMenuItem.bind(this)}><i className="fa fa-check"> Thêm</i> </button>          
              	</Modal.Footer>
            </Modal>

        </div>
    );
  }
}

export default HomeMenu;