import alt from '../../../alt';

class ManageUuTienAction {
  constructor() {
    this.generateActions(
      'getKhuvucSuccess',
      'addKhuvucSuccess',
      'delKhuvucSuccess',
      'getTinhSuccess',
      'addTinhSuccess',
      'delTinhSuccess',
      'getDoituongSuccess',
      'addDoituongSuccess',
      'delDoituongSuccess',
      'getHoclucSuccess',
      'addHoclucSuccess',
      'delHoclucSuccess',
      'getHoancanhSuccess',
      'addHoancanhSuccess',
      'delHoancanhSuccess'
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

  getDoituong() {
    $.ajax({
      url: '/getdoituong',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getDoituongSuccess(data);
    })
  }

  delDoituong(payload) {
    console.log(payload);
    $.ajax({
      url: '/deletedoituong/' + payload,
      type: 'DELETE'
    })
    .done((data) => {
      this.actions.delDoituongSuccess();
    })
  }

  addDoituong(payload) {
    $.ajax({
      url: '/adddoituong',
      type: 'POST',
      data: payload
    })
    .done((data) => {
      this.actions.addDoituongSuccess();
    })
  }

  getHocluc() {
    $.ajax({
      url: '/gethocluc',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getHoclucSuccess(data);
    })
  }

  delHocluc(payload) {
    console.log(payload);
    $.ajax({
      url: '/deletehocluc/' + payload,
      type: 'DELETE'
    })
    .done((data) => {
      this.actions.delHoclucSuccess();
    })
  }

  addHocluc(payload) {
    $.ajax({
      url: '/addhocluc',
      type: 'POST',
      data: payload
    })
    .done((data) => {
      this.actions.addHoclucSuccess();
    })
  }

  getHoancanh() {
    $.ajax({
      url: '/gethoancanh',
      type: 'GET'
    })
    .done((data) => {
      this.actions.getHoancanhSuccess(data);
    })
  }

  delHoancanh(payload) {
    console.log(payload);
    $.ajax({
      url: '/deletehoancanh/' + payload,
      type: 'DELETE'
    })
    .done((data) => {
      this.actions.delHoancanhSuccess();
    })
  }

  addHoancanh(payload) {
    $.ajax({
      url: '/addhoancanh',
      type: 'POST',
      data: payload
    })
    .done((data) => {
      this.actions.addHoancanhSuccess();
    })
  }

}

export default alt.createActions(ManageUuTienAction);
