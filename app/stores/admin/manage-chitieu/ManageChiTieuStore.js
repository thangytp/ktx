import alt from '../../../alt';
import ManageChiTieuAction from '../../../actions/admin/manage-chitieu/ManageChiTieuAction';
import localStorage from 'localStorage';


class ManageChiTieuStore {
  constructor() {
    this.bindActions(ManageChiTieuAction);
    this.chitieu = []
  }

  onGetChitieuSuccess(response) {
    this.chitieu = response;
  }

  onAddChiTieuSuccess() {
    ManageChiTieuAction.getChitieu();
  }

  onUpdateChiTieuSuccess() {
    ManageChiTieuAction.getChitieu();
  }

  onDelChitieuSuccess() {
    ManageChiTieuAction.getChitieu();
  }
  // onUpdateuser(event)
  // {
  // 	this.user = event.target.value;
  //    this.helpBlock='';
  // }
  // onUpdatepassword(event)
  // {
  // 	this.password = event.target.value;
  //   this.helpBlock='';
  // }
  // onSetOpenModal(boolean)
  // {
  //     this.LoginModalisOpen = boolean;
  //     this.user ='';
  //     this.password ='';
  // }
}

export default alt.createStore(ManageChiTieuStore);
