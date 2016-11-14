import alt from '../../../alt';
import ManageUuTienAction from '../../../actions/admin/manage-uutien/ManageUuTienAction';
import localStorage from 'localStorage';


class ManageUuTienStore {
  constructor() {
    this.bindActions(ManageUuTienAction);
    this.khuvuc = [];
    this.tinh = [];
    this.doituong = [];
    this.hocluc = [];
    this.hoancanh = [];
  }

  onGetKhuvucSuccess(response) {
    this.khuvuc = response;
  }

  onAddKhuvucSuccess() {
    ManageUuTienAction.getKhuvuc();
  }

  onDelKhuvucSuccess() {
    ManageUuTienAction.getKhuvuc();
  }

  onGetTinhSuccess(response) {
    this.tinh = response;
  }

  onAddTinhSuccess() {
    ManageUuTienAction.getTinh();
  }

  onDelTinhSuccess() {
    ManageUuTienAction.getTinh();
  }

  onGetDoituongSuccess(response) {
    this.doituong = response;
  }

  onAddDoituongSuccess() {
    ManageUuTienAction.getDoituong();
  }

  onDelDoituongSuccess() {
    ManageUuTienAction.getDoituong();
  }

  onGetHoclucSuccess(response) {
    this.hocluc = response;
  }

  onAddHoclucSuccess() {
    ManageUuTienAction.getHocluc();
  }

  onDelHoclucSuccess() {
    ManageUuTienAction.getHocluc();
  }

  onGetHoancanhSuccess(response) {
    this.hoancanh = response;
  }

  onAddHoancanhSuccess() {
    ManageUuTienAction.getHoancanh();
  }

  onDelTinhSuccess() {
    ManageUuTienAction.getHoancanh();
  }

}

export default alt.createStore(ManageUuTienStore);
