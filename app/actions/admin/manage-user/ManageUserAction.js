import alt from '../../../alt';

class ManageUserAction {
  constructor() {
    this.generateActions(
       'importUserSuccess',
       'getUsersSuccess',
       'getUserSuccess',
       'getUsersByDiemXetDuyetXetDuyetSuccess',
       'getUsersByDiemXetDuyetGiaHanSuccess',
       'getUsersByDiemRenLuyenXetDuyetSuccess',
       'getUsersByDiemRenLuyenGiaHanSuccess',
       'getUsersByDiemRenLuyenKtxSuccess',
       'getUsersByHocVuXetDuyetSuccess',
       'getUsersByHocVuGiaHanSuccess',
       'getUsersByXetDuyetThanhCongSuccess',
       'getUsersByGiaHanThanhCongSuccess',
       'addUserSuccess',
       'deleteUserSuccess',
       'editUserSuccess',
       'updateHocVuXetDuyetSuccess',
       'updateHocVuGiaHanSuccess',
       'updateDiemRenLuyenXetDuyetSuccess',
       'updateDiemRenLuyenGiaHanSuccess',
       'updateDiemRenLuyenKtxSuccess',
       'updateXetDuyetXetDuyetSuccess',
       'updateXetDuyetGiaHanSuccess',
       'updateInfoKtxSuccess',

        'updateHoLot',
        'updateTen',
        'updateGioiTinh',
        'updateNgaySinh',
        'updateKhoa',
        'updateHeDaoTao',
        'updateNamVaoTruong',
        'updateKhuVuc',
        'updateTinh',
        'updateDoiTuong',
        'updateTonGiao',
        'updateDoanThe',
        'updateSoCMND',
        'updateHoKhau',
        'updateDienThoaiSV',
        'updateDienThoaiGiaDinh',
        'updateEmailThuongDung',
        'updateHocLuc',
        'updateHoanCanh',
        'updateLoaiPhong',

        'updateImagepreview',
        'updateImagefile',
        'uploadSuccess',
        'uploadFail',
        'handleUpload',

        'closeModalDelete',
        'openMoDDeleteStudent'

    );
  }

  openMoDDeleteStudent(id){
    this.actions.openMoDDeleteStudent(id);
  }

  uploadImage(imgfile)
  {

    var fd = new FormData();
    fd.append( 'file', imgfile);
    console.log(fd);
    $.ajax({
        url: '/api/uploadanhtintuc',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST'
    })
    .done((data) => {
      this.actions.uploadSuccess(data.link);

    })
    .fail((jqXhr) =>{
      this.actions.uploadFail(jqXhr.responseJSON.message);
    });
  }

  updateNgaySinh(date){
      this.actions.updateNgaySinh(date);
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

  getUsersByHocVuXetDuyet() {
    $.ajax({
      url: '/xetduyet/getstudenthocvu',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getUsersByHocVuXetDuyetSuccess(data);
    })
  }

  getUsersByHocVuGiaHan() {
    $.ajax({
      url: '/giahan/getstudenthocvu',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getUsersByHocVuGiaHanSuccess(data);
    })
  }

  getUsersByXetDuyetThanhCong() {
    $.ajax({
      url: '/xetduyet/getstudentluutru',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getUsersByXetDuyetThanhCongSuccess(data);
    })
  }

  getUsersByGiaHanThanhCong() {
    $.ajax({
      url: '/giahan/getstudentluutru',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getUsersByGiaHanThanhCongSuccess(data);
    })
  }

  getUsersByDiemRenLuyenXetDuyet(payload) {
    $.ajax({
      url: '/xetduyet/getstudent/diem/' + payload,
      type: 'GET'
    })
    .done((data) => {
      this.actions.getUsersByDiemRenLuyenXetDuyetSuccess(data);
    })
  }

  getUsersByDiemRenLuyenGiaHan(payload) {
    $.ajax({
      url: '/giahan/getstudent/diem/' + payload,
      type: 'GET'
    })
    .done((data) => {
      this.actions.getUsersByDiemRenLuyenGiaHanSuccess(data);
    })
  }

  getUsersByDiemRenLuyenKtx(payload) {
    $.ajax({
      url: '/getstudent/diemktx/' + payload.drlktx + '/' + payload.dvs + '/' + payload.drl,
      type: 'GET'
    })
    .done((data) => {
      this.actions.getUsersByDiemRenLuyenKtxSuccess(data);
    })
  }

  getUsersByDiemXetDuyetXetDuyet(payload) {
    $.ajax({
      url: '/xetduyet/getstudent/diemxetduyet/' + payload.phongid + '/' + payload.soluong + '/' + payload.phai + '/' + payload.nam + '/' + payload.drl,
      type: 'GET'
    })
    .done((data) => {
      console.log(data);
      this.actions.getUsersByDiemXetDuyetXetDuyetSuccess(data);
    })
  }

  getUsersByDiemXetDuyetGiaHan(payload) {
    $.ajax({
      url: '/giahan/getstudent/diemxetduyet/' + payload.phongid + '/' + payload.soluong + '/' + payload.phai + '/' + payload.nam + '/' + payload.drl + '/' + payload.drlktx + '/' + payload.dvs,
      type: 'GET'
    })
    .done((data) => {
      this.actions.getUsersByDiemXetDuyetGiaHanSuccess(data);
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

  updateHocVuXetDuyet(payload) {
    $.ajax({
        url: '/upload/xetduyet/xulyhocvu',
        data: payload,
        processData: false,
        contentType: false,
        type: 'POST'
    })
    .done((data) => {
      this.actions.updateHocVuXetDuyetSuccess(data);
    })
  }

  updateHocVuGiaHan(payload) {
    $.ajax({
        url: '/upload/giahan/xulyhocvu',
        data: payload,
        processData: false,
        contentType: false,
        type: 'POST'
    })
    .done((data) => {
      this.actions.updateHocVuGiaHanSuccess(data);
    })
  }

  updateDiemRenLuyenXetDuyet(payload) {
    $.ajax({
        url: '/upload/xetduyet/diemrenluyen',
        data: payload.file,
        processData: false,
        contentType: false,
        type: 'POST'
    })
    .done((data) => {
      this.actions.updateDiemRenLuyenXetDuyetSuccess({eusers : data, drl : payload.drl});
    })
  }

  updateDiemRenLuyenGiaHan(payload) {
    $.ajax({
        url: '/upload/giahan/diemrenluyen',
        data: payload.file,
        processData: false,
        contentType: false,
        type: 'POST'
    })
    .done((data) => {
      this.actions.updateDiemRenLuyenGiaHanSuccess({eusers : data, drl : payload.drl});
    })
  }

  updateDiemRenLuyenKtx(payload) {
    $.ajax({
        url: '/upload/giahan/diemrenluyenktx',
        data: payload.file,
        processData: false,
        contentType: false,
        type: 'POST'
    })
    .done((data) => {
      this.actions.updateDiemRenLuyenKtxSuccess({eusers : data, drlktx : payload.drlktx, dvs : payload.dvs});
    })
  }

  updateXetDuyetXetDuyet(payload) {
    $.ajax({
        url: '/xetduyet/diemxetduyet',
        data: {phongid: payload.phongid, soluong : payload.soluong, phai: payload.phai, diemcb : payload.diemcb, nam : payload.nam, drl : payload.drl},
        type: 'PUT'
    })
    .done((data) => {
      this.actions.updateXetDuyetXetDuyetSuccess({phongid: payload.phongid, soluong : payload.soluong, phai: payload.phai, nam : payload.nam, drl : payload.drl});
    })
  }

  updateXetDuyetGiaHan(payload) {
    $.ajax({
        url: '/giahan/diemxetduyet',
        data: {phongid: payload.phongid, soluong : payload.soluong, phai: payload.phai, diemcb : payload.diemcb, nam : payload.nam, drl : payload.drl, drlktx : payload.drlktx, dvs : payload.dvs},
        type: 'PUT'
    })
    .done((data) => {
      this.actions.updateXetDuyetGiaHanSuccess({phongid: payload.phongid, soluong : payload.soluong, phai: payload.phai, nam : payload.nam, drl : payload.drl, drlktx : payload.drlktx, dvs : payload.dvs});
    })
  }

  editUser(payload) {
    $.ajax({
      url: '/editstudent/' + payload.id,
      type: 'PUT',
      data: {email : payload.email, khuvuc : payload.khuvuc, tinh : payload.tinh, doituong : payload.doituong, hocluc : payload.hocluc, hoancanh : payload.hoancanh}
    })
    .done((data) => {
      this.actions.editUserSuccess();
    })
  }

  updateInfoKtx(payload) {
    $.ajax({
      url: '/updatethongtinktx/' + payload.userId,
      type: 'PUT',
      data: {phongchitiet : payload.phongchitiet, tang : payload.tang, maktx : payload.maktx, giuong : payload.giuong}
    })
    .done((data) => {
      this.actions.updateInfoKtxSuccess(payload.xetduyet);
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
