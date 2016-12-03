import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import ManageTangAction from '../../../actions/admin/manage-phong/ManageTangAction';
import ManageTangStore from '../../../stores/admin/manage-phong/ManageTangStore';

const AddTangModal = React.createClass({

  handleAddTang(e) {

    e.preventDefault()
    const data = {
        ten: this.refs.loai.value
    };
    ManageTangAction.addTang(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleAddTang.bind(this)}>
          <div className="form-group">
            <label for="exampleInputEmail1">Tầng</label>
            <input type="Number" className="form-control" ref="loai" placeholder="Tầng" />
          </div>
          <button className="btn btn-success btn-large" type="submit">Thêm Tầng</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


class Tang extends Component {
  constructor(props)
	{
		super(props);
		this.state = ManageTangStore.getState();
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
  }

  componentDidMount() {
    ManageTangStore.listen(this.onChange);
    ManageTangAction.getTang();
  }

  componentWillUnmount() {
    ManageTangStore.unlisten(this.onChange);
  }

  handleDelTang(id) {
    ManageTangAction.delTang(id);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let listTang = this.state.tang.map(function(tang, index){
      return (
        <tr>
        <th scope="row">{index + 1}</th>
        <td>{tang.ten}</td>
        {/* <td><button className="btn btn-primary" onClick={this.handleGetStudent.bind(this, user._id)}>Edit</button></td> */}
        <td><button className="btn btn-danger" onClick={this.handleDelTang.bind(this, tang._id)}>Delete</button></td>
        </tr>
      )
    }, this);

    let addModalClose = () => this.setState({ addModalShow: false });


    return (
      <div>
      <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
        Thêm Tầng Năm Mới
      </Button>
      <AddTangModal show={this.state.addModalShow} onHide={addModalClose} />
      <h1>Tầng</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
           <tr>
             <th>#</th>
             <th>Tầng</th>
             <th></th>
             <th></th>
             </tr>
           </thead>
           <tbody>
            {listTang}
           </tbody>
        </table>
      </div>
      </div>
    );
  }
}
export default Tang;
