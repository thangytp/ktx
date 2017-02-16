import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';

import TinTucHomeAction from '../../../actions/admin/tintuchome/TinTucHomeAction';
import TinTucHomeStore from '../../../stores/admin/tintuchome/TinTucHomeStore';

class ListTinTucHome extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = TinTucHomeStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		TinTucHomeStore.listen(this.onChange);
		TinTucHomeAction.getListTinTuc();
	}

	componentWillUnmount() {
		TinTucHomeStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}
	editTinTuc(id){
		TinTucHomeAction.getTinTuc(id);
	}
	openMoDDeleteTinTuc(id){
		TinTucHomeAction.openMoDDeleteTinTuc(id);
	}

	buttonFormatter(data, cell) {
      	return <a className="btn btn-primary btn-xs" onClick={this.editTinTuc.bind(this, cell)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>;
	}
	buttonFormatterDel(data, cell) {
      	return <a className="btn btn-danger btn-xs" onClick={this.openMoDDeleteTinTuc.bind(this, cell)}><i className="fa fa-trash-o" aria-hidden="true"></i></a>;
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
            <BootstrapTable data={this.state.listTinTuc} striped={true} hover={true} options={ options } search pagination exportCSV>
		            <TableHeaderColumn dataField="title" isKey={true} dataAlign="center" dataSort={true}>Tên</TableHeaderColumn>
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

export default ListTinTucHome;
