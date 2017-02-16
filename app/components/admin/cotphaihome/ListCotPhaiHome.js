import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';

import CotPhaiHomeAction from '../../../actions/admin/cotphaihome/CotPhaiHomeAction';
import CotPhaiHomeStore from '../../../stores/admin/cotphaihome/CotPhaiHomeStore';

class ListCotPhaiHome extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = CotPhaiHomeStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		CotPhaiHomeStore.listen(this.onChange);
		CotPhaiHomeAction.getListItem();
	}

	componentWillUnmount() {
		CotPhaiHomeStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}
	editSite(id, type){
		CotPhaiHomeAction.getItem({id, type});
	}
	openMoDDelete(id){
		CotPhaiHomeAction.openMoDDelete(id);
	}

	render() {
		let listItem = this.state.listItem.map((item, index) =>{
			return(
					<tr key={index}>
						<td className="text-center border-right">{index+1}</td>
						<td>{item.name}</td>
						<td>{item.type}</td>
						<td colSpan="2">
							<a className="btn btn-primary btn-xs" onClick={this.editSite.bind(this, item._id, item.type)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
							<a className="btn btn-danger btn-xs" onClick={this.openMoDDelete.bind(this, item._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></a>
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
                      <th>Loại</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listItem}
                  </tbody>

                </table>
			</div>
		);
	}
}

export default ListCotPhaiHome;
