import alt from '../../../alt';

class ManageChiTieuAction {
  constructor() {
    this.generateActions(
      'addChiTieuSuccess',
      'getChitieuSuccess',
      'delChitieuSuccess'
    );
  }

  getChitieu() {
    $.ajax({
      url: '/getchitieu',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getChitieuSuccess(data);
    })
  }

  delChitieu(payload) {
    $.ajax({
      url: '/deletechitieu/' + payload,
      type: 'DELETE'
    })
    .done((data) => {
      this.actions.delChitieuSuccess();
    })
  }

  addChiTieu(payload) {
    $.ajax({
      url: '/addchitieu',
      type: 'POST',
      data: payload
    })
    .done((data) => {
      console.log('aaa');
      this.actions.addChiTieuSuccess();
    })
  }
}

export default alt.createActions(ManageChiTieuAction);
