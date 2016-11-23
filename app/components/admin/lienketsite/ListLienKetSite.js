import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';

import LienKetSiteAction from '../../../actions/admin/lienketsite/LienKetSiteAction';
import LienKetSiteStore from '../../../stores/admin/lienketsite/LienKetSiteStore';

class ListLienKetSite extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = LienKetSiteStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		LienKetSiteStore.listen(this.onChange);
		LienKetSiteAction.getListSite();
	}

	componentWillUnmount() {
		LienKetSiteStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}
	editSite(id){
		LienKetSiteAction.getSite(id);
	}
	openMoDDelete(id){
		LienKetSiteAction.openMoDDelete(id);
	}

	render() {  
		let listSite = this.state.listSite.map((site, index) =>{
			return(
					<tr key={index}>
						<td>{index+1}</td>
						<td>{site.name +' ' + site.sort}</td>
						<td colSpan="2">
							<button type="button" className="btn btn-info" onClick={this.editSite.bind(this, site._id)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
							<button type="button" className="btn btn-danger" onClick={this.openMoDDelete.bind(this, site._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
						</td>
					</tr>
				);
		});

		return(
			<div className="col-md-12 table-responsive">
				<table className="table white-bg table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tên</th>
                      <th>Hành động</th>  
                    </tr>
                  </thead>
                  <tbody>                       
                    {listSite}
                  </tbody>
                       
                </table>       
			</div>
		);
	}
}

export default ListLienKetSite;