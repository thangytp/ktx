import alt from '../../../alt';
import ManageDichvuAction from '../../../actions/admin/manage-dichvu/ManageDichvuAction';
import localStorage from 'localStorage';


class ManageDichvuStore {
  constructor() {
    this.bindActions(ManageDichvuAction);
    this.dichvu = [];

    this.addModalShow = false;

    this.idEdit = '';
    this.tendv = '';
    this.giadv = 0;
    this.modalEdit = false;
    this.messUpdate = '';

    this.idDel = '';
    this.modalIsOpenDeleteDichvu = false;
  }

  onGetDichvuSuccess(response) {
    this.dichvu = response;
  }

  onAddDichvuSuccess() {
    ManageDichvuAction.getDichvu();
    this.addModalShow = false;
    
  }

  onDelDichvuSuccess() {
    ManageDichvuAction.getDichvu();
    this.idDel = '';
    this.modalIsOpenDeleteDichvu = false;
  }
  
  onOpenMoDDeleteDichvu(id){
    this.idDel = id;
    this.modalIsOpenDeleteDichvu = true;
  }

  onCloseModalDeleteDichvu(){
    this.idDel = '';
    this.modalIsOpenDeleteDichvu = false;
  }

  onUpdateTenDV(e){
    this.tendv = e.target.value;
  }
  onUpdateGiaDV(e){
    this.giadv = e.target.value;
  }

  onShowEditDichvu(dv){
    this.idEdit = dv._id;
    this.tendv = dv.ten;
    this.giadv = dv.gia;
    this.modalEdit = true;
  }

  onUpdateDichvuSuccess(data){
    this.idEdit = '';
    this.tendv = '';
    this.giadv = 0;
    
    this.messUpdate = data;
    ManageDichvuAction.getDichvu();
    this.modalEdit = false;
    
  }
  onCloseModalEdit(){
    this.modalEdit = false;
  }
}

export default alt.createStore(ManageDichvuStore);
