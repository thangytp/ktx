import React, { Component } from 'react';
import {Tabs, Tab, Modal, Button, Panel} from 'react-bootstrap';
import {Link} from 'react-router';

import ManageTicketAction from '../../../actions/ticket/ManageTicketAction';
import ManageTicketStore from '../../../stores/ticket/ManageTicketStore';

class Ticket extends React.Component {
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
    let userEmail = localStorage.getItem('email');
    if(!userEmail){
      window.location.href="/login";
    }
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
				nguoipost: this.state.ticket.nguoitao
    };
    ManageTicketAction.answerTicket(data);
  }

  onChange(state) {
    this.setState(state);
  }
  render(){
		let listAnswers;
    if(this.state.ticket.tinnhan) {
      listAnswers = this.state.ticket.tinnhan.map(function(tinnhan, index){
        return (
          <div>
            <label>{tinnhan.nguoipost}</label>
            <Panel>{tinnhan.noidung}</Panel>
          </div>
        )
      });
    } else {
      listAnswers = '';
    }

		return(
			<div className="container info-page">
				<ol className="breadcrumb">
						<li><Link to="/">Trang chủ</Link></li>
						<li className="active">Báo hỏng vật dụng</li>
				</ol>
				<div className="row nM white-bg">
          {listAnswers}
          <form className="form-horizontal" encType="multipart/form-data" onSubmit={this.handleAnswerTicket.bind(this)}>
  						<div className='form-group '>
									<div  className ='col-sm-12'>
										<textarea id ='ckedit'  rows="10" cols="100" ref ='noidung' ></textarea>
								</div>
							</div>
  						<div className='form-group'>
  							<div  className ='col-sm-offset-2'>
  								<button className="btn btn-success btn-large" type="submit">Trả Lời</button>
  							</div>
  						</div>
  				</form>
				</div>
			</div>
			);
		}
}
export default Ticket;
