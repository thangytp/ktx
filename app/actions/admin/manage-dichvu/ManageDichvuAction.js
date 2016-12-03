import alt from '../../../alt';

class ManageDichvuAction {
  constructor() {
    this.generateActions(
      'addDichvuSuccess',
      'getDichvuSuccess',
      'delDichvuSuccess'
    );
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
}

export default alt.createActions(ManageDichvuAction);
