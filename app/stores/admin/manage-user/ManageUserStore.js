import alt from '../../../alt';
import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import localStorage from 'localStorage';


class ManageUserStore {
  constructor() {
    this.bindActions(ManageUserAction);
    this.users = [];
    this.user = {};
    if(localStorage.getItem('deactiveStep2')) {
      this.deactiveStep2 = false;
    } else {
      this.deactiveStep2 = true;
    }

    if(localStorage.getItem('deactiveStep2')) {
      this.deactiveStep3 = false;
    } else {
      this.deactiveStep3 = true;
    }

  }

  onAddUserSuccess() {
    ManageUserAction.getUsers();
  }

  onGetUsersSuccess(response) {
    this.users = response;
  }

  onGetUserSuccess(response) {
    this.user = response;
  }

  onDeleteUserSuccess() {
    ManageUserAction.getUsers();
  }

  onEditUserSuccess() {
    ManageUserAction.getUsers();
  }

  onImportUserSuccess() {
    ManageUserAction.getUsers();
  }

  onUpdateHocVuSuccess() {
    ManageUserAction.getUsersByHocVu();
    localStorage.setItem('deactiveStep2', false);
    this.deactiveStep2 = false;
  }

  onUpdateDiemRenLuyenSuccess() {
    ManageUserAction.getUsersByDiemRenLuyen(75);
    localStorage.setItem('deactiveStep3', false);
    this.deactiveStep3 = false;
  }

  updateXetDuyetSuccess(payload) {
    ManageUserAction.getUsersByDiemXetDuyet(payload);
    localStorage.setItem('deactiveStep3', false);
    this.deactiveStep3 = false;
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
