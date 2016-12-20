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
      'closeModal',
      'updateTenLoaiPhong',
      'updateLoaiPhong',
      'updateGiaLoaiPhong',
      'updateSoNguoi',
      'updateSoLuong',
      'updatePhongSuccess'
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
      url: '/deletephong',
      type: 'DELETE',
      data: payload
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

  updatePhong(payload) {
    $.ajax({
      url: '/api/updatephong',
      type: 'PUT',
      data: payload
    })
    .done((data) => {
      this.actions.updatePhongSuccess(data.message);
    })
  }
}

export default alt.createActions(ManagePhongAction);
