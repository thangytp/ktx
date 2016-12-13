import alt from '../../../alt';
import ManageTangAction from '../../../actions/admin/manage-phong/ManageTangAction';
import localStorage from 'localStorage';


class ManageTangStore {
  constructor() {
    this.bindActions(ManageTangAction);
    this.tang = [];
    // state delete
    this.modalIsOpenDelete = false;
    this.idDel = '';

    // state edit
    this.modalIsOpen = false;
    this.idEdit = '';
    this.tenEdit = '';
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
  openMoDDeleteTang(id){
    this.idDel = id;
    this.modalIsOpenDelete = true;
  }
  onCloseModalDelete(){
    this.modalIsOpenDelete = false;
  }

  onHandleGetTang(payload){
    this.modalIsOpen = true;
    this.idEdit = payload._id;
    this.tenEdit = payload.ten;
  }

  onCloseModal(){
    this.modalIsOpen = false;
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
