import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';

import AddPageAction from '../../../actions/admin/page/AddPageAction';
import AddPageStore from '../../../stores/admin/page/AddPageStore';

class ListPage extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = AddPageStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		AddPageStore.listen(this.onChange);
		AddPageAction.getListPage();
	}

	componentWillUnmount() {
		AddPageStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}
	editPage(id){
		AddPageAction.getPage(id);
	}
	openMoDDeletePage(id){
		AddPageAction.openMoDDeletePage(id);
	}

	render() {  

		let listPage = this.state.listPage.map((page, index) => {

			return(
					<tr key={index}>
						<td className="text-center border-right">{index+1}</td>
						<td>{page.title}</td>
						<td colSpan="2">
							<a className="btn btn-primary btn-xs" onClick={this.editPage.bind(this, page._id)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
							<a className="btn btn-danger btn-xs" onClick={this.openMoDDeletePage.bind(this, page._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></a>
						</td>
					</tr>
				);
		});

		return(
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
                    {listPage}
                  </tbody>
                       
                </table>       
			</div>
		);
	}
}

export default ListPage;