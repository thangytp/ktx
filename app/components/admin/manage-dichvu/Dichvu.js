import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import ManageDichvuAction from '../../../actions/admin/manage-dichvu/ManageDichvuAction';
import ManageDichvuStore from '../../../stores/admin/manage-dichvu/ManageDichvuStore';

const AddDichvuModal = React.createClass({

  handleAddDichvu(e) {

    e.preventDefault()
    const data = {
        ten: this.refs.ten.value,
        gia: this.refs.gia.value
    };
    ManageDichvuAction.addDichvu(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Thêm dịch vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleAddDichvu.bind(this)}>
          <div className="form-group">
            <label for="exampleInputEmail1">Tên Dịch Vụ</label>
            <input type="text" className="form-control" ref="ten" placeholder="Tên Dịch Vụ" />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Gía</label>
            <input type="number" className="form-control" ref="gia" placeholder="Gía" />
          </div>
          <button className="btn btn-success btn-large" type="submit">Thêm Dịch Vụ</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


class Dichvu extends Component {
  constructor(props)
	{
		super(props);
		this.state = ManageDichvuStore.getState();
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
  }

  componentDidMount() {
    ManageDichvuStore.listen(this.onChange);
    ManageDichvuAction.getDichvu();
  }

  componentWillUnmount() {
    ManageDichvuStore.unlisten(this.onChange);
  }

  handleDelDichvu(id) {
    ManageDichvuAction.delDichvu(id);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let listDichvu = this.state.dichvu.map(function(dichvu, index){
      return (
        <tr>
        <td scope="row">{index + 1}</td>
        <td>{dichvu.ten}</td>
        <td>{dichvu.gia}</td>
        {/* <td><button className="btn btn-primary" onClick={this.handleGetStudent.bind(this, user._id)}>Edit</button></td> */}
        <td><button className="btn btn-danger" onClick={this.handleDelDichvu.bind(this, dichvu._id)}>Delete</button></td>
        </tr>
      )
    }, this);

    let addModalClose = () => this.setState({ addModalShow: false });


    return (
      <div>
      <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
        Thêm Dịch Vụ
      </Button>
      <AddDichvuModal show={this.state.addModalShow} onHide={addModalClose} />
      <h1>Dịch Vụ Ký Túc Xá</h1>
      <div className="table-responsive">
        <table className="table white-bg table-striped table-hover table-success">
          <thead>
           <tr>
             <th>#</th>
             <th>Tên Dịch Vụ</th>
             <th>Gía</th>
             <th></th>
             <th></th>
             </tr>
           </thead>
           <tbody>
            {listDichvu}
           </tbody>
        </table>
      </div>
      </div>
    );
  }
}
export default Dichvu;
