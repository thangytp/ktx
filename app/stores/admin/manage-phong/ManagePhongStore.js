import alt from '../../../alt';
import ManagePhongAction from '../../../actions/admin/manage-phong/ManagePhongAction';
import localStorage from 'localStorage';


class ManagePhongStore {
  constructor() {
    this.bindActions(ManagePhongAction);
    this.phong = [];

    // state delete
    this.modalIsOpenDelete = false;
    this.idDel = '';

    // state edit
    this.modalIsOpen = false;
    this.idEdit = '';
    this.tenEdit = '';
    this.loaiEdit = '';
    this.giaEdit = '';
    this.kichcoEdit = '';
    this.soluongEdit = '';
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

  openMoDDeletePhong(id){
    this.idDel = id;
    this.modalIsOpenDelete = true;
  }
  onCloseModalDelete(){
    this.modalIsOpenDelete = false;
  }

  onHandleGetPhong(payload){
    this.modalIsOpen = true;
    this.idEdit = payload._id;
    this.tenEdit = payload.ten;
    this.loaiEdit = payload.loai;
    this.giaEdit = payload.gia;
    this.kichcoEdit = payload.kichco;
    this.soluongEdit = payload.soluong;
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

export default alt.createStore(ManagePhongStore);
