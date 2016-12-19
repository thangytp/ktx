import alt from '../../../alt';

class ManageDichvuAction {
  constructor() {
    this.generateActions(
      'addDichvuSuccess',
      'getDichvuSuccess',
      'delDichvuSuccess',
      'openMoDDeleteDichvu',
      'closeModalDeleteDichvu',

      'updateTenDV',
      'updateGiaDV',
      'updateDichvuSuccess',
      'showEditDichvu',
      'closeModalEdit'
    );
  }

  openMoDDeleteDichvu(id){
    this.actions.openMoDDeleteDichvu(id);
  }

  showEditDichvu(dichvu){
    this.actions.showEditDichvu(dichvu);
  }

  getDichvu() {
    $.ajax({
      url: '/getdichvu',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getDichvuSuccess(data);
    })
  }

  delDichvu(payload) {
    $.ajax({
      url: '/deletedichvu/' + payload,
      type: 'DELETE'
    })
    .done((data) => {
      this.actions.delDichvuSuccess();
    })
  }

  addDichvu(payload) {
    $.ajax({
      url: '/adddichvu',
      type: 'POST',
      data: payload
    })
    .done((data) => {
      this.actions.addDichvuSuccess();
    })
  }

  updateDichvu(payload) {
    $.ajax({
      url: '/api/updatedichvu',
      type: 'PUT',
      data: payload
    })
    .done((data) => {
      this.actions.updateDichvuSuccess(data.message);
    })
  }
}

export default alt.createActions(ManageDichvuAction);
