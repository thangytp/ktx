import alt from '../../../alt';
import ManageAdminAction from '../../../actions/admin/manage-admin/ManageAdminAction';
import localStorage from 'localStorage';


class ManageAdminStore {
  constructor() {
    this.bindActions(ManageAdminAction);
    this.admin = [];
    this.modalIsOpen = false;

    // state edit
    this.nameEdit = '';
    this.emailEdit = '';
    this.typeEdit = '';
    // state delete
    this.modalIsOpenDelete = false;
    this.idDel = '';
  }

  onGetAdminSuccess(response) {
    this.admin = response;
  }

  onAddAdminSuccess() {
    ManageAdminAction.getAdmin();
  }

  onDelAdminSuccess() {
    ManageAdminAction.getAdmin();
  }

  onHandleGetAdmin(payload){
    console.log(payload);
    this.modalIsOpen = true;
    this.nameEdit = payload.name? payload.name : '';
    this.emailEdit = payload.email;
    this.typeEdit = payload.type;
  }
  onCloseModal(){
    this.modalIsOpen = false;
  }
  onOpenMoDDeleteAdmin(id){
    this.idDel = id;
    this.modalIsOpenDelete = true;
  }
  onCloseModalDelete(){
    this.modalIsOpenDelete = false;
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

export default alt.createStore(ManageAdminStore);
