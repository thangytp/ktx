import alt from '../../../alt';
import ManageTangAction from '../../../actions/admin/manage-phong/ManageTangAction';
import localStorage from 'localStorage';


class ManageTangStore {
  constructor() {
    this.bindActions(ManageTangAction);
    this.tang = [];
  }

  onGetTangSuccess(response) {
    this.tang = response;
  }

  onAddTangSuccess() {
    ManageTangAction.getTang();
  }

  onDelTangSuccess() {
    ManageTangAction.getTang();
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

export default alt.createStore(ManageTangStore);
