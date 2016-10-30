import alt from '../../../alt';

class ManageUserAction {
  constructor() {
    this.generateActions(
       'getUsersSuccess',
       'addUserSuccess',
       'deleteUserSuccess'
    );
  }

  getUsers() {
    $.ajax({
      url: '/getstudent',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getUsersSuccess(data);
    })
  }

  addUser(payload) {
    $.ajax({
      url: '/addstudent',
      type: 'POST',
      data: {email : payload.email, password : payload.password, code : payload.code}
    })
    .done((data) => {
      this.actions.addUserSuccess();
    })
  }

}

export default alt.createActions(ManageUserAction);
