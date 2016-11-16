import alt from '../../../alt';
import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import localStorage from 'localStorage';


class ManageUserStore {
  constructor() {
    this.bindActions(ManageUserAction);
    this.users = [];
    this.usersehv = [];
    this.usershv = [];
    this.usersedrl = [];
    this.usersdrl = [];
    this.usersdxd = [];
    this.usershvloai = [];
    this.usersdrlloai = [];
    this.activeHocvu = false;
    this.activeDiemrenluyen = false;
    this.activeDiemxetduyet = false;
    this.deactiveStep2 = true;
    this.deactiveStep3 = true;
    this.user = {};
    // if(localStorage.getItem('deactiveStep2')) {
    //   this.deactiveStep2 = false;
    // } else {
    //   this.deactiveStep2 = true;
    // }
    //
    // if(localStorage.getItem('deactiveStep2')) {
    //   this.deactiveStep3 = false;
    // } else {
    //   this.deactiveStep3 = true;
    // }

  }

  onAddUserSuccess() {
    ManageUserAction.getUsers();
  }

  onGetUsersSuccess(response) {
    this.users = response;
  }

  onGetUsersByDiemXetDuyetSuccess(response) {
    this.usersdxd = response;
  }

  onGetUsersByDiemRenLuyenSuccess(response) {
    this.usersdrl = response;
    var users1 = this.usershv,
        users2 = response;

    var uniqueResultOne = users1.filter(function(obj) {
      return !users2.some(function(obj2) {
          return obj.ma_sinh_vien == obj2.ma_sinh_vien;
      });
    });

    var uniqueResultTwo = users2.filter(function(obj) {
        return !users1.some(function(obj2) {
            return obj.ma_sinh_vien == obj2.ma_sinh_vien;
        });
    });

    var result = uniqueResultOne.concat(uniqueResultTwo);
    this.usersdrloai = result;
  }

  onGetUsersByHocVuSuccess(response) {
    this.usershv = response;
    var users1 = this.users,
        users2 = response;

    var uniqueResultOne = users1.filter(function(obj) {
      return !users2.some(function(obj2) {
          return obj.ma_sinh_vien == obj2.ma_sinh_vien;
      });
    });

    var uniqueResultTwo = users2.filter(function(obj) {
        return !users1.some(function(obj2) {
            return obj.ma_sinh_vien == obj2.ma_sinh_vien;
        });
    });

    var result = uniqueResultOne.concat(uniqueResultTwo);
    this.usershvloai = result;
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

  onUpdateHocVuSuccess(data) {
    this.usersehv = data;
    ManageUserAction.getUsersByHocVu();
    // localStorage.setItem('deactiveStep2', false);
    // localStorage.setItem('activeHocvu', true);
    this.activeHocvu = true;
    this.deactiveStep2 = false;
  }

  onUpdateDiemRenLuyenSuccess(data) {
    this.usersedrl = data;
    ManageUserAction.getUsersByDiemRenLuyen(75);
    // localStorage.setItem('deactiveStep3', false);
    // localStorage.setItem('activeDiemrenluyen', true);
    this.activeDiemrenluyen = true;
    this.deactiveStep3 = false;
  }

  updateXetDuyetSuccess(payload) {
    ManageUserAction.getUsersByDiemXetDuyet(payload);
    // localStorage.setItem('deactiveStep3', false);
    this.activeDiemxetduyet = true;
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
