import alt from '../../../alt';

class ManageTangAction {
  constructor() {
    this.generateActions(
      'addTangSuccess',
      'getTangSuccess',
      'delTangSuccess'
    );
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
