import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import moment from 'moment';

import ManageTicketAction from '../../../actions/ticket/ManageTicketAction';
import ManageTicketStore from '../../../stores/ticket/ManageTicketStore';
import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import ManageUserStore from '../../../stores/admin/manage-user/ManageUserStore';

const AddTangModal = React.createClass({

  handleAddTicket(e) {

    e.preventDefault()
    const data = {
        tieude: this.refs.tieude.value,
				noidung: this.refs.noidung.value,
				nguoitao: localStorage.getItem('email'),
        phong: this.props._phongchitiet_id.ma
    };
    console.log(data);
    ManageTicketAction.addTicket(data);
  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Thêm Câu Hỏi Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
				<form className="form-horizontal" encType="multipart/form-data" onSubmit={this.handleAddTicket.bind(this)}>
							<div className="form-group">
								<label className="col-sm-2" htmlFor="name-item">Tiêu đề:</label>
								<div className="col-sm-10">
										<input type="text" className="form-control" id="name-item" placeholder=""
											ref="tieude" required />
								</div>
							</div>

						<div className='form-group '>
									<label className='col-sm-2'>Nội dung:</label>
										<div  className ='col-sm-10'>
											<textarea id ='ckedit'  rows="10" cols="100" ref ='noidung' required ></textarea>
									</div>
								</div>
						<div className='form-group'>
							<div  className ='col-sm-offset-2'>
								<button className="btn btn-success btn-large" type="submit" >Thêm Câu Hỏi Mới</button>
							</div>
						</div>
				</form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

class Ticket extends React.Component {
	constructor(props)
  {
    super(props);
		this.state = {state1: ManageTicketStore.getState(), state2: ManageUserStore.getState()};
    this.onChange = this.onChange.bind(this);
		this.state.addModalShow = false;
  }
  componentDidMount() {
    let userEmail = localStorage.getItem('email');
    if(!userEmail){
      window.location.href="/login";
    }
		ManageTicketStore.listen(this.onChange);
    ManageUserStore.listen(this.onChange);
		ManageTicketAction.getTicket();
    ManageUserAction.getUserByEmail(userEmail);
  }

  componentDidUpdate() {
    ManageTicketAction.getTicket();
  }

  componentWillUnmount() {
		ManageTicketStore.unlisten(this.onChange);
    ManageUserStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState({state1: ManageTicketStore.getState(), state2: ManageUserStore.getState()});
  }
  render(){

		let listTickets = this.state.state1.tickets.map(function(ticket, index){
      let classBtn;
      let ticketOpenDate = (moment(ticket.thoigiantao).format("DD/MM/YYYY"));
      if(ticket.trangthai === 'Đang Chờ') {
        classBtn = 'btn btn-warning';
      } else if(ticket.trangthai === 'Đang Giải Quyết') {
        classBtn = 'btn btn-primary';
      } else if(ticket.trangthai === 'Đóng') {
        classBtn = 'btn btn-danger';
      }
      return (
        <tr>
        <th scope="row">{index + 1}</th>
        <td>{ticket.tieude}</td>
        <td><button className={classBtn}>{ticket.trangthai}</button></td>
				<td>{ticketOpenDate}</td>
        <td><Link to={'/cau-hoi/'+ticket._id}  title={ticket.tieude} className="btn btn-primary">Xem chi tiết</Link></td>
        </tr>
      )
    });

		let addModalClose = () => this.setState({ addModalShow: false });
    const props = this.state.state2.user;

		return(
			<div className="container info-page">
				<ol className="breadcrumb">
						<li><Link to="/">Trang chủ</Link></li>
						<li className="active">Báo hỏng vật dụng</li>
				</ol>
				<div className="row nM white-bg answer-admin">
				<Button bsStyle="primary" onClick={()=>this.setState({ addModalShow: true })}>
					Thêm Câu Hỏi Mới
				</Button>
				<AddTangModal {...props} show={this.state.addModalShow} onHide={addModalClose} />
				<div className="table-responsive">
					<table className="table white-bg table-success">
						<thead>
						 <tr>
							 <th>STT</th>
							 <th>Tiêu Đề</th>
							 <th>Trạng Thái</th>
							 <th>Thời Gian Tạo</th>
               <th></th>
							 </tr>
						 </thead>
						 <tbody>
							{listTickets}
						 </tbody>
					</table>
				</div>
				</div>
			</div>
			);
		}
}
export default Ticket;
