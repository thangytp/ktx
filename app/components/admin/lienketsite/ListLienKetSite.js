import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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

	buttonFormatter(data, cell) {
      	return <a className="btn btn-primary btn-xs" onClick={this.editSite.bind(this, cell)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>;
	}
	buttonFormatterDel(data, cell) {
      	return <a className="btn btn-danger btn-xs" onClick={this.openMoDDelete.bind(this, cell)}><i className="fa fa-trash-o" aria-hidden="true"></i></a>;
	}

	onToggleDropDown(onToggleDropDown){
		// do your stuff here
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

		const options = {
	      	clearSearch: true,
	      	searchField: (props) => (<MySearchField { ...props }/>),
	      	sizePerPageDropDown: this.renderSizePerPageDropDown,
	      	exportCSVBtn: this.createCustomExportCSVButton
	    };

		return(
			<div className="col-md-12 table-responsive">
            <BootstrapTable data={this.state.listSite} striped={true} hover={true} options={ options } search pagination exportCSV>
		            <TableHeaderColumn dataField="name" isKey={true} dataSort={true}>Tên</TableHeaderColumn>

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

export default ListLienKetSite;
