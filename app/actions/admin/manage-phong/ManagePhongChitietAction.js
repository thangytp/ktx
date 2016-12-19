import alt from '../../../alt';

class ManagePhongChitietAction {
  constructor() {
    this.generateActions(
      'addPhongChitietSuccess',
      'getPhongChitietSuccess',
      'delPhongChitietSuccess',
      'updateGiuongDangkySuccess',
      'addGiuongChitietSuccess',

      'getPhongChiTietSuccess',
      'closeModalEdit',
      'updateLoaiPhong',
      'updateTang',
      'updateMa',

      'updatePhongChitietSuccess',

      'closeModalDeletePhongCT',
      'openMoDDeletePhongCT'
    );
  }

  openMoDDeletePhongCT(id){
    this.actions.openMoDDeletePhongCT(id);
  }

  getPhong() {
    $.ajax({
      url: '/getphongchitiet',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getPhongChitietSuccess(data);
    })
  }

  delPhong(payload) {
    $.ajax({
      url: '/deletephongchitiet',
      type: 'DELETE',
      data: payload
    })
    .done((data) => {
      this.actions.delPhongChitietSuccess();
    })
  }

  addPhong(payload) {
    $.ajax({
      url: '/addphongchitiet',
      type: 'POST',
      data: payload
    })
    .done((data) => {
      this.actions.addPhongChitietSuccess();
    })
  }

  addGiuong(payload) {
    $.ajax({
      url: '/addphongchitiet/giuong',
      type: 'PUT',
      data: payload
    })
    .done((data) => {
      this.actions.addGiuongChitietSuccess();
    })
  }

  updateGiuongDangky(payload) {
    $.ajax({
      url: '/updategiuongdachon',
      type: 'PUT',
      data: payload
    })
    .done((data) => {
      this.actions.updateGiuongDangkySuccess();
    })
  }

  getPhongChiTiet(id){
    $.ajax({
      url: '/api/getphongchitietbyid/'+id,
      type: 'GET',
    })
    .done((data) => {
      this.actions.getPhongChiTietSuccess(data);
    })
  }

  updatePhongChiTiet(payload) {
    $.ajax({
      url: '/api/updatephongchitiet',
      type: 'PUT',
      data: payload
    })
    .done((data) => {
      this.actions.updatePhongChitietSuccess(data.message);
    })
  }

}

export default alt.createActions(ManagePhongChitietAction);
