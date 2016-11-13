import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import ManageUuTienAction from '../../../actions/admin/manage-uutien/ManageUuTienAction';
import ManageUuTienStore from '../../../stores/admin/manage-uutien/ManageUuTienStore';

const AddKhuVucModal = React.createClass({

  handleAddKhuVuc(e) {

    e.preventDefault()
    const data = {
        khuvuc: this.refs.khuvuc.value,
        diemkhuvuc: this.refs.diemuutienkv.value,
        makhuvuc: this.refs.makv.value,
    };
    ManageUuTienAction.addKhuvuc(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleAddKhuVuc.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Khu Vực</label>
              <input type="text" className="form-control" ref="khuvuc" placeholder="Khu Vực" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Uư Tiên</label>
              <input type="number" className="form-control" ref="diemuutienkv" placeholder="Điểm Uư Tiên Khu Vực" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Mã Khu Vực</label>
              <input type="number" className="form-control" ref="makv" placeholder="Mã Khu Vực" />
            </div>
            <button className="btn btn-success btn-large" type="submit">Thêm Khu Vực</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

class UuTien extends Component {
  constructor(props)
	{
		super(props);
		this.state = ManageUuTienStore.getState();
		this.onChange = this.onChange.bind(this);
    this.state.khuvucModalShow = false;
  }

  componentDidMount() {
    ManageUuTienStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ManageUuTienStore.unlisten(this.onChange);
  }

  handleDelChitieu(id) {
    ManageUuTienStore.delChitieu(id);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    console.log(this.state.khuvuc);
    let khuvucModalClose = () => this.setState({ khuvucModalShow: false });

    return (

      <Tabs defaultActiveKey={1} id="uutien">
        <Tab eventKey={1} title="Khu Vực">
          <Button bsStyle="primary" onClick={()=>this.setState({ khuvucModalShow: true })}>
            Thêm Khu Vực
          </Button>
          <AddKhuVucModal show={this.state.khuvucModalShow} onHide={khuvucModalClose} />
        </Tab>
      </Tabs>
    );
  }
}
export default UuTien;
