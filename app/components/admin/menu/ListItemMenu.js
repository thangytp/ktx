import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';

import HomeMenuAction from '../../../actions/admin/menu/HomeMenuAction';
import HomeMenuStore from '../../../stores/admin/menu/HomeMenuStore';

import GetChild from '../../../shared/GetChild';

class ListItemMenu extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = HomeMenuStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		HomeMenuStore.listen(this.onChange);
		HomeMenuAction.getListCha();
		HomeMenuAction.getListChild();
		HomeMenuAction.getListSubChild();
	}

	componentWillUnmount() {
		HomeMenuStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}
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

	addAlert () {  
        this.refs.container.success(
          "",
          "Sao chép liên kết thành công!", {
          timeOut: 5000,
          extendedTimeOut: 800,
          closeButton: true
        });
      }

	render() {  
		// var listCha = [];
		// for (var i = 0; i < this.state.listCha.length; i++) {
		// 	 listCha.push(<li key={i+1}>{this.state.listCha[i].title}
		// 	 		<button onClick ={this.openMoD.bind(this, this.state.listCha[i]._id)}>Add</button>
		// 	 	</li>);
		// }
		let listCha = this.state.listCha.map((cha, index) => {
			if(cha.order == 1){
				return(
		  				<tr key ={index}>
				          <td>{index+1}</td>
				          <td>{cha.title}</td>
				          <td>{cha.order}</td>
				          <td>{cha._postId}</td>
				          <td>
				          	<button className="btn btn-success" onClick ={this.openMoD.bind(this, cha._id)}>Thêm</button>
				          	
				          	<button className="btn btn-danger" onClick={this.moveDownOrder.bind(this, cha._id, this.state.cha)}><i className="fa fa-long-arrow-down" aria-hidden="true"></i></button>
				          	<button className="btn btn-danger" onClick ={this.openMoDDeleteCha.bind(this, cha._id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
				          </td>
				        </tr>		  				
		  			);
			}
			else{
		  		return(
		  				<tr key ={index}>
				          <td>{index+1}</td>
				          <td>{cha.title}</td>
				          <td>{cha.order}</td>
				          <td>{cha._postId}</td>
				          <td>
				          	<button className="btn btn-success" onClick ={this.openMoD.bind(this, cha._id)}>Thêm</button>
				          	
				          	<button className="btn btn-danger" onClick={this.moveUpOrder.bind(this, cha._id, this.state.cha)}><i className="fa fa-long-arrow-up" aria-hidden="true"></i></button>
				          	<button className="btn btn-danger" onClick={this.moveDownOrder.bind(this, cha._id, this.state.cha)}><i className="fa fa-long-arrow-down" aria-hidden="true"></i></button>
				          	<button className="btn btn-danger" onClick ={this.openMoDDeleteCha.bind(this, cha._id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
				          </td>
				        </tr>
		  				// <li key={index+1}>
		  				// 	{cha.title} <button onClick ={this.openMoD.bind(this, cha._id)}>Add</button>
		  				// 	<GetChild action={HomeMenuAction} item={cha} list={this.state.listCon}/>
		  				// </li>
		  				
		  			);
		  	}
	  	});
		let listChild = this.state.listChild.map((child, index) => {
			if(child.order == 1){
		  		return(
		  				<tr key ={index}>
				          <td>{index+1}</td>
				          <td>{child.title}</td>
				          <td>{child._parentId.title}</td>
				          <td>{child.order}</td>
				          <td>{child._postId}</td>
				          <td>
				          	<button className="btn btn-success" onClick ={this.openMoD.bind(this, child._id)}>Thêm</button>
				          	
				          	<button className="btn btn-danger" onClick={this.moveDownOrder.bind(this, child._id, this.state.con)}><i className="fa fa-long-arrow-down" aria-hidden="true"></i></button>
				          	<button className="btn btn-danger" onClick ={this.openMoDDeleteCha.bind(this, child._id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
				          </td>
				        </tr>
		  				
		  			);
		  	}
		  	else{
		  		return(
		  				<tr key ={index}>
				          <td>{index+1}</td>
				          <td>{child.title}</td>
				          <td>{child._parentId.title}</td>
				          <td>{child.order}</td>
				          <td>{child._postId}</td>
				          <td>
				          	<button className="btn btn-success" onClick ={this.openMoD.bind(this, child._id)}>Thêm</button>
				          	
				          	<button className="btn btn-danger" onClick={this.moveUpOrder.bind(this, child._id, this.state.con)}><i className="fa fa-long-arrow-up" aria-hidden="true"></i></button>
				          	<button className="btn btn-danger" onClick={this.moveDownOrder.bind(this, child._id, this.state.con)}><i className="fa fa-long-arrow-down" aria-hidden="true"></i></button>
				          	<button className="btn btn-danger" onClick ={this.openMoDDeleteCha.bind(this, child._id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
				          </td>
				        </tr>
		  				
		  			);
		  	}
	  	});

		let listSubChild = this.state.listSubChild.map((subchild, index) => {
			if(subchild.order == 1){
		  		return(
		  				<tr key ={index}>
				          <td>{index+1}</td>
				          <td>{subchild.title}</td>
				          <td>{subchild._parentId.title}</td>
				          <td>{subchild.order}</td>
				          <td>{subchild._postId}
				          		<button className="btn btn-info" ><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
				          </td>
				          <td>
				          	
				          	<button className="btn btn-danger" onClick={this.moveDownOrder.bind(this, subchild._id, this.state.chau)}><i className="fa fa-long-arrow-down" aria-hidden="true"></i></button>
				          	<button className="btn btn-danger" onClick ={this.openMoDDeleteCha.bind(this, subchild._id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
				          </td>
				        </tr>
		  				
		  			);
		  	}
		  	else{
		  		return(
		  				<tr key ={index}>
				          <td>{index+1}</td>
				          <td>{subchild.title}</td>
				          <td>{subchild._parentId.title}</td>
				          <td>{subchild.order}</td>
				          <td>{subchild._postId}</td>
				          <td>
				          	
				          	<button className="btn btn-danger" onClick={this.moveUpOrder.bind(this, subchild._id, this.state.chau)}><i className="fa fa-long-arrow-up" aria-hidden="true"></i></button>
				          	<button className="btn btn-danger" onClick={this.moveDownOrder.bind(this, subchild._id, this.state.chau)}><i className="fa fa-long-arrow-down" aria-hidden="true"></i></button>
				          	<button className="btn btn-danger" onClick ={this.openMoDDeleteCha.bind(this, subchild._id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
				          </td>
				        </tr>
		  				
		  			);
		  	}
	  	});

		return (
			<div className="col-md-12">
				<div className="col-md-12 white-bg panel panel-default">
				  	<div className="">Danh mục cấp 1</div>
				</div>
				<div className="col-md-12 table-responsive">
					<table className="table white-bg table-bordered">
	                  	<thead>
		                    <tr>
		                      <th>#</th>
		                      <th>Tên</th>
		                      <th>Thứ tự sắp xếp</th>      
		                      <th>Bài viết</th> 
		                      <th colSpan="4">Hành động</th>                                   
		                    </tr>
	                  	</thead>
	                  	<tbody> 
							{listCha}
						</tbody>     
	                </table>       
    			</div>

    			<div className="col-md-12 white-bg panel panel-default">
				  	<div className="">Danh mục cấp 2</div>
				</div>
    			<div className="col-md-12 table-responsive">
    				<table className="table white-bg table-bordered">
	                  	<thead>
	                    	<tr>
	                      		<th>#</th>
	                      		<th>Tên</th>
	                      		<th>Danh mục cha</th>  
	                      		<th>Thứ tự sắp xếp</th>      
	                      		<th>Bài viết</th> 
	                    	    <th colSpan="4">Hành động</th>                            
	                    	</tr>
	                  	</thead>
	                  	<tbody>                       
	                    	{listChild}
	                  	</tbody>
	                       
	                </table>       
    			</div>

    			<div className="clear"></div>
    			<div className="col-md-12 white-bg panel panel-default">
				  	<div className="">Danh mục cấp 3</div>
				</div>
    			<div className="col-md-12 table-responsive">
    				<table className="table white-bg table-bordered">
	                  <thead>
	                    <tr>
	                      <th>#</th>
	                      <th>Tên</th>
	                      <th>Danh mục cha</th>  
	                      <th>Thứ tự sắp xếp</th>      
	                      <th>Bài viết</th> 
	                      <th colSpan="4">Hành động</th>
	                    </tr>
	                  </thead>
	                  <tbody>                       
	                    {listSubChild}
	                  </tbody>
	                       
	                </table>       
    			</div>

    		</div>
	);
  }
}

export default ListItemMenu;