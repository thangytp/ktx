import alt from '../../../alt';
import ManageDichvuAction from '../../../actions/admin/manage-dichvu/ManageDichvuAction';
import localStorage from 'localStorage';


class ManageDichvuStore {
  constructor() {
    this.bindActions(ManageDichvuAction);
    this.dichvu = [];
  }

  onGetDichvuSuccess(response) {
    this.dichvu = response;
  }

  onAddDichvuSuccess() {
    ManageDichvuAction.getDichvu();
  }

  onDelDichvuSuccess() {
    ManageDichvuAction.getDichvu();
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

export default alt.createStore(ManageDichvuStore);
