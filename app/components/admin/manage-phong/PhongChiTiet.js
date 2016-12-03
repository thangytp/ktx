import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
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
					{phong.loai}
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
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
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
          <Button onClick={this.props.onHide}>Close</Button>
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

  handleDelPhonChitiet(id) {
    ManagePhongChitietAction.delPhong(id);
  }

  onChange(state) {
    this.setState({state1: ManagePhongStore.getState(), state2: ManagePhongChitietStore.getState(), state3: ManageTangStore.getState()});
  }

  render() {
    console.log(this.state.state2.phongchitiet);
    let listPhongChitiet = this.state.state2.phongchitiet.map(function(phongchitiet, index){
      return (
        <tr>
        <th scope="row">{index + 1}</th>
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


    return (
      <div>
      <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
        Thêm Phòng
      </Button>
      <AddPhongChitietModal {...props} show={this.state.addModalShow} onHide={addModalClose} />
      <h1>Phòng Ký Túc Xá</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
           <tr>
             <th>#</th>
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
        </table>
      </div>
      </div>
    );
  }
}
export default Phong;
