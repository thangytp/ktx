import alt from '../../../alt';

class ManageUuTienAction {
  constructor() {
    this.generateActions(
      'getKhuvucSuccess',
      'addKhuvucSuccess',
      'delKhuvucSuccess'
    );
  }
  getKhuvuc() {
    $.ajax({
      url: '/getkhuvuc',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getKhuvucSuccess(data);
    })
  }

  delKhuvuc(payload) {
    $.ajax({
      url: '/deletekhuvuc/' + payload,
      type: 'DELETE'
    })
    .done((data) => {
      this.actions.delKhuvucSuccess();
    })
  }

  addKhuvuc(payload) {
    $.ajax({
      url: '/addkhuvuc',
      type: 'POST',
      data: payload
    })
    .done((data) => {
      this.actions.addKhuvucSuccess();
    })

  }
}

export default alt.createActions(ManageUuTienAction);
