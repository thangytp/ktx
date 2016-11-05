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

    this.helpBlock ='';

    this.idtest = 111;
  }

  onUpdateItemMenuName(event){
    this.itemMenuName = event.target.value;
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
      this.modalIsOpen=false;
  }

  onInvalidName(){
    this.helpBlock = 'Vui lòng nhập tên hợp lệ';
  }
  
}

export default alt.createStore(HomeMenuStore);
