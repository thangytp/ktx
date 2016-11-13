import alt from '../../../alt';

class ManageUuTienAction {
  constructor() {
    this.generateActions(
      'getKhuvucSuccess',
      'addKhuvucSuccess',
      'delKhuvucSuccess',
      'getTinhSuccess',
      'addTinhSuccess',
      'delTinhSuccess'

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
    console.log(payload);
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

  getTinh() {
    $.ajax({
      url: '/gettinh',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getTinhSuccess(data);
    })
  }

  delTinh(payload) {
    console.log(payload);
    $.ajax({
      url: '/deletetinh/' + payload,
      type: 'DELETE'
    })
    .done((data) => {
      this.actions.delTinhSuccess();
    })
  }

  addTinh(payload) {
    $.ajax({
      url: '/addtinh',
      type: 'POST',
      data: payload
    })
    .done((data) => {
      this.actions.addTinhSuccess();
    })

  }

}

export default alt.createActions(ManageUuTienAction);
