import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import moment from 'moment';
import ManageTicketAction from '../../../actions/ticket/ManageTicketAction';
import ManageTicketStore from '../../../stores/ticket/ManageTicketStore';

class Quanlycauhoi extends Component {
  constructor(props)
	{
		super(props);
		this.state = ManageTicketStore.getState();
		this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ManageTicketStore.listen(this.onChange);
    ManageTicketAction.getTicket();
  }

  componentDidUpdate() {
    ManageTicketAction.getTicket();
  }

  handleDelTicket(id) {
    ManageTicketAction.delTicket(id);
  }

  componentWillUnmount() {
    ManageTicketStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let listTickets = this.state.tickets.map(function(ticket, index){
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
        <td>{ticket.nguoitao}</td>
        <td>{ticket.phong}</td>
        <td>{ticket.tieude}</td>
        <td><button className={classBtn}>{ticket.trangthai}</button></td>
				<td>{ticketOpenDate}</td>
        <td><Link to={'/quanly@ktx/quan-ly-cau-hoi/'+ticket._id}  title={ticket.tieude} className="btn btn-primary">Xem chi tiết</Link></td>
        <td><button className="btn btn-danger" onClick={this.handleDelTicket.bind(this, ticket._id)}><i className="fa fa-trash-o"></i></button></td>
        </tr>
      )
    }, this);

    return (
      <div>
      <h2>Danh sách các câu hỏi của bạn</h2>
      <div className="table-responsive">
        <table className="table white-bg table-striped table-hover table-success">
          <thead>
           <tr>
             <th>STT</th>
             <th>Người Tạo</th>
             <th>Phòng</th>
             <th>Tiêu Đề</th>
             <th>Trạng Thái</th>
             <th>Thời Gian Tạo</th>
             <th></th>
             <th></th>
             </tr>
           </thead>
           <tbody>
            {listTickets}
           </tbody>
        </table>
      </div>
      </div>
    );
  }
}
export default Quanlycauhoi;
