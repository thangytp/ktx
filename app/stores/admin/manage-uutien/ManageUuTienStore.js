import alt from '../../../alt';
import ManageUuTienAction from '../../../actions/admin/manage-uutien/ManageUuTienAction';
import localStorage from 'localStorage';


class ManageUuTienStore {
  constructor() {
    this.bindActions(ManageUuTienAction);
    this.khuvuc = [];
    this.tinh = [];
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

}

export default alt.createStore(ManageUuTienStore);
