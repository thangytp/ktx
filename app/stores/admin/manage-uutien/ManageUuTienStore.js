import alt from '../../../alt';
import ManageUuTienAction from '../../../actions/admin/manage-uutien/ManageUuTienAction';
import localStorage from 'localStorage';


class ManageUuTienStore {
  constructor() {
    this.bindActions(ManageUuTienAction);
    this.khuvuc = [];
    this.khuvuce = {};
    this.tinh = [];
    this.tinhe = {};
    this.doituong = [];
    this.doituonge = {};
    this.hocluc = [];
    this.hocluce = {};
    this.hoancanh = [];
    this.hoancanhe = {};
  }

  onGetKhuvucSuccess(response) {
    this.khuvuc = response;
  }

  onGetEKhuvucSuccess(response) {
    this.khuvuce = response
  }

  onAddKhuvucSuccess() {
    ManageUuTienAction.getKhuvuc();
  }

  onDelKhuvucSuccess() {
    ManageUuTienAction.getKhuvuc();
  }

  onEditKhuvucSuccess() {
    ManageUuTienAction.getKhuvuc();
  }

  onGetTinhSuccess(response) {
    this.tinh = response;
  }

  onGetETinhSuccess(response) {
    this.tinhe = response
  }

  onAddTinhSuccess() {
    ManageUuTienAction.getTinh();
  }

  onDelTinhSuccess() {
    ManageUuTienAction.getTinh();
  }

  onEditTinhSuccess() {
    ManageUuTienAction.getTinh();
  }

  onGetDoituongSuccess(response) {
    this.doituong = response;
  }

  onGetEDoituongSuccess(response) {
    this.doituonge = response
  }

  onAddDoituongSuccess() {
    ManageUuTienAction.getDoituong();
  }

  onDelDoituongSuccess() {
    ManageUuTienAction.getDoituong();
  }

  onEditDoituongSuccess() {
    ManageUuTienAction.getDoituong();
  }

  onGetHoclucSuccess(response) {
    this.hocluc = response;
  }

  onGetEHoclucSuccess(response) {
    this.hocluce = response
  }

  onAddHoclucSuccess() {
    ManageUuTienAction.getHocluc();
  }

  onDelHoclucSuccess() {
    ManageUuTienAction.getHocluc();
  }

  onEditHoclucSuccess() {
    ManageUuTienAction.getHocluc();
  }

  onGetHoancanhSuccess(response) {
    this.hoancanh = response;
  }

  onGetEHoancanhSuccess(response) {
    this.hoancanhe = response
  }

  onAddHoancanhSuccess() {
    ManageUuTienAction.getHoancanh();
  }

  onDelTinhSuccess() {
    ManageUuTienAction.getHoancanh();
  }

  onEditHoancanhSuccess() {
    ManageUuTienAction.getHoancanh();
  }

}

export default alt.createStore(ManageUuTienStore);
