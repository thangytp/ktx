import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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

	buttonFormatter(data, cell) {
      	return <a className="btn btn-primary btn-xs" onClick={this.editTinTuc.bind(this, cell)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>;
	}
	buttonFormatterDel(data, cell) {
      	return <a className="btn btn-danger btn-xs" onClick={this.openMoDDeleteTinTuc.bind(this, cell)}><i className="fa fa-trash-o" aria-hidden="true"></i></a>;
	}

	onToggleDropDown(onToggleDropDown){
		// do your stuff here
		console.log('toggle dropdown');
		onToggleDropDown();
	}

	renderSizePerPageDropDown(props){
		return (
		  <SizePerPageDropDown
		    className='my-size-per-page'
		    btnContextual='btn-warning'
		    variation='dropup'
		    onClick={ () => this.onToggleDropDown(props.onToggleDropDown) }/>
		);
	}

	createCustomExportCSVButton(onClick){
		return (
		  <button style={ { color: 'red' } } onClick={ onClick }>Custom Export CSV Btn</button>
		);
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

		const options = {
	      	clearSearch: true,
	      	searchField: (props) => (<MySearchField { ...props }/>),
	      	sizePerPageDropDown: this.renderSizePerPageDropDown,
	      	exportCSVBtn: this.createCustomExportCSVButton
	    };

		return(
			<div className="col-md-12 table-responsive">
				{/*<table className="table white-bg table-striped table-hover table-success">
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
                       
                </table>*/}       
                <BootstrapTable data={this.state.listTinTuc} striped={true} hover={true} options={ options } search pagination exportCSV>
		            <TableHeaderColumn dataField="title" isKey={true} dataAlign="left" dataSort={true}>Tên</TableHeaderColumn>
		            
		            <TableHeaderColumn dataField="_id" dataFormat={this.buttonFormatter.bind(this, '_id')} width="60">Sửa</TableHeaderColumn>
		            <TableHeaderColumn dataField="_id" dataFormat={this.buttonFormatterDel.bind(this, '_id')} width="60">Xóa</TableHeaderColumn>

		        </BootstrapTable>  
			</div>
		);
	}
}
class MySearchField extends React.Component {
  // It's necessary to implement getValue
  getValue() {
    return ReactDOM.findDOMNode(this).value;
  }

  // It's necessary to implement setValue
  setValue(value) {
    ReactDOM.findDOMNode(this).value = value;
  }

  render() {
    return (
      <input
        className={ `form-control` }
        type='text'
        defaultValue={ this.props.defaultValue }
        placeholder={ this.props.placeholder }
        onKeyUp={ this.props.search }/>
    );
  }
}

export default ListQuanLyTinTuc;