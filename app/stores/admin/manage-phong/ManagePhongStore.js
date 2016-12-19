import alt from '../../../alt';
import ManagePhongAction from '../../../actions/admin/manage-phong/ManagePhongAction';
import localStorage from 'localStorage';


class ManagePhongStore {
  constructor() {
    this.bindActions(ManagePhongAction);
    this.phong = [];

    this.addModalShow = false;

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
    this.messUpdate = '';
  }

  onGetPhongSuccess(response) {
    this.phong = response;
  }

  onAddPhongSuccess() {
    ManagePhongAction.getPhong();
    this.addModalShow = false;

  }

  onDelPhongSuccess() {
    ManagePhongAction.getPhong();
    this.idDel = '';
    this.modalIsOpenDelete = false;
  }

  openMoDDeletePhong(id){
    this.idDel = id;
    this.modalIsOpenDelete = true;
  }
  onCloseModalDelete(){
    this.modalIsOpenDelete = false;
  }

  onHandleGetPhong(payload){
    this.messUpdate = '';

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
  
  onUpdatePhongSuccess(data){
    this.messUpdate = data;
    console.log(data);
    this.modalIsOpen = false;
    this.idEdit = '';
    this.tenEdit = '';
    this.loaiEdit = 0;
    this.giaEdit = 0;
    this.kichcoEdit = 0;
    this.soluongEdit = 0;
    ManagePhongAction.getPhong();
  }

  onUpdateTenLoaiPhong(e){
    this.tenEdit = e.target.value;
  }
  onUpdateLoaiPhong(e){
    this.loaiEdit = e.target.value;
  }
  onUpdateGiaLoaiPhong(e){
    this.giaEdit = e.target.value;
  }
  onUpdateSoNguoi(e){
    this.kichcoEdit = e.target.value;
  }
  onUpdateSoLuong(e){
    this.soluongEdit = e.target.value;
  }
}

export default alt.createStore(ManagePhongStore);
