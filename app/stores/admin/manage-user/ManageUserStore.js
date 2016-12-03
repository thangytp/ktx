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
    this.usersehvgh = [];
    this.usershvgh = [];
    this.usersedrlgh = [];
    this.usersdrlgh = [];
    this.usersdxdgh = [];
    this.usershvloaigh = [];
    this.usersdrlloaigh = [];
    this.usersedrlktx = [];
    this.usersdrlktx = [];
    this.usersdrlktxloai = [];
    this.usersxd = [];
    this.usersgh = [];
    this.activeHocvu = false;
    this.activeDiemrenluyen = false;
    this.activeDiemrenluyenKtx = false;
    this.activeDiemxetduyet = false;
    this.deactiveStep2 = true;
    this.deactiveStep3 = true;
    this.user = {};
    this.inputdrl = null;
    this.inputdrlktx = null;
    this.inputdvs = null;
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

  getUsersByGiaHanThanhCongSuccess(response) {
    this.usersgh = response;
  }

  getUsersByXetDuyetThanhCongSuccess(response) {
    this.usersxd = response;
  }

  getUsersByDiemXetDuyetGiaHanSuccess(response) {
    console.log(response);
    this.usersdxdgh = response;
  }

  getUsersByDiemXetDuyetXetDuyetSuccess(response) {
    this.usersdxd = response;
  }
  onGetUsersByDiemRenLuyenKtxSuccess(response) {
    this.usersdrlktx = response;
    var users1 = this.usersdrlgh,
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
    this.usersdrlktxloai = result;
  }

  onGetUsersByDiemRenLuyenXetDuyetSuccess(response) {
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
    this.usersdrlloai = result;
  }

  onGetUsersByDiemRenLuyenGiaHanSuccess(response) {
    this.usersdrlgh = response;
    var users1 = this.usershvgh,
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
    this.usersdrlloaigh = result;
  }

  onGetUsersByHocVuXetDuyetSuccess(response) {
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

  onGetUsersByHocVuGiaHanSuccess(response) {
    this.usershvgh = response;
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
    this.usershvloaigh = result;
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
  onUpdateInfoKtxSuccess(data){
    if(data == undefined) {
      ManageUserAction.getUsersByGiaHanThanhCong();
    } else {
      ManageUserAction.getUsersByXetDuyetThanhCong();
    }
  }

  onImportUserSuccess() {
    ManageUserAction.getUsers();
  }

  onUpdateHocVuXetDuyetSuccess(data) {
    this.usersehv = data;
    ManageUserAction.getUsersByHocVuXetDuyet();
    // localStorage.setItem('deactiveStep2', false);
    // localStorage.setItem('activeHocvu', true);
    this.activeHocvu = true;
    this.deactiveStep2 = false;
  }

  onUpdateHocVuGiaHanSuccess(data) {
    this.usersehvgh = data;
    ManageUserAction.getUsersByHocVuGiaHan();
    // localStorage.setItem('deactiveStep2', false);
    // localStorage.setItem('activeHocvu', true);
    this.activeHocvu = true;
    this.deactiveStep2 = false;
  }

  onUpdateDiemRenLuyenXetDuyetSuccess(data) {
    this.usersedrl = data.eusers;
    ManageUserAction.getUsersByDiemRenLuyenXetDuyet(data.drl);
    this.inputdrl = data.drl;
    this.activeDiemrenluyen = true;
    this.deactiveStep3 = false;
  }

  onUpdateDiemRenLuyenGiaHanSuccess(data) {
    this.usersedrlgh = data.eusers;
    ManageUserAction.getUsersByDiemRenLuyenGiaHan(data.drl);
    this.inputdrl = data.drl;
    this.activeDiemrenluyen = true;
    this.deactiveStep3 = false;
  }

  onUpdateDiemRenLuyenKtxSuccess(data) {
    this.usersedrlktx = data.eusers;
    ManageUserAction.getUsersByDiemRenLuyenKtx({drl : this.inputdrl, drlktx : data.drlktx, dvs: data.dvs});
    this.inputdrlktx = data.drlktx;
    this.inputdvs = data.dvs;
    this.activeDiemrenluyenKtx = true;
    this.deactiveStep3 = false;
  }

  onUpdateXetDuyetXetDuyetSuccess(payload) {
    ManageUserAction.getUsersByDiemXetDuyetXetDuyet(payload);
    // localStorage.setItem('deactiveStep3', false);
    this.activeDiemxetduyet = true;
  }

  onUpdateXetDuyetGiaHanSuccess(payload) {
    ManageUserAction.getUsersByDiemXetDuyetGiaHan(payload);
    // localStorage.setItem('deactiveStep3', false);
    this.activeDiemxetduyet = true;
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
