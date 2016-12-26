import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button, ListGroup, ListGroupItem, ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import {Link} from 'react-router';
import moment from 'moment';
import ManageTicketAction from '../../../actions/ticket/ManageTicketAction';
import ManageTicketStore from '../../../stores/ticket/ManageTicketStore';

class Xemchitietcauhoi extends Component {
  constructor(props)
	{
		super(props);
		this.state = ManageTicketStore.getState();
		this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    ManageTicketAction.getTicketById(nextProps.params.id);
  }

  componentDidMount() {
    ManageTicketStore.listen(this.onChange);
    ManageTicketAction.getTicketById(this.props.params.id);
  }

  componentWillUnmount() {
    ManageTicketStore.unlisten(this.onChange);
  }

  handleAnswerTicket(e) {

    e.preventDefault()

    const data = {
        ticketId: this.props.params.id,
				noidung: this.refs.noidung.value,
        nguoipost: localStorage.getItem('adminEmail')
    };
    ManageTicketAction.answerTicket(data);
  }

  handleSelect(e) {
    const data = {
      ticketId : this.props.params.id,
      trangthai : e.target.textContent
    }
    ManageTicketAction.changeStatus(data);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let listAnswers;
    let ticketOpenDate;
    let ticketCloseDate;
    let lastAnswer;
    if(this.state.ticket.tinnhan) {
      var length = this.state.ticket.tinnhan.length;
      lastAnswer = this.state.ticket.tinnhan[length - 1].nguoipost;
      ticketOpenDate = (moment(this.state.ticket.thoigiantao).format("DD/MM/YYYY"));
      ticketCloseDate = (moment(this.state.ticket.thoigiandong).format("DD/MM/YYYY"));
      listAnswers = this.state.ticket.tinnhan.map(function(tinnhan, index){
        if(index % 2 === 0) {
          return (
            <div className="answer-odd">
              <label className="btn-success">{tinnhan.nguoipost}</label>
              <p>{tinnhan.noidung}</p>
            </div>
          )
        } else {
          return (
            <div className="answer-even">
              <label className="btn-primary">{tinnhan.nguoipost}</label>
              <p>{tinnhan.noidung}</p>
            </div>
          )
        }
      });
    } else {
      listAnswers = '';
    }

    return (
      <div className="row nM white-bg answer-admin">
      <div className ='col-md-12'>
      <ButtonGroup>
         <DropdownButton title="Thay Đổi Trạng Thái" className="btn btn-success" onSelect={this.handleSelect.bind(this)} id="bg-justified-dropdown">
           <MenuItem eventKey="Đang Giải Quyết">Đang Giải Quyết</MenuItem>
           <MenuItem eventKey="Đóng">Đóng</MenuItem>
         </DropdownButton>
       </ButtonGroup>
      </div>
      <div className ='col-md-6'>
        <ListGroup>
          <ListGroupItem>{'Người Tạo: '+this.state.ticket.nguoitao}</ListGroupItem>
          <ListGroupItem>{'Tiêu Đề: '+this.state.ticket.tieude}</ListGroupItem>
          <ListGroupItem>{'Trạng Thái: '+this.state.ticket.trangthai}</ListGroupItem>
        </ListGroup>
      </div>
        <div className ='col-md-6'>
          <ListGroup>
            <ListGroupItem>{'Ngày Tạo: '+ticketOpenDate}</ListGroupItem>
            <ListGroupItem>{'Người trả lời mới nhất: '+ lastAnswer}</ListGroupItem>
            <ListGroupItem>{'Ngày Đóng: '+ticketCloseDate}</ListGroupItem>
          </ListGroup>
        </div>
        <div className ='col-md-12'>
          {listAnswers}
        </div>
        <div className ='col-md-12'>
        <form className="form-horizontal" encType="multipart/form-data" onSubmit={this.handleAnswerTicket.bind(this)}>
            <div className='form-group '>
                <div className ='col-sm-12'>
                  <textarea id ='ckedit' className="ckedit-answer" ref ='noidung' required ></textarea>
              </div>
            </div>
            <div className='form-group'>
                <button className="btn btn-success btn-large" type="submit">Trả Lời</button>
            </div>
        </form>
        </div>
      </div>
    );
  }
}
export default Xemchitietcauhoi;
