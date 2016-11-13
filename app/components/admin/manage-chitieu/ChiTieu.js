import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import ManageChiTieuAction from '../../../actions/admin/manage-chitieu/ManageChiTieuAction';
import ManageChiTieuStore from '../../../stores/admin/manage-chitieu/ManageChiTieuStore';

const AddUserModal = React.createClass({

  handleAddUser(e) {

    e.preventDefault()
    const data = {
        nam: this.refs.nam.value,
        nam1: this.refs.nam1.value,
        nam2: this.refs.nam2.value,
        nam3: this.refs.nam3.value,
        nam4: this.refs.nam4.value,
        nam5: this.refs.nam5.value,
        nam6: this.refs.nam6.value,
        diemcb1: this.refs.diemcoban1.value,
        diemcb2: this.refs.diemcoban2.value,
        diemcb3: this.refs.diemcoban3.value,
        diemcb4: this.refs.diemcoban4.value,
        diemcb5: this.refs.diemcoban5.value,
        diemcb6: this.refs.diemcoban6.value

    };
    ManageChiTieuAction.addChiTieu(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleAddUser.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Năm</label>
              <input type="text" className="form-control" ref="nam" placeholder="Năm" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu năm 1</label>
              <input type="text" className="form-control" ref="nam1" placeholder="Năm 1" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Cơ Bản năm 1</label>
              <input type="number" className="form-control" ref="diemcoban1" placeholder="Điểm Cơ Bản Năm 1" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu năm 2</label>
              <input type="text" className="form-control" ref="nam2" placeholder="Năm 2" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Cơ Bản năm 2</label>
              <input type="number" className="form-control" ref="diemcoban2" placeholder="Điểm Cơ Bản Năm 2" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu năm 3</label>
              <input type="text" className="form-control" ref="nam3" placeholder="Năm 3" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Cơ Bản năm 3</label>
              <input type="number" className="form-control" ref="diemcoban3" placeholder="Điểm Cơ Bản Năm 3" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu năm 4</label>
              <input type="text" className="form-control" ref="nam4" placeholder="Năm 4" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Cơ Bản năm 4</label>
              <input type="number" className="form-control" ref="diemcoban4" placeholder="Điểm Cơ Bản Năm 4" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu năm 5</label>
              <input type="text" className="form-control" ref="nam5" placeholder="Năm 5" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Cơ Bản năm 5</label>
              <input type="number" className="form-control" ref="diemcoban5" placeholder="Điểm Cơ Bản Năm 5" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu năm 6</label>
              <input type="text" className="form-control" ref="nam6" placeholder="Năm 6" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Cơ Bản năm 6</label>
              <input type="number" className="form-control" ref="diemcoban6" placeholder="Điểm Cơ Bản Năm 6" />
            </div>
            <button className="btn btn-success btn-large" type="submit">Thêm chỉ tiêu năm mới</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


class ChiTieu extends Component {
  constructor(props)
	{
		super(props);
		this.state = ManageChiTieuStore.getState();
		this.onChange = this.onChange.bind(this);
    this.state.addModalShow = false;
  }

  componentDidMount() {
    ManageChiTieuStore.listen(this.onChange);
    ManageChiTieuAction.getChitieu();
  }

  componentWillUnmount() {
    ManageChiTieuStore.unlisten(this.onChange);
  }

  handleDelChitieu(id) {
    ManageChiTieuAction.delChitieu(id);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let tabArr = this.state.chitieu.map(function(chitieu, index){
      return (
        <Tab eventKey={index + 1} title={chitieu.nam}>
        <h1>Chỉ Tiêu Ký Túc Xá Năm {chitieu.nam}</h1>
        <div className="table-responsive">
          <table className="table">
            <thead>
             <tr>
               <th>#</th>
               <th>Chỉ Tiêu</th>
               <th>Số Lượng</th>
               <th>Điểm Cơ Bản</th>
             </tr>
           </thead>
           <tbody>
            <tr>
              <td>0</td>
              <td>Năm 1</td>
              <td>{chitieu.nam1.soluong}</td>
              <td>{chitieu.nam1.diemcoban}</td>

            </tr>
            <tr>
              <td>1</td>
              <td>Năm 2</td>
              <td>{chitieu.nam2.soluong}</td>
              <td>{chitieu.nam2.diemcoban}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Năm 3</td>
              <td>{chitieu.nam3.soluong}</td>
              <td>{chitieu.nam3.diemcoban}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Năm 4</td>
              <td>{chitieu.nam4.soluong}</td>
              <td>{chitieu.nam4.diemcoban}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Năm 5</td>
              <td>{chitieu.nam5.soluong}</td>
              <td>{chitieu.nam5.diemcoban}</td>
            </tr>
            <tr>
              <td>0</td>
              <td>Năm 6</td>
              <td>{chitieu.nam6.soluong}</td>
              <td>{chitieu.nam6.diemcoban}</td>
            </tr>
           </tbody>
          </table>
        </div>
        <button className="btn btn-large btn-danger" onClick={this.handleDelChitieu.bind(this, chitieu._id)}>Xóa</button>

        </Tab>
      )
    }, this);

    let addModalClose = () => this.setState({ addModalShow: false });


    return (
      <div>
      <Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
        Thêm Chỉ Tiêu Năm Mới
      </Button>
      <AddUserModal show={this.state.addModalShow} onHide={addModalClose} />
      <Tabs defaultActiveKey={1} id="chitieu">
        {tabArr}
      </Tabs>
      </div>
    );
  }
}
export default ChiTieu;
