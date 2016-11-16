import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';

import HomeMenuAction from '../../../actions/admin/menu/HomeMenuAction';
import HomeMenuStore from '../../../stores/admin/menu/HomeMenuStore';

import AddPageAction from '../../../actions/admin/page/AddPageAction';
import AddPageStore from '../../../stores/admin/page/AddPageStore';

import ListItemMenu from './ListItemMenu';
import GetChild from '../../../shared/GetChild';

import SubItem from './SubItem';
import SubItemAdmin from './SubItemAdmin';

class HomeMenu extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {state1: HomeMenuStore.getState(), state2: AddPageStore.getState()};
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		HomeMenuStore.listen(this.onChange);
		AddPageStore.listen(this.onChange);
		HomeMenuAction.testGetListCha();
		AddPageAction.getListPage();
		// HomeMenuAction.getAllMenu();
	}

	componentWillUnmount() {
		HomeMenuStore.unlisten(this.onChange);
		AddPageStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState({state1: HomeMenuStore.getState(), state2: AddPageStore.getState()});  
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
		var title = this.state.state1.itemMenuName.trim();
		
		var slug = this.ChangeToSlug(title);
		console.log(slug);
		var parent = this.state.state1.parent;
		
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

	// xoa danh muc va tat ca con cua no
	deleteMenuItem(event){
		event.preventDefault();
		var idDeleteCha = this.state.state1.idDeleteCha;
		if(idDeleteCha){
			HomeMenuAction.deleteCha(idDeleteCha);
		}
	}
	editLinkToPage(event){
		event.preventDefault();
		var idItemEditLinkToPage = this.state.state1.idEditLinkToPage;
		var idPage = this.state.state1.pagelink;
		var typeEditPageLink = this.state.state1.typeEditPageLink;
		if(idPage==0){
			HomeMenuAction.invalidPageLink();
			this.refs.PageLinkField.focus();
		}
		if(idPage != 0){
			HomeMenuAction.editLinkToPage({idItemEditLinkToPage: idItemEditLinkToPage, idPage: idPage, typeEditPageLink: typeEditPageLink});
		}
	}

	// =================== new add here ================= //
	openMoD(idParent){
		HomeMenuAction.openMD(idParent);
	}

	openMoDDeleteCha(id){
		HomeMenuAction.openMoDDeleteCha(id);
	}

	moveUpOrder(id, type){
		if(id){
			HomeMenuAction.moveUpOrder(id, type);
		}
	}
	moveDownOrder(id, type){

		if(id){
			HomeMenuAction.moveDownOrder(id, type);
		}
	}

	openMoDEditLinkToPage(id, type, pageId){
		if(id){
			HomeMenuAction.openMoDEditLinkToPage({id: id, type: type, pageId: pageId});
		}
	}
	// =================== end new add ===================//

  render() {  
  	// let listCha = this.state.listCha.map((cha, index) => {
  	// 	return(
  	// 			<li key={index+1}>
  	// 				{cha.title} <button onClick ={this.openMoD.bind(this, cha._id)}>Add</button>
  	// 				<GetChild action={HomeMenuAction} item={cha} list={this.state.listCon}/>
  	// 			</li>
  				
  	// 		);
  	// });
	let listPageSearch = this.state.state1.listPageSearch.map((page, index) =>{
		return (
				<div key={index}>{page.title}</div>
			);
	});

	let listPage = this.state.state2.listPage.map((page, index) =>{
		if(this.state.state1.pagelink == page._id){	
			return(
					<option value={page._id} key={index} defaultValue>
						{page.title}
					</option>
				);
		}
		else{
			return(
					<option value={page._id} key={index}>
						{page.title}
					</option>
				);
		}
	});

	let menu = this.state.state1.testListCha.map((cha, index)=> {
		if(cha.order < 1){
			return(
					<li key={index} >
						<span className='cha-item'>{cha.title}{' '}
							<span className='list-button'>
								{/*<button className="btn btn-success" onClick ={this.openMoD.bind(this, cha._id)}><i className="fa fa-plus" aria-hidden="true"></i></button>*/}
								<i className="fa fa-plus-square font20" aria-hidden="true" onClick ={this.openMoD.bind(this, cha._id)} style={{'color':'#449D44'}}></i>
							    {' '}      	
							    <i className="fa fa-arrow-circle-o-down font20" aria-hidden="true" onClick={this.moveDownOrder.bind(this, cha._id, this.state.state1.cha)} style={{'color':'#ff9933'}}></i>
							    {' '}
							    <i className="fa fa-trash font20" aria-hidden="true" onClick ={this.openMoDDeleteCha.bind(this, cha._id)} style={{'color':'#D9534F'}}></i>
							</span>
						</span>
						<div className='expander'></div>
						<SubItemAdmin listCon = {cha.child} num={index}/>
					</li>
				);
		}
		else{
			return(
					<li key={index} >
						<span className='cha-item'>{cha.title} {' '}
							<span className='list-button'>
								<i className="fa fa-plus-square font20" aria-hidden="true" onClick ={this.openMoD.bind(this, cha._id)} style={{'color':'#449D44'}}></i>
								{' '}
							    <i className="fa fa-arrow-circle-o-up font20" aria-hidden="true" onClick={this.moveUpOrder.bind(this, cha._id, this.state.state1.cha)} style={{'color':'#ffcc00'}}></i>      	
							    {' '}
							    <i className="fa fa-arrow-circle-o-down font20" aria-hidden="true" onClick={this.moveDownOrder.bind(this, cha._id, this.state.state1.cha)} style={{'color':'#ff9933'}}></i>
							    {' '}
							    <i className="fa fa-trash font20" aria-hidden="true" onClick ={this.openMoDDeleteCha.bind(this, cha._id)} style={{'color':'#D9534F'}}></i>
							</span>
						</span>
						<div className='expander'></div>
						<SubItemAdmin listCon = {cha.child} num={index}/>
					</li>
				);
		}
	});

    return (
    	<div className="row">
    		<div className="col-md-12">
    			{/*<button type="submit" style={{'marginBottom':'0px', 'marginLeft':'20px'}} className="btn btn-success" onClick ={this.openMoD.bind(this, this.state.state1.parent)}><i className="fa fa-plus-square" aria-hidden="true"></i></button>*/}
    			<i className="fa fa-plus-square font20" aria-hidden="true" onClick ={this.openMoD.bind(this, this.state.state1.parent)} style={{'marginBottom':'0px', 'marginLeft':'31px', 'color':'#449D44', 'cursor': 'pointer'}}></i>
    			
    			<ul className='admin-list-menu tree'>
    				{menu}
    			</ul>
    		</div>
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

    		

    		{/*hien thi danh sach menu item*/}
    		{/*<ListItemMenu/>*/}

    		<Modal show={this.state.state1.modalIsOpen} onHide ={HomeMenuAction.closeModal}>
              	<Modal.Header>
	                <Modal.Title>
	                	Thêm danh mục
	                </Modal.Title>
              	</Modal.Header>
              	<Modal.Body>
	              	<div>
	              		<label>Tên danh mục</label>
	              		<input type="text" className="form-control" id="item-menu-name" ref='NameItemMenu' value={this.state.state1.itemMenuName} 
						    	onChange={HomeMenuAction.updateItemMenuName} autoFocus onKeyPress={this.test.bind(this)}/>
	              	</div>
	              	<div className={this.state.state1.classValidate}><span className="control-label">{this.state.state1.validateTitle}</span></div>
              	</Modal.Body>      
              	<Modal.Footer>
                  	<button
                      	className="btn btn-warning"
                    	onClick={HomeMenuAction.closeModal}><i className="fa fa-times"> Hủy bỏ</i> </button>          
                  	<button
                      	className="btn btn-success"
                    	onClick={this.themMenuItem.bind(this)} disabled={this.state.state1.disabledButton}><i className="fa fa-check"> Thêm</i> </button>          
              	</Modal.Footer>
            </Modal>

        	{/* modal xoa item va con cua no */}
        	<Modal show={this.state.state1.modalIsOpenDelete} onHide ={HomeMenuAction.closeModalDelete}>
              	<Modal.Header>
	                <Modal.Title>
	                	Xóa
	                </Modal.Title>
              	</Modal.Header>
              	<Modal.Body>
              		<p>Bạn có chắc muốn xóa danh mục này? Nếu đồng ý thì tất cả danh mục con của nó(nếu có) cũng sẽ bị xóa.</p>
              	</Modal.Body>      
              	<Modal.Footer>
                  	<button
                      	className="btn btn-warning"
                    	onClick={HomeMenuAction.closeModalDelete}><i className="fa fa-times"> Hủy bỏ</i> </button>          
                  	<button
                      	className="btn btn-success"
                    	onClick={this.deleteMenuItem.bind(this)}><i className="fa fa-check"> Xóa</i> </button>          
              	</Modal.Footer>
            </Modal>

            <Modal show={this.state.state1.modalIsOpenEditLinkPage} onHide ={HomeMenuAction.closeModalEditLinkPage}>
              	<Modal.Header>
	                <Modal.Title>
	                	Chọn trang
	                </Modal.Title>
              	</Modal.Header>
              	<Modal.Body>
	              	<div>
	              		{/*<select className="form-control" id="sel-parent" value={this.state.state1.pagelink} 
					    	onChange={HomeMenuAction.updateLinkToPage} ref='PageLinkField'>
							    <option value='0'>--Chọn--</option>
							    {listPage}
					  	</select>*/}
					  	<input type="text" className="form-control" ref='NamePage' value={this.state.state1.pagelink} 
						    	onChange={HomeMenuAction.updateLinkToPage} autoFocus onKeyPress={this.test.bind(this)}/>
	              		<div className="live-search" style={{'display':this.state.state1.displayListPage}}>

	              			{listPageSearch}

	              		</div>
	              	</div>
	              	<div className={this.state.state1.classValidatePageLink}><span className="control-label">{this.state.state1.validatePageLink}</span></div>
              	</Modal.Body>      
              	<Modal.Footer>
                  	<button
                      	className="btn btn-warning"
                    	onClick={HomeMenuAction.closeModalEditLinkPage}><i className="fa fa-times"> Hủy bỏ</i> </button>          
                  	<button
                      	className="btn btn-success"
                    	onClick={this.editLinkToPage.bind(this)} disabled={this.state.state1.disableButtonAddPage}><i className="fa fa-check"> Thêm</i> </button>          
              	</Modal.Footer>
            </Modal>

        </div>
    );
  }
}

export default HomeMenu;