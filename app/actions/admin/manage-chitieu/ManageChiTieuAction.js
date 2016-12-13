import alt from '../../../alt';

class ManageChiTieuAction {
  constructor() {
    this.generateActions(
      'addChiTieuSuccess',
      'updateChiTieuSuccess',
      'getChitieuSuccess',
      'delChitieuSuccess',

      'closeModalDelete',
      'openMoDDeleteChitieu'
    );
  }

  openMoDDeleteChitieu(id){
    this.actions.openMoDDeleteChitieu(id);
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
      this.actions.addChiTieuSuccess();
    })
  }

  updateChiTieu(payload) {
    $.ajax({
      url: '/updatechitieu/' + payload.nam,
      type: 'PUT',
      data: payload
    })
    .done((data) => {
      this.actions.updateChiTieuSuccess();
    })
  }
}

export default alt.createActions(ManageChiTieuAction);
