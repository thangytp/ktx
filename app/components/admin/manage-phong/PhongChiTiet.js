import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Link} from 'react-router';

import ManagePhongAction from '../../../actions/admin/manage-phong/ManagePhongAction';
import ManagePhongStore from '../../../stores/admin/manage-phong/ManagePhongStore';
import ManagePhongChitietAction from '../../../actions/admin/manage-phong/ManagePhongChitietAction';
import ManagePhongChitietStore from '../../../stores/admin/manage-phong/ManagePhongChitietStore';
import ManageTangAction from '../../../actions/admin/manage-phong/ManageTangAction';
import ManageTangStore from '../../../stores/admin/manage-phong/ManageTangStore';

const AddPhongChitietModal = React.createClass({

  handleAddPhongChitiet(e) {

    e.preventDefault()
    const data = {
        loai: this.state.loai,
        ma: this.refs.ma.value,
        tang: this.state.tang
    };
    ManagePhongChitietAction.addPhong(data);
  },

  handleChangePhong(e) {
    this.setState({loai : e.target.value});
  },

  handleChangeTang(e) {
    this.setState({tang : e.target.value});
  },

  render() {

    let listPhong = this.props.phong.map(function(phong, index){
      return(
				<option value={phong._id} key={index}>
					{phong.ten}
				</option>
			);
    });

    let listTang = this.props.tang.map(function(tang, index){
      return(
				<option value={tang._id} key={index}>
					{tang.ten}
				</option>
			);
    });

    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Thêm phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleAddPhongChitiet.bind(this)}>
          <div className="form-group">
            <label for="exampleInputPassword1">Loại Phòng</label>
            <select className="form-control" onChange={this.handleChangePhong.bind(this)}>
                <option value='0'>--Chọn--</option>
                {listPhong}
            </select>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Mã</label>
            <input type="text" className="form-control" ref="ma" placeholder="Mã Phòng" />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Tầng</label>
            <select className="form-control" onChange={this.handleChangeTang.bind(this)}>
                <option value='0'>--Chọn--</option>
                {listTang}
            </select>
          </div>
          <button className="btn btn-success btn-large" type="submit">Thêm Phòng</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


class Phong extends Component {
  constructor(props)
	{
		super(props);
		this.state = {state1: ManagePhongStore.getState(), state2: ManagePhongChitietStore.getState(), state3: ManageTangStore.getState()};
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
  }

  componentDidMount() {
    ManagePhongStore.listen(this.onChange);
    ManagePhongChitietStore.listen(this.onChange);
    ManageTangStore.listen(this.onChange);
    ManagePhongAction.getPhong();
    ManagePhongChitietAction.getPhong();
    ManageTangAction.getTang();
  }

  componentWillUnmount() {
    ManagePhongStore.unlisten(this.onChange);
    ManagePhongChitietStore.unlisten(this.onChange);
    ManageTangStore.unlisten(this.onChange);
  }

  handleEditPhongChitiet(id){

  }

  handleDelPhonChitiet(id) {
    ManagePhongChitietAction.delPhong(id);
  }

  onChange(state) {
    this.setState({state1: ManagePhongStore.getState(), state2: ManagePhongChitietStore.getState(), state3: ManageTangStore.getState()});
  }

  objectFormatter(data, cell) {
      return <p>{cell[data]}</p>;
  }

  buttonFormatterEdit(data, cell) {
      return <button className="btn btn-primary" onClick={this.handleEditPhongChitiet.bind(this, cell)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>;
  }
  buttonFormatter(data, cell) {
      return <button className="btn btn-danger" onClick={this.handleDelPhonChitiet.bind(this, cell)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>;
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
    console.log(this.state.state2.phongchitiet);
    let listPhongChitiet = this.state.state2.phongchitiet.map(function(phongchitiet, index){
      return (
        <tr>
        <td scope="row">{index + 1}</td>
        <td>{phongchitiet._loai.loai}</td>
        <td>{phongchitiet.ma}</td>
        <td>{phongchitiet._tang.ten}</td>
        {/* <td><button className="btn btn-primary" onClick={this.handleGetStudent.bind(this, user._id)}>Edit</button></td> */}
        <td><button className="btn btn-danger" onClick={this.handleDelPhonChitiet.bind(this, phongchitiet._id)}>Delete</button></td>
        </tr>
      )
    }, this);

    let addModalClose = () => this.setState({ addModalShow: false });

    const props = {phong : this.state.state1.phong, tang : this.state.state3.tang};

    const options = {
      clearSearch: true,
      searchField: (props) => (<MySearchField { ...props }/>),
      sizePerPageDropDown: this.renderSizePerPageDropDown,
      exportCSVBtn: this.createCustomExportCSVButton
    };

    let listPhongCT = this.state.state2.phongchitiet.map(function(phongchitiet, index){

        phongchitiet['loaiphong'] = phongchitiet._loai ? phongchitiet._loai.loai : '';
        phongchitiet['tentang'] = phongchitiet._tang ? phongchitiet._tang.ten : '';
        
        return phongchitiet;

    });

    return (
      <div className="body-content animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <ol className="breadcrumb">
              <li><Link to="/quanly@ktx"><i className="fa fa-home" aria-hidden="true"></i> Trang quản trị</Link></li>
              <li>Phòng</li>
            </ol>
            <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
              Thêm Phòng
            </Button>
            <AddPhongChitietModal {...props} show={this.state.addModalShow} onHide={addModalClose} />
            
            <div className="table-responsive">
              {/*<table className="table">
                <thead>
                 <tr>
                   <th>STT</th>
                   <th>Loại Phòng</th>
                   <th>Mã</th>
                   <th>Tầng</th>
                   <th></th>
                   <th></th>
                   </tr>
                 </thead>
                 <tbody>
                  {listPhongChitiet}
                 </tbody>
              </table>*/}
              <BootstrapTable data={this.state.state2.phongchitiet} striped={true} hover={true} options={ options } search pagination exportCSV>
                  
                  <TableHeaderColumn dataField="tentang" dataSort={true}>Tầng</TableHeaderColumn>
                  <TableHeaderColumn dataField="loaiphong" isKey={true} dataAlign="" dataSort={true}>Loại phòng</TableHeaderColumn>
                  <TableHeaderColumn dataField="ma" >Mã phòng</TableHeaderColumn>
                  <TableHeaderColumn dataField="_id" dataFormat={this.buttonFormatterEdit.bind(this, '_id')} width='60'>Sửa</TableHeaderColumn>
                  <TableHeaderColumn dataField="_id" dataFormat={this.buttonFormatter.bind(this, '_id')} width='60'>Xóa</TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
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

export default Phong;
