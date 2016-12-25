import alt from '../../alt';
import ManageTicketAction from '../../actions/ticket/ManageTicketAction';
import localStorage from 'localStorage';


class ManageTicketStore {
  constructor() {
    this.bindActions(ManageTicketAction);
    this.tickets = [];
    this.ticket = {};
  }

  onGetTicketSuccess(response) {
    this.setState({tickets: response});
  }

  onGetTicketByIdSuccess(response) {
    this.ticket = response;
  }

  onAddTicketSuccess() {
    ManageTicketAction.getTicket();
  }

  onAnswerTicketSuccess(id) {
    ManageTicketAction.getTicketById(id);
  }

  onDelTicketSuccess() {
    ManageTicketAction.getTicket();
  }
  // onUpdateuser(event)
  // {
  // 	this.user = event.target.value;
  //    this.helpBlock='';
  // }
  // onUpdatepassword(event)
  // {
  // 	this.password = event.target.value;
  //   this.helpBlock='';
  // }
  // onSetOpenModal(boolean)
  // {
  //     this.LoginModalisOpen = boolean;
  //     this.user ='';
  //     this.password ='';
  // }
}

export default alt.createStore(ManageTicketStore);
