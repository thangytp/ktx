import alt from '../../../alt';

class ManageHedaotaoAction {
  constructor() {
    this.generateActions(
      'addHedaotaoSuccess',
      'getHedaotaoSuccess',
      'delHedaotaoSuccess'
    );
  }

  getHedaotao() {
    $.ajax({
      url: '/gethedaotao',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getHedaotaoSuccess(data);
    })
  }

  delHedaotao(payload) {
    $.ajax({
      url: '/deletehedaotao/' + payload,
      type: 'DELETE'
    })
    .done((data) => {
      this.actions.delHedaotaoSuccess();
    })
  }

  addHedaotao(payload) {
    $.ajax({
      url: '/addhedaotao',
      type: 'POST',
      data: payload
    })
    .done((data) => {
      this.actions.addHedaotaoSuccess();
    })
  }
}

export default alt.createActions(ManageHedaotaoAction);
