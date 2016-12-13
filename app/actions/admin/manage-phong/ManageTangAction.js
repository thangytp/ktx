import alt from '../../../alt';

class ManageTangAction {
  constructor() {
    this.generateActions(
      'addTangSuccess',
      'getTangSuccess',
      'delTangSuccess',

      'openMoDDeleteTang',
      'closeModalDelete',

      'handleGetTang',
      'closeModal'
    );
  }

  openMoDDeleteTang(id){
    this.actions.openMoDDeleteTang(id);
  }

  handleGetTang(payload){
    this.actions.handleGetTang(payload);
  }

  getTang() {
    $.ajax({
      url: '/gettang',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getTangSuccess(data);
    })
  }

  delTang(payload) {
    $.ajax({
      url: '/deletetang/' + payload,
      type: 'DELETE'
    })
    .done((data) => {
      this.actions.delTangSuccess();
    })
  }

  addTang(payload) {
    $.ajax({
      url: '/addtang',
      type: 'POST',
      data: payload
    })
    .done((data) => {
      this.actions.addTangSuccess();
    })
  }
}

export default alt.createActions(ManageTangAction);
