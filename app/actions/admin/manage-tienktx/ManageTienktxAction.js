import alt from '../../../alt';

class ManageDichvuAction {
  constructor() {
    this.generateActions(
      'addTienSuccess',
      'getTienSuccess',
      'checkTienSuccess'
    );
  }

  getTien() {
    $.ajax({
      url: '/gettien',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getTienSuccess(data);
    })
  }

  addTien(payload) {
    $.ajax({
      url: '/addtien',
      type: 'POST',
      data: {students : payload}
    })
    .done((data) => {
      this.actions.addTienSuccess();
    })
  }

  checkTien(payload) {
    $.ajax({
      url: '/checktien',
      type: 'PUT',
      data: payload
    })
    .done((data) => {
      this.actions.checkTienSuccess();
    })
  }
}

export default alt.createActions(ManageDichvuAction);
