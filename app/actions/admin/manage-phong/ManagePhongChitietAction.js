import alt from '../../../alt';

class ManagePhongChitietAction {
  constructor() {
    this.generateActions(
      'addPhongChitietSuccess',
      'getPhongChitietSuccess',
      'delPhongChitietSuccess',
      'updateGiuongDangkySuccess'
    );
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
      url: '/deletephongchitiet/' + payload,
      type: 'DELETE'
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
      this.actions.addPhongChitietSuccess();
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

}

export default alt.createActions(ManagePhongChitietAction);
