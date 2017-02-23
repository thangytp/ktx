import React from 'react';
import ReactDom from 'react-dom';
import {Modal} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';
import CKEditor from '../../../shared/Ckeditor';
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

	handleSubmitTinTucHome(event){
		event.preventDefault();
		for ( var instance in CKEDITOR.instances )
        	CKEDITOR.instances[instance].updateElement();

		var id = this.state.idTinTucHome;
		var title = this.state.titleTinTucHome;
		var contentLeft = ReactDom.findDOMNode(this.refs.ContentTinTucField).value;
		var linkChitiet = this.state.linkChitiet;
		var hienthi = this.state.hienthi;

		if(!title){
			TinTucHomeAction.invalidTitle();
			this.refs.TitlePageField.focus();
		}
		else if(!contentLeft){
			TinTucHomeAction.invalidContent();
			this.refs.ContentTinTucField.focus();
		}
		else if(!linkChitiet){
			TinTucHomeAction.invalidLinkChitiet();
			this.refs.LinkTinTucField.focus();
		}


		// goi ham add page
		if(title && contentLeft && linkChitiet){
			if(id==''){
				TinTucHomeAction.addTinTucHome({ title: title, contentLeft: contentLeft, linkChitiet: linkChitiet, hienthi: hienthi });
			}
			else{
				TinTucHomeAction.updateTinTucHome({ id: id, title: title, contentLeft: contentLeft, linkChitiet: linkChitiet, hienthi: hienthi });
			}
		}

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

		let listTinTucSearch;
      	if(this.state.listTinTucSearch.length>0){
	        listTinTucSearch = this.state.listTinTucSearch.map((item, index) =>{
	          return (
	              <div className="item-page" key={index} onClick={this.itemTinTucClick.bind(this, item.slug)}>{item.title}</div>
	            );
	        });
	    }
	    else{
	        listTinTucSearch = (
	            <span className='err-findpage'>Không tìm thấy trang, vui lòng thử với từ khóa khác</span>
	        );
	    }

		const options = {
	      	clearSearch: true,
	      	searchField: (props) => (<MySearchField { ...props }/>),
	      	sizePerPageDropDown: this.renderSizePerPageDropDown,
	      	exportCSVBtn: this.createCustomExportCSVButton
	    };

		return(
			<div className="col-md-12 table-responsive">
            	<BootstrapTable data={this.state.listTinTuc} striped={true} hover={true} options={ options } search pagination exportCSV>
		            <TableHeaderColumn dataField="title" isKey={true} dataSort={true}>Tên</TableHeaderColumn>
		            <TableHeaderColumn dataField="_id" dataFormat={this.buttonFormatter.bind(this, '_id')} width="60">Sửa</TableHeaderColumn>
		            <TableHeaderColumn dataField="_id" dataFormat={this.buttonFormatterDel.bind(this, '_id')} width="60">Xóa</TableHeaderColumn>
		        </BootstrapTable>
		        <Modal show={this.state.modalIsOpen} bsSize="large" onHide ={TinTucHomeAction.closeModal}>
						<Modal.Header>
							<Modal.Title>
								Sửa
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
						<form className="form-horizontal" encType="multipart/form-data" onSubmit={this.handleSubmitTinTucHome.bind(this)}>
								<div className="form-body">
									<div className="form-group">
										<label className="control-label col-sm-2" htmlFor="name-item">Tiêu đề:</label>
										<div className="col-sm-10">
												<input type="text" className="form-control" id="name-item" placeholder="Nhập tên trang"
													ref="TitlePageField" value={this.state.titleTinTucHome} onChange={TinTucHomeAction.updateTitleTinTucHome}/>
												<span className='help-block'>{this.state.helpBlockTitle}</span>
										</div>
									</div>

								<div className='form-group '>
														<label className='col-sm-2 control-label'>Nội dung:</label>
															<div  className ='col-sm-10'>
																<CKEditor id={2} ref="ContentTinTucField" value={this.state.contentLeft}/>
																<span className='help-block'>{this.state.helpBlockContent}</span>
														</div>
													</div>

													<div className="form-group">
																	<label className="control-label col-sm-2" htmlFor="link-to-page">Link tin tức:</label>
																	<div className="col-sm-10">
																			<input type="text" className="form-control" id="link-to-page" placeholder="VD: /gioi-thieu"
																				ref="LinkTinTucField" value={this.state.linkChitiet} onChange={TinTucHomeAction.updateLinkChitiet}/>

																			<div className="live-search" style={{'display':this.state.displayListTinTuc}}>
																					{listTinTucSearch}
																			</div>

																			<span className='help-block text-danger'>{this.state.helpBlockLinkTinTuc}</span>
																	</div>
															</div>

															<div className="form-group">

										<div className="col-sm-10 col-sm-offset-2">
												<label>
												<input type="checkbox" value={this.state.hienthi} checked={this.state.checkHienThi} onChange={TinTucHomeAction.updateHienThi}/>
												Hiển thị ở trang chủ?
											</label>
										</div>
									</div>


							</div>
									<div className="form-group">
										<div className="col-sm-offset-2">
												<button type="submit" className="btn btn-success" disabled={this.state.disableButtonAddPage}>{this.state.textButton}</button><span className='help-block'> {this.state.helpBlockAddTinTuc}</span>
										</div>
									</div>
						</form>
						</Modal.Body>
						<Modal.Footer>
								<button
										className="btn btn-warning"
									onClick={TinTucHomeAction.closeModal}><i className="fa fa-times"> Hủy bỏ</i> </button>
						</Modal.Footer>
				</Modal>
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
