import alt from '../../../alt';
import ManagePhongChitietAction from '../../../actions/admin/manage-phong/ManagePhongChitietAction';
import localStorage from 'localStorage';


class ManagePhongChitietStore {
  constructor() {
    this.bindActions(ManagePhongChitietAction);
    this.phongchitiet = [];
  }

  onGetPhongChitietSuccess(response) {
    this.phongchitiet = response;
  }

  onAddPhongChitietSuccess() {
    ManagePhongChitietAction.getPhong();
  }

  onDelPhongChitietSuccess() {
    ManagePhongChitietAction.getPhong();
  }

  onUpdateGiuongDangkySuccess() {
    ManagePhongChitietAction.getPhong();
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

export default alt.createStore(ManagePhongChitietStore);
