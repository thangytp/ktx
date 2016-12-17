import alt from '../../../alt';
import ManageDichvuAction from '../../../actions/admin/manage-tienktx/ManageTienktxAction';
import localStorage from 'localStorage';


class ManageTienktxStore {
  constructor() {
    this.bindActions(ManageTienktxAction);
    this.tienktx = [];
  }

  onGetTienSuccess(response) {
    this.tienktx = response;
  }

  onAddTienSuccess() {
  }

  onCheckTienSuccess() {
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

export default alt.createStore(ManageTienktxStore);
