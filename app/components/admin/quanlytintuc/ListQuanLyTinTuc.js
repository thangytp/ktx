import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';

import QuanLyTinTucAction from '../../../actions/admin/quanlytintuc/QuanLyTinTucAction';
import QuanLyTinTucStore from '../../../stores/admin/quanlytintuc/QuanLyTinTucStore';

class ListQuanLyTinTuc extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = QuanLyTinTucStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		QuanLyTinTucStore.listen(this.onChange);
		QuanLyTinTucAction.getListTinTuc();
	}

	componentWillUnmount() {
		QuanLyTinTucStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}
	editTinTuc(id){
		QuanLyTinTucAction.getTinTuc(id);
	}
	openMoDDeleteTinTuc(id){
		QuanLyTinTucAction.openMoDDeleteTinTuc(id);
	}

	render() {  

		let listTinTuc = this.state.listTinTuc.map((tintuc, index) => {

			return(
					<tr key={index}>
						<td className="text-center border-right">{index+1}</td>
						<td>{tintuc.title}</td>
						<td colSpan="2">
							<a className="btn btn-primary btn-xs" onClick={this.editTinTuc.bind(this, tintuc._id)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
							<a className="btn btn-danger btn-xs" onClick={this.openMoDDeleteTinTuc.bind(this, tintuc._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></a>
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
                    {listTinTuc}
                  </tbody>
                       
                </table>       
			</div>
		);
	}
}

export default ListQuanLyTinTuc;