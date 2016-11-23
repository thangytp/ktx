import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import ManageChiTieuAction from '../../../actions/admin/manage-chitieu/ManageChiTieuAction';
import ManageChiTieuStore from '../../../stores/admin/manage-chitieu/ManageChiTieuStore';

const AddUserModal = React.createClass({

  handleAddUser(e) {

    e.preventDefault()
    const data = {
        nam: this.refs.nam.value,
        namnam1: this.refs.namnam1.value,
        nunam1: this.refs.nunam1.value,
        namnam2: this.refs.namnam2.value,
        nunam2: this.refs.nunam2.value,
        namnam3: this.refs.namnam3.value,
        nunam3: this.refs.nunam3.value,
        namnam4: this.refs.namnam4.value,
        nunam4: this.refs.nunam4.value,
        namnam5: this.refs.namnam5.value,
        nunam5: this.refs.nunam5.value,
        namnam6: this.refs.namnam6.value,
        nunam6: this.refs.nunam6.value,
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
              <label for="exampleInputEmail1">Chỉ tiêu nam năm 1</label>
              <input type="text" className="form-control" ref="namnam1" placeholder="Chỉ Tiêu Nam Năm 1" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu nữ năm 1</label>
              <input type="text" className="form-control" ref="nunam1" placeholder="Chỉ Tiêu Nữ Năm 1" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Cơ Bản năm 1</label>
              <input type="number" className="form-control" ref="diemcoban1" placeholder="Điểm Cơ Bản Năm 1" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu nam năm 2</label>
              <input type="text" className="form-control" ref="namnam2" placeholder="Chỉ Tiêu Nam Năm 2" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu nữ năm 2</label>
              <input type="text" className="form-control" ref="nunam2" placeholder="Chỉ Tiêu Nữ Năm 2" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Cơ Bản năm 2</label>
              <input type="number" className="form-control" ref="diemcoban2" placeholder="Điểm Cơ Bản Năm 2" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu nam năm 3</label>
              <input type="text" className="form-control" ref="namnam3" placeholder="Chỉ Tiêu Nam Năm 3" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu nữ năm 3</label>
              <input type="text" className="form-control" ref="nunam3" placeholder="Chỉ Tiêu Nữ Năm 3" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Cơ Bản năm 3</label>
              <input type="number" className="form-control" ref="diemcoban3" placeholder="Điểm Cơ Bản Năm 3" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu nam năm 4</label>
              <input type="text" className="form-control" ref="namnam4" placeholder="Chỉ Tiêu Nam Năm 4" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu nữ năm 4</label>
              <input type="text" className="form-control" ref="nunam4" placeholder="Chỉ Tiêu Nữ Năm 4" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Cơ Bản năm 4</label>
              <input type="number" className="form-control" ref="diemcoban4" placeholder="Điểm Cơ Bản Năm 4" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu nam năm 5</label>
              <input type="text" className="form-control" ref="namnam5" placeholder="Chỉ Tiêu Nam Năm 5" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu nữ năm 5</label>
              <input type="text" className="form-control" ref="nunam5" placeholder="Chỉ Tiêu Nữ Năm 5" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Điểm Cơ Bản năm 5</label>
              <input type="number" className="form-control" ref="diemcoban5" placeholder="Điểm Cơ Bản Năm 5" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu nam năm 6</label>
              <input type="text" className="form-control" ref="namnam6" placeholder="Chỉ Tiêu Nam Năm 6" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Chỉ tiêu nữ năm 4</label>
              <input type="text" className="form-control" ref="nunam6" placeholder="Chỉ Tiêu Nữ Năm 6" />
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
               <th>Nam</th>
               <th>Nữ</th>
               <th>Điểm Cơ Bản</th>
             </tr>
           </thead>
           <tbody>
            <tr>
              <td>0</td>
              <td>Năm 1</td>
              <td>{chitieu.nam1.male}</td>
              <td>{chitieu.nam1.female}</td>
              <td>{chitieu.nam1.diemcoban}</td>

            </tr>
            <tr>
              <td>1</td>
              <td>Năm 2</td>
              <td>{chitieu.nam2.male}</td>
              <td>{chitieu.nam2.female}</td>
              <td>{chitieu.nam2.diemcoban}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Năm 3</td>
              <td>{chitieu.nam3.male}</td>
              <td>{chitieu.nam3.female}</td>
              <td>{chitieu.nam3.diemcoban}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Năm 4</td>
              <td>{chitieu.nam4.male}</td>
              <td>{chitieu.nam4.female}</td>
              <td>{chitieu.nam4.diemcoban}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Năm 5</td>
              <td>{chitieu.nam5.male}</td>
              <td>{chitieu.nam5.female}</td>
              <td>{chitieu.nam5.diemcoban}</td>
            </tr>
            <tr>
              <td>0</td>
              <td>Năm 6</td>
              <td>{chitieu.nam6.male}</td>
              <td>{chitieu.nam6.female}</td>
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
