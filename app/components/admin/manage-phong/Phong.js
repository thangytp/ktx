import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import ManagePhongAction from '../../../actions/admin/manage-phong/ManagePhongAction';
import ManagePhongStore from '../../../stores/admin/manage-phong/ManagePhongStore';

const AddPhongModal = React.createClass({

  handleAddPhong(e) {

    e.preventDefault()
    const data = {
        loai: this.refs.loai.value,
        gia: this.refs.gia.value,
        kichco: this.refs.kichco.value,
        soluong: this.refs.soluong.value
    };
    ManagePhongAction.addPhong(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleAddPhong.bind(this)}>
          <div className="form-group">
            <label for="exampleInputEmail1">Loại Phòng</label>
            <input type="text" className="form-control" ref="loai" placeholder="Loại Phòng" />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Gía</label>
            <input type="number" className="form-control" ref="gia" placeholder="Gía" />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Kích Cỡ</label>
            <input type="Number" className="form-control" ref="kichco" placeholder="Kích Cỡ" />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Số Lượng</label>
            <input type="Number" className="form-control" ref="soluong" placeholder="Số Lượng" />
          </div>
          <button className="btn btn-success btn-large" type="submit">Thêm Loại Phòng</button>
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
		this.state = ManagePhongStore.getState();
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
  }

  componentDidMount() {
    ManagePhongStore.listen(this.onChange);
    ManagePhongAction.getPhong();
  }

  componentWillUnmount() {
    ManagePhongStore.unlisten(this.onChange);
  }

  handleDelPhong(id) {
    ManagePhongAction.delPhong(id);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let listPhong = this.state.phong.map(function(phong, index){
      return (
        <tr>
        <th scope="row">{index + 1}</th>
        <td>{phong.loai}</td>
        <td>{phong.gia}</td>
        <td>{phong.kichco + ' người'}</td>
        <td>{phong.soluong + ' phòng'}</td>
        {/* <td><button className="btn btn-primary" onClick={this.handleGetStudent.bind(this, user._id)}>Edit</button></td> */}
        <td><button className="btn btn-danger" onClick={this.handleDelPhong.bind(this, phong._id)}>Delete</button></td>
        </tr>
      )
    }, this);

    let addModalClose = () => this.setState({ addModalShow: false });


    return (
      <div>
      <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
        Thêm Loại Phòng Năm Mới
      </Button>
      <AddPhongModal show={this.state.addModalShow} onHide={addModalClose} />
      <h1>Phòng Ký Túc Xá</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
           <tr>
             <th>#</th>
             <th>Loại Phòng</th>
             <th>Gía</th>
             <th>Kích Cỡ</th>
             <th>Số Lượng</th>
             <th></th>
             <th></th>
             </tr>
           </thead>
           <tbody>
            {listPhong}
           </tbody>
        </table>
      </div>
      </div>
    );
  }
}
export default Phong;
