import alt from '../../../alt';

class ManageUserAction {
  constructor() {
    this.generateActions(
       'importUserSuccess',
       'getUsersSuccess',
       'getUserSuccess',
       'addUserSuccess',
       'deleteUserSuccess',
       'editUserSuccess',
       'updateHocVuSuccess',
       'updateDiemRenLuyenSuccess',
       'updateXetDuyetSuccess'
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

  getUsersByHocVu() {
    $.ajax({
      url: '/getstudenthocvu',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getUsersSuccess(data);
    })
  }

  getUsersByDiemRenLuyen(payload) {
    $.ajax({
      url: '/getstudent/diem/' + payload,
      type: 'GET'
    })
    .done((data) => {
      this.actions.getUsersSuccess(data);
    })
  }

  getUsersByDiemXetDuyet(payload) {
    console.log(payload);
    $.ajax({
      url: '/getstudent/diemxetduyet/' + payload.soluong + '/' + payload.nam,
      type: 'GET'
    })
    .done((data) => {
      this.actions.getUsersSuccess(data);
    })
  }

  getUser(payload) {
    $.ajax({
      url: '/getstudent/' + payload,
      type: 'GET'
    })
    .done((data) => {
      this.actions.getUserSuccess(data);
    })
  }

  addUser(payload) {
    $.ajax({
      url: '/addstudent',
      type: 'POST',
      data: {email : payload.email, mssv : payload.mssv}
    })
    .done((data) => {
      this.actions.addUserSuccess();
    })
  }

  importUser(payload) {
    $.ajax({
        url: '/upload',
        data: payload,
        processData: false,
        contentType: false,
        type: 'POST'
    })
    .done((data) => {
      this.actions.importUserSuccess();
    })
  }

  updateHocVu(payload) {
    $.ajax({
        url: '/upload/xulyhocvu',
        data: payload,
        processData: false,
        contentType: false,
        type: 'POST'
    })
    .done((data) => {
      this.actions.updateHocVuSuccess();
    })
  }

  updateDiemRenLuyen(payload) {
    $.ajax({
        url: '/upload/diemrenluyen',
        data: payload,
        processData: false,
        contentType: false,
        type: 'POST'
    })
    .done((data) => {
      this.actions.updateDiemRenLuyenSuccess();
    })
  }

  updateXetDuyet(payload) {
    $.ajax({
        url: '/diemxetduyet',
        data: {soluong : payload.soluong, diemcb : payload.diemcb, nam : payload.nam},
        type: 'PUT'
    })
    .done((data) => {
      this.actions.updateXetDuyetSuccess({soluong : payload.soluong, nam : payload.nam});
    })
  }

  editUser(payload) {
    console.log(payload.hoancanh);
    $.ajax({
      url: '/editstudent/' + payload.id,
      type: 'PUT',
      data: {email : payload.email, khuvuc : payload.khuvuc, tinh : payload.tinh, doituong : payload.doituong, hocluc : payload.hocluc, hoancanh : payload.hoancanh}
    })
    .done((data) => {
      this.actions.editUserSuccess();
    })
  }

  deleteUser(payload) {
    $.ajax({
      url: '/deletestudent/' + payload,
      type: 'DELETE',
    })
    .done((data) => {
      this.actions.deleteUserSuccess();
    })
  }

}

export default alt.createActions(ManageUserAction);
