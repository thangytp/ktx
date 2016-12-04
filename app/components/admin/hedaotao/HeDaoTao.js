import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';

import HeDaoTaoAction from '../../../actions/admin/hedaotao/HeDaoTaoAction';
import HeDaoTaoStore from '../../../stores/admin/hedaotao/HeDaoTaoStore';

class HeDaoTao extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = HeDaoTaoStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		HeDaoTaoStore.listen(this.onChange);
		HeDaoTaoAction.getListHeDaoTao();
	}

	componentWillUnmount() {
		HeDaoTaoStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}

	themHeDaoTao(e){
		e.preventDefault();
		var id = this.state.id;
		var ten = this.state.ten;
		if(!ten){
			HeDaoTaoAction.invalidTen();
			this.refs.TenHeDaoTao.focus();
		}
		else {
			if(!id){
				HeDaoTaoAction.addHeDaoTao({ten: ten});
			}
			else HeDaoTaoAction.updateHeDaoTao({id: id, ten: ten});
		}
	}

	editHeDaoTao(id, ten){
		HeDaoTaoAction.editHeDaoTao({id: id, ten: ten});
	}

	deleteHeDaoTao(){
		var id = this.state.idHeDaoTaoToDel;
		HeDaoTaoAction.deleteHeDaoTao(id);
	}
	openMoDDeleteHeDaoTao(id){
		HeDaoTaoAction.openMoDDeleteHeDaoTao(id);
	}

	render() { 

		let listHeDaoTao = this.state.listHeDaoTao.map((hedaotao, index)=>{
			return (
					<tr key={index}>
						<td>{index+1}</td>
						<td>{hedaotao.ten}</td>
						<td colSpan="2">
							<a className="btn btn-primary btn-xs" onClick={this.editHeDaoTao.bind(this, hedaotao._id, hedaotao.ten)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
							<a className="btn btn-danger btn-xs" onClick={this.openMoDDeleteHeDaoTao.bind(this, hedaotao._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></a>
						</td>
					</tr>
				);
		});

		return (
	    	<div className="body-content animated fadeIn">
		    	<div className="row">
		    		<div className="col-md-12">
		    			<ol className="breadcrumb">
	                      <li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
	                      <li>Quản lý hệ đào tạo</li>
	                    </ol>
	                    <div className="panel rounded shadow no-overflow">
	                      	<div className="panel-heading">
		                        <div className="pull-left"><h3 className="panel-title">Danh sách hệ đào tạo</h3></div>
		                        <div className="pull-right">
	                            	<button className="btn btn-sm" data-action="collapse" data-container="body" data-toggle="panel-body" data-placement="top" 
	                                	data-title="Collapse" data-original-title="" title=""><i className="fa fa-angle-up"></i></button>
	                        	</div>
	                        	<div className="clearfix"></div>
	                      	</div>
	                      	<div className="panel-body no-padding">
	                      		<form className="form-horizontal mt-10" encType="multipart/form-data" onSubmit={this.themHeDaoTao.bind(this)}>
                            		<div className="form-body">
	                            		<div className="form-group">
			                                <label className="control-label col-sm-3" htmlFor="name-item">Tên khoa:</label>
			                                <div className="col-sm-7">
			    								<input type="text" className="form-control" id="ten" ref='TenHeDaoTao' value={this.state.ten} 
									    		onChange={HeDaoTaoAction.updateTen} autoFocus />
									    		<span className='help-block text-danger'>{this.state.helpBlockTen}</span>
								    		</div>
								    	</div>
				    				</div>
				    				<div className="form-footer">
		                              	<div className="form-group"> 
			                                <div className="col-sm-offset-3">
			                                    <button type="submit" className="btn btn-success">Thêm</button>
			                                </div>
		                              	</div>
		                            </div>
				    			</form>
				    		</div>
				    	</div>
		    		</div>

		    		{/*hien thi danh sach menu item*/}
		    		<div className="col-md-12 table-responsive">
						<table className="table white-bg table-striped table-hover table-success">
		                  <thead>
		                    <tr>
		                      <th className="text-center" width='1%'>STT</th>
		                      <th>Tên</th>
		                      <th>Hành động</th>  
		                    </tr>
		                  </thead>
		                  <tbody>                       
		                    {listHeDaoTao}
		                  </tbody>
		                       
		                </table>       
					</div>


		        	{/* modal xoa item va con cua no */}
		        	<Modal show={this.state.modalIsOpenDelete} onHide ={HeDaoTaoAction.closeModalDelete}>
		              	<Modal.Header>
			                <Modal.Title>
			                	Xóa
			                </Modal.Title>
		              	</Modal.Header>
		              	<Modal.Body>
		              		<p>Bạn có chắc muốn xóa?</p>
		              	</Modal.Body>      
		              	<Modal.Footer>
		                  	<button
		                      	className="btn btn-warning"
		                    	onClick={HeDaoTaoAction.closeModalDelete}><i className="fa fa-times"> Hủy bỏ</i> </button>          
		                  	<button
		                      	className="btn btn-success"
		                    	onClick={this.deleteHeDaoTao.bind(this)}><i className="fa fa-check"> Xóa</i> </button>          
		              	</Modal.Footer>
		            </Modal>

		            

		        </div>
		    </div>
	    );
  }
}

export default HeDaoTao;