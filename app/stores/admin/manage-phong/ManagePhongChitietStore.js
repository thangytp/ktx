import alt from '../../../alt';
import ManagePhongChitietAction from '../../../actions/admin/manage-phong/ManagePhongChitietAction';
import localStorage from 'localStorage';


class ManagePhongChitietStore {
  constructor() {
    this.bindActions(ManagePhongChitietAction);
    this.phongchitiet = [];

    this.addModalShow= false;

    this.modalEdit = false;
    this.idPhongChiTietEdit = '';
    this.maphong = '';
    this._loai = '';
    this._tang = '';
    this.messUpdate = '';
    this.diennuoc = [];
    this.modalIsOpenDeletePhongCT = false;
    this.idDel = '';
  }

  onAddDiennuocSuccess() {
    ManagePhongChitietAction.viewDiennuoc();
  }

  onViewDiennuocSuccess(response) {
    this.diennuoc = response;
  }


  onGetPhongChitietSuccess(response) {
    this.phongchitiet = response;
  }

  onAddPhongChitietSuccess() {
    this.addModalShow= false;
    ManagePhongChitietAction.getPhong();

  }

  onDelPhongChitietSuccess() {
    ManagePhongChitietAction.getPhong();
    this.modalIsOpenDeletePhongCT = false;
  }

  onAddGiuongChitietSuccess() {
    ManagePhongChitietAction.getPhong();
  }

  onUpdateGiuongDangkySuccess() {
    ManagePhongChitietAction.getPhong();
  }
  onGetPhongChiTietSuccess(data){
    this.messUpdate = '';
    this.modalEdit = true;

    this.idPhongChiTietEdit = data._id;
    this._loai = data._loai;
    this.maphong = data.ma;
    this._tang = data._tang;
  }
  onUpdateLoaiPhong(e){
    this._loai = e.target.value;
  }
  onUpdateMa(e){
    this.maphong = e.target.value;
  }
  onUpdateTang(e){
    this._tang = e.target.value;
  }

  onCloseModalEdit(){
    this.modalEdit = false;
  }
  onUpdatePhongChitietSuccess(data){
    this.messUpdate = data;
    this.modalEdit = false;
    this.idPhongChiTietEdit = '';
    this.maphong = '';
    this._loai = '';
    this._tang = '';
    ManagePhongChitietAction.getPhong();
  }

  onCloseModalDeletePhongCT(){
    this.modalIsOpenDeletePhongCT = false;
  }
  onOpenMoDDeletePhongCT(id){
    this.modalIsOpenDeletePhongCT = true;
    this.idDel = id;
  }
}

export default alt.createStore(ManagePhongChitietStore);
