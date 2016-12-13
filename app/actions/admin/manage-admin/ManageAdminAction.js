import alt from '../../../alt';

class ManageAdminAction {
  constructor() {
    this.generateActions(
      'addAdminSuccess',
      'getAdminSuccess',
      'delAdminSuccess',

      'closeModal',
      'handleGetAdmin',

      'openMoDDeleteAdmin',
      'closeModalDelete'
    );
  }

  openMoDDeleteAdmin(id){
    this.actions.openMoDDeleteAdmin(id);
  }

  handleGetAdmin(payload){
    this.actions.handleGetAdmin(payload);
  }

  getAdmin() {
    $.ajax({
      url: '/getadmin',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getAdminSuccess(data);
    })
  }

  delAdmin(payload) {
    $.ajax({
      url: '/deleteadmin/' + payload,
      type: 'DELETE'
    })
    .done((data) => {
      this.actions.delAdminSuccess();
    })
  }

  addAdmin(payload) {
    $.ajax({
      url: '/addadmin',
      type: 'POST',
      data: payload
    })
    .done((data) => {
      this.actions.addAdminSuccess();
    })
  }
}

export default alt.createActions(ManageAdminAction);
