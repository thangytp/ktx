import alt from '../../../alt';
import ManagePhongAction from '../../../actions/admin/manage-phong/ManagePhongAction';
import localStorage from 'localStorage';


class ManagePhongStore {
  constructor() {
    this.bindActions(ManagePhongAction);
    this.phong = [];
  }

  onGetPhongSuccess(response) {
    this.phong = response;
  }

  onAddPhongSuccess() {
    ManagePhongAction.getPhong();
  }

  onDelPhongSuccess() {
    ManagePhongAction.getPhong();
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

export default alt.createStore(ManagePhongStore);
