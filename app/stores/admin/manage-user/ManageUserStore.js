import alt from '../../../alt';
import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';

class ManageUserStore {
  constructor() {
    this.bindActions(ManageUserAction);
    this.users = [];
  }

  onAddUserSuccess() {
    ManageUserAction.getUsers();
  }

  onGetUsersSuccess(response) {
    this.users = response;
  }

  onDeleteUserSuccess() {
    ManageUserAction.getUsers();
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

export default alt.createStore(ManageUserStore);
