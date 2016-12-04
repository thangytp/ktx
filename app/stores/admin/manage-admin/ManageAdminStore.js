import alt from '../../../alt';
import ManageAdminAction from '../../../actions/admin/manage-admin/ManageAdminAction';
import localStorage from 'localStorage';


class ManageAdminStore {
  constructor() {
    this.bindActions(ManageAdminAction);
    this.admin = [];
  }

  onGetAdminSuccess(response) {
    this.admin = response;
  }

  onAddAdminSuccess() {
    ManageAdminAction.getAdmin();
  }

  onDelAdminSuccess() {
    ManageAdminAction.getAdmin();
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

export default alt.createStore(ManageAdminStore);
