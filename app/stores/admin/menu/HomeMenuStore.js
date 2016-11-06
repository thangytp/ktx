import alt from '../../../alt';
import HomeMenuAction from '../../../actions/admin/menu/HomeMenuAction';

class HomeMenuStore {
  constructor() {
    this.bindActions(HomeMenuAction);
    this.id='';
    this.itemMenuName='';
    this.parent = 0;

    this.listCha = [];
    this.listCon = [];
    this.listChild = [];
    this.listSubChild = [];

    this.modalIsOpen=false;

    // state cho viec xoa va cap nhat order
    this.cha= 'cha';
    this.con= 'con';
    this.chau ='chau';

    this.idDeleteCha = '';
    this.modalIsOpenDelete = false;

    this.validateTitle = '';
    this.classValidate = '';
    this.helpBlock ='';

    // state disable button khong cho them khi ten danh muc da ton tai
    this.disabledButton = '';

    this.idtest = 111;
  }

  onUpdateItemMenuName(event){
    this.validateTitle = '';
    this.classValidate = '';
    this.itemMenuName = event.target.value;
    HomeMenuAction.checkNameMenu(this.itemMenuName, this.parent);
  }

  onUpdateParent(event){
    this.parent = event.target.value;
  }

  onAddItemMenuSuccess(mess){
    this.itemMenuName='';
    this.parent = 0;
    this.helpBlock ='';
    HomeMenuAction.getListCha();
    HomeMenuAction.getListChild();
    HomeMenuAction.getListSubChild();
    this.modalIsOpen=false;
  }
  onAddItemMenuFail(mess){
    console.log(mess);
  }

  onDeleteChaSuccess(mes){
    HomeMenuAction.getListCha();
    HomeMenuAction.getListChild();
    HomeMenuAction.getListSubChild();
    this.modalIsOpenDelete = false;
  }
  onDeleteChaFail(jqXhr){
    console.log("khong xoa dc danh sach cha");
  }
  

  onGetListChaSuccess(data){
    this.listCha=data;
  }
  onGetListChaFail(jqXhr){
    console.log("khong get dc danh sach cha");
  }

  onGetListConSuccess(data){
    this.listCon = data;
  }
  onGetListConFail(jqXhr){
    console.log("khong get dc danh sach con");
  }
  onGetListChildSuccess(data){
    this.listChild = data;
  }
  onGetListChildFail(jqXhr){
    console.log("khong get dc danh sach con");
  }
  onGetListSubChildSuccess(data){
    this.listSubChild = data;
  }
  onGetListSubChildFail(jqXhr){
    console.log("khong get dc danh sach con");
  }

  onOpenModal(a)
  {
      this.parent = a;
      this.modalIsOpen=true;
  }
  onCloseModal()
  {
      this.itemMenuName='';
      this.validateTitle = '';
      this.classValidate = '';
      this.helpBlock ='';

      // state disable button khong cho them khi ten danh muc da ton tai
      this.disabledButton = '';
      this.modalIsOpen=false;
  }

  onOpenModalDelete(id){
    this.idDeleteCha = id;
    this.modalIsOpenDelete = true;
  }
  onCloseModalDelete(){
      this.modalIsOpenDelete = false;
  }

  onMoveUpOrderSuccess(data){
    HomeMenuAction.getListCha();
    HomeMenuAction.getListChild();
    HomeMenuAction.getListSubChild();
  }
  moveUpOrderFail(jqXhr){
    console.log("khong get dc danh sach con");
  }
  moveDownOrderSuccess(data){
    HomeMenuAction.getListCha();
    HomeMenuAction.getListChild();
    HomeMenuAction.getListSubChild();
  }
  moveDownOrderFail(jqXhr){
    console.log("khong get dc danh sach con");
  }

  onExistTitle(message){
    if(message=='Tên danh mục có thể sử dụng'){
      this.disabledButton = '';
      this.classValidate = 'has-success';
    }
    else{
      this.disabledButton = 'disabled';
      this.classValidate = 'has-error';
    }
    this.validateTitle = message;
  }
  onNoneExistTitle(){
    this.disabledButton = '';
    this.validateTitle = 'Tên danh mục hợp lệ';
    this.classValidate = 'has-success';
  }

  onInvalidName(){
    this.classValidate = 'has-error';
    this.validateTitle = 'Vui lòng nhập tên hợp lệ';
  }
  
}

export default alt.createStore(HomeMenuStore);
