import alt from '../../../alt';
import ManageUuTienAction from '../../../actions/admin/manage-uutien/ManageUuTienAction';
import localStorage from 'localStorage';


class ManageUuTienStore {
  constructor() {
    this.bindActions(ManageUuTienAction);
    this.khuvuc = [];
  }

  onGetKhuvucSuccess(response) {
    this.chitieu = response;
  }

  onAddKhuvucSuccess() {
    ManageUuTienAction.getKhuvuc();
  }

  onDelKhuvucSuccess() {
    ManageUuTienAction.getKhuvuc();
  }

}

export default alt.createStore(ManageUuTienStore);
