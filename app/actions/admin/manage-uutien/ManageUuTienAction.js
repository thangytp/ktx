import alt from '../../../alt';

class ManageUuTienAction {
  constructor() {
    this.generateActions(
      'getKhuvucSuccess',
      'getEKhuvucSuccess',
      'addKhuvucSuccess',
      'editKhuvucSuccess',
      'delKhuvucSuccess',
      'getTinhSuccess',
      'getETinhSuccess',
      'editTinhSuccess',
      'addTinhSuccess',
      'delTinhSuccess',
      'getDoituongSuccess',
      'getEDoituongSuccess',
      'addDoituongSuccess',
      'editDoituongSuccess',
      'delDoituongSuccess',
      'getHoclucSuccess',
      'getEHoclucSuccess',
      'addHoclucSuccess',
      'editHoclucSuccess',
      'delHoclucSuccess',
      'getHoancanhSuccess',
      'getEHoancanhSuccess',
      'addHoancanhSuccess',
      'editHoancanhSuccess',
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

  getEKhuvuc(payload) {
    $.ajax({
      url: '/getkhuvuc/' + payload,
      type: 'GET'
    })
    .done((data) => {
      this.actions.getEKhuvucSuccess(data);
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

  editKhuvuc(payload) {
    $.ajax({
      url: '/editkhuvuc/' + payload.id,
      type: 'PUT',
      data: {ten : payload.ten, diem : payload.diem, ma : payload.ma}
    })
    .done((data) => {
      this.actions.editKhuvucSuccess();
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

  getETinh(payload) {
    $.ajax({
      url: '/gettinh/' + payload,
      type: 'GET'
    })
    .done((data) => {
      this.actions.getETinhSuccess(data);
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

  editTinh(payload) {
    $.ajax({
      url: '/edittinh/' + payload.id,
      type: 'PUT',
      data: {ten : payload.ten, diem : payload.diem, ma : payload.ma}
    })
    .done((data) => {
      this.actions.editTinhSuccess();
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

  getEDoituong(payload) {
    $.ajax({
      url: '/getdoituong/' + payload,
      type: 'GET'
    })
    .done((data) => {
      this.actions.getEDoituongSuccess(data);
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

  editDoituong(payload) {
    $.ajax({
      url: '/editdoituong/' + payload.id,
      type: 'PUT',
      data: {ten : payload.ten, diem : payload.diem, ma : payload.ma}
    })
    .done((data) => {
      this.actions.editDoituongSuccess();
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

  getEHocluc(payload) {
    $.ajax({
      url: '/gethocluc/' + payload,
      type: 'GET'
    })
    .done((data) => {
      this.actions.getEHoclucSuccess(data);
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

  editHocluc(payload) {
    $.ajax({
      url: '/edithocluc/' + payload.id,
      type: 'PUT',
      data: {ten : payload.ten, diem : payload.diem, ma : payload.ma}
    })
    .done((data) => {
      this.actions.editHoclucSuccess();
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

  getEHoancanh(payload) {
    $.ajax({
      url: '/gethoancanh/' + payload,
      type: 'GET'
    })
    .done((data) => {
      this.actions.getEHoancanhSuccess(data);
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

  editHoancanh(payload) {
    $.ajax({
      url: '/edithoancanh/' + payload.id,
      type: 'PUT',
      data: {ten : payload.ten, diem : payload.diem, ma : payload.ma}
    })
    .done((data) => {
      this.actions.editHoancanhSuccess();
    })
  }

}

export default alt.createActions(ManageUuTienAction);
