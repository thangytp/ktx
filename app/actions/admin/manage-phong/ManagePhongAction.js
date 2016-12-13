import alt from '../../../alt';

class ManagePhongAction {
  constructor() {
    this.generateActions(
      'addPhongSuccess',
      'getPhongSuccess',
      'delPhongSuccess',

      'openMoDDeletePhong',
      'closeModalDelete',

      'handleGetPhong',
      'closeModal'
    );
  }

  openMoDDeletePhong(id){
    this.actions.openMoDDeletePhong(id);
  }

  handleGetPhong(payload){
    this.actions.handleGetPhong(payload);
  }

  getPhong() {
    $.ajax({
      url: '/getphong',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getPhongSuccess(data);
    })
  }

  delPhong(payload) {
    $.ajax({
      url: '/deletephong/' + payload,
      type: 'DELETE'
    })
    .done((data) => {
      this.actions.delPhongSuccess();
    })
  }

  addPhong(payload) {
    $.ajax({
      url: '/addphong',
      type: 'POST',
      data: payload
    })
    .done((data) => {
      this.actions.addPhongSuccess();
    })
  }
}

export default alt.createActions(ManagePhongAction);
