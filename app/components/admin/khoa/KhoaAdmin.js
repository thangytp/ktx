import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';

import KhoaAdminAction from '../../../actions/admin/khoa/KhoaAdminAction';
import KhoaAdminStore from '../../../stores/admin/khoa/KhoaAdminStore';

class KhoaAdmin extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = KhoaAdminStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		KhoaAdminStore.listen(this.onChange);

	}

	componentWillUnmount() {
		KhoaAdminStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}

	themMenuItem(){

	}
	deleteMenuItem(){
		
	}

	render() { 

		return (
	    	<div className="body-content animated fadeIn">
		    	<div className="row">
		    		<div className="col-md-12">
		    			<ol className="breadcrumb">
	                      <li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
	                      <li>Quản lý khoa</li>
	                    </ol>
	                    <div className="panel rounded shadow no-overflow">
	                      	<div className="panel-heading">
		                        <div className="pull-left"><h3 className="panel-title">Danh sách khoa</h3></div>
		                        <div className="pull-right">
	                            	<button className="btn btn-sm" data-action="collapse" data-container="body" data-toggle="panel-body" data-placement="top" 
	                                	data-title="Collapse" data-original-title="" title=""><i className="fa fa-angle-up"></i></button>
	                        	</div>
	                        	<div className="clearfix"></div>
	                      	</div>
	                      	<div className="panel-body no-padding">
		    				<button type="submit" className="btn btn-success" onClick ={this.openMoD.bind(this)}>Thêm khoa</button>
				    			
				    		</div>
				    	</div>
		    		</div>

		    		{/*hien thi danh sach menu item*/}
		    		{/*<ListItemMenu/>*/}

		    		<Modal show={this.state.modalIsOpen} onHide ={KhoaAdminAction.closeModal}>
		              	<Modal.Header>
			                <Modal.Title>
			                	Thêm danh mục
			                </Modal.Title>
		              	</Modal.Header>
		              	<Modal.Body>
			              	<div>
			              		<label>Tên danh mục</label>
			              		<input type="text" className="form-control" id="item-menu-name" ref='NameItemMenu' value={this.state.itemMenuName} 
								    	onChange={KhoaAdminAction.updateItemMenuName} autoFocus />
			              	</div>
			              	<div className={this.state.classValidate}><span className="control-label">{this.state.validateTitle}</span></div>
		              	</Modal.Body>      
		              	<Modal.Footer>
		                  	<button
		                      	className="btn btn-warning"
		                    	onClick={KhoaAdminAction.closeModal}><i className="fa fa-times"> Hủy bỏ</i> </button>          
		                  	<button
		                      	className="btn btn-success"
		                    	onClick={this.themMenuItem.bind(this)} ><i className="fa fa-check"> Thêm</i> </button>          
		              	</Modal.Footer>
		            </Modal>

		        	{/* modal xoa item va con cua no */}
		        	<Modal show={this.state.modalIsOpenDelete} onHide ={KhoaAdminAction.closeModalDelete}>
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
		                    	onClick={KhoaAdminAction.closeModalDelete}><i className="fa fa-times"> Hủy bỏ</i> </button>          
		                  	<button
		                      	className="btn btn-success"
		                    	onClick={this.deleteMenuItem.bind(this)}><i className="fa fa-check"> Xóa</i> </button>          
		              	</Modal.Footer>
		            </Modal>

		            

		        </div>
		    </div>
	    );
  }
}

export default KhoaAdmin;