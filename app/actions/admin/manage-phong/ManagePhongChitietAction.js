import alt from '../../../alt';

class ManagePhongChitietAction {
  constructor() {
    this.generateActions(
      'addPhongChitietSuccess',
      'getPhongChitietSuccess',
      'delPhongChitietSuccess'
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
}

export default alt.createActions(ManagePhongChitietAction);
