import alt from '../../../alt';

class ManageAdminAction {
  constructor() {
    this.generateActions(
      'addAdminSuccess',
      'getAdminSuccess',
      'delAdminSuccess'
    );
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
