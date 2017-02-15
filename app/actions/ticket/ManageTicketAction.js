import alt from '../../alt';

class ManageTicketAction {
  constructor() {
    this.generateActions(
      'getTicketSuccess',
      'getTicketByIdSuccess',
      'addTicketSuccess',
      'answerTicketSuccess',
      'changeStatusSuccess',
      'delTicketSuccess'
    );
  }

  getTicket() {
    $.ajax({
      url: '/getticket',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getTicketSuccess(data);
    })
  }

  getTicketByEmail(payload) {
    $.ajax({
      url: '/getticket/' + payload,
      type: 'GET'
    })
    .done((data) => {
      this.actions.getTicketSuccess(data);
    })
  }

  getTicketById(payload) {
    console.log(payload);
    $.ajax({
      url: '/getticketbyid/' + payload,
      type: 'GET'
    })
    .done((data) => {
      this.actions.getTicketByIdSuccess(data);
    })
  }

  delTicket(payload) {
    $.ajax({
      url: '/deleteticket/' + payload,
      type: 'DELETE'
    })
    .done((data) => {
      this.actions.delTicketSuccess();
    })
  }

  answerTicket(payload) {
    $.ajax({
      url: '/answerticket/' + payload.ticketId,
      type: 'PUT',
      data: {noidung: payload.noidung, nguoipost: payload.nguoipost}
    })
    .done((data) => {
      this.actions.answerTicketSuccess(payload.ticketId);
    })
  }

  changeStatus(payload) {
    $.ajax({
      url: '/changestatus/' + payload.ticketId,
      type: 'PUT',
      data: {trangthai: payload.trangthai}
    })
    .done((data) => {
      this.actions.changeStatusSuccess(payload.ticketId);
    })
  }

  addTicket(payload) {
    console.log('aaa');
    $.ajax({
      url: '/addticket',
      type: 'POST',
      data: payload
    })
    .done((data) => {
      this.actions.addTicketSuccess();
    })
  }
}

export default alt.createActions(ManageTicketAction);
