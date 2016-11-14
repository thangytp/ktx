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
       'updateDiemXetDuyetSuccess'
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
    $.ajax({
      url: '/getstudent/diemxetduyet',
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

  updateDiemXetDuyet(payload) {
    $.ajax({
        url: '/upload/diemxetduyet',
        data: payload,
        processData: false,
        contentType: false,
        type: 'POST'
    })
    .done((data) => {
      this.actions.updateDiemXetDuyetSuccess();
    })
  }

  editUser(payload) {
    $.ajax({
      url: '/editstudent/' + payload.id,
      type: 'PUT',
      data: {email : payload.email, mssv : payload.mssv}
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
