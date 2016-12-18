import alt from '../../alt';

class ManageTicketAction {
  constructor() {
    this.generateActions(
      'getTicketSuccess',
      'getTicketByIdSuccess',
      'addTicketSuccess',
      'answerTicketSuccess',
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

  getTicketById(payload) {
    $.ajax({
      url: '/getticket/' + payload,
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

  addTicket(payload) {
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
