import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import ManageHedaotaoAction from '../../../actions/admin/khoa/ManageHedaotaoAction';
import ManageHedaotaoStore from '../../../stores/admin/khoa/ManageHedaotaoStore';

const AddHedaotaoModal = React.createClass({

  handleAddHedaotao(e) {

    e.preventDefault()
    const data = {
        ten: this.refs.ten.value
    };
    ManageHedaotaoAction.addHedaotao(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleAddHedaotao.bind(this)}>
          <div className="form-group">
            <label for="exampleInputEmail1">Hệ Đào Tạo</label>
            <input type="text" className="form-control" ref="ten" placeholder="Hệ Đào Tạo" />
          </div>
          <button className="btn btn-success btn-large" type="submit">Thêm Hệ Đào Tạo</button>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


class Hedaotao extends Component {
  constructor(props)
	{
		super(props);
		this.state = ManageHedaotaoStore.getState();
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
  }

  componentDidMount() {
    ManageHedaotaoStore.listen(this.onChange);
    ManageHedaotaoAction.getHedaotao();
  }

  componentWillUnmount() {
    ManageHedaotaoStore.unlisten(this.onChange);
  }

  handleDelHedaotao(id) {
    ManageHedaotaoAction.delHedaotao(id);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let listHedaotao = this.state.hedaotao.map(function(hedaotao, index){
      return (
        <tr>
        <th scope="row">{index + 1}</th>
        <td>{hedaotao.ten}</td>
        {/* <td><button className="btn btn-primary" onClick={this.handleGetStudent.bind(this, user._id)}>Edit</button></td> */}
        <td><button className="btn btn-danger" onClick={this.handleDelHedaotao.bind(this, hedaotao._id)}>Delete</button></td>
        </tr>
      )
    }, this);

    let addModalClose = () => this.setState({ addModalShow: false });


    return (
      <div>
      <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
        Thêm Hệ Đào Tạo Năm Mới
      </Button>
      <AddHedaotaoModal show={this.state.addModalShow} onHide={addModalClose} />
      <h1>Hệ Đào Tạo</h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
           <tr>
             <th>#</th>
             <th>Hệ Đào Tạo</th>
             <th></th>
             <th></th>
             </tr>
           </thead>
           <tbody>
            {listHedaotao}
           </tbody>
        </table>
      </div>
      </div>
    );
  }
}
export default Hedaotao;
