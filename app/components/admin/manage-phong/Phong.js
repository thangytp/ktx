import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import ManagePhongAction from '../../../actions/admin/manage-phong/ManagePhongAction';
import ManagePhongStore from '../../../stores/admin/manage-phong/ManagePhongStore';

const AddPhongModal = React.createClass({

  handleAddPhong(e) {

    e.preventDefault()
    const data = {
        ten: this.refs.ten.value,
        loai: this.refs.loai.value,
        gia: this.refs.gia.value,
        kichco: this.refs.songuoi.value,
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
            <label htmlFor="ten-phong">Tên Phòng</label>
            <input type="text" id="ten-phong" className="form-control" ref="ten" placeholder="Tên Phòng" />
          </div>
          <div className="form-group">
            <label htmlFor="loai-phong">Loại Phòng</label>
            <input type="number" id="loai-phong" className="form-control" ref="loai" placeholder="Loại Phòng" />
            <div className="">1: Phòng thường, 2: Phòng dịch vụ tầng 10, 3: Phòng tầng 11, 4: Phòng tầng 12</div>
          </div>
          <div className="form-group">
            <label htmlFor="gia">Giá</label>
            <input type="number" className="form-control" ref="gia" placeholder="Giá" />
          </div>
          <div className="form-group">
            <label htmlFor="so-nguoi">Số người</label>
            <input type="Number" id="so-nguoi" className="form-control" ref="songuoi" placeholder="Số người" />
          </div>
          <div className="form-group">
            <label htmlFor="so-luong">Số Lượng</label>
            <input type="Number" id="so-luong" className="form-control" ref="soluong" placeholder="Số Lượng" />
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
        <td>{phong.ten}</td>
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
                <th>STT</th>
                <th>Tên</th>
                <th>Loại Phòng</th>
                <th>Gía</th>
                <th>Kích Cỡ</th>
                <th>Số Lượng</th>
                <th>Hành động</th>
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
