import alt from '../../../alt';
import HomeMenuAction from '../../../actions/admin/menu/HomeMenuAction';

class HomeMenuStore {
  constructor() {
    this.bindActions(HomeMenuAction);
    this.id='';
    this.itemMenuName='';
    this.parent = 0;

    //================code test menu========//
    this.testListCha = [];
    this.listCon = [];
    //========end==============//

    this.listCha = [];
    
    this.listChild = [];
    this.listSubChild = [];

    this.modalIsOpen=false;

    // state cho viec xoa va cap nhat order
    this.cha= 'cha';
    this.con= 'con';
    this.chau ='chau';

    this.idDeleteCha = '';
    this.modalIsOpenDelete = false;

    this.idEditLinkToPage = '';
    this.modalIsOpenEditLinkPage = false;
    this.pagelink = 0;
    this.typeEditPageLink = '';
    this.validatePageLink = '';
    this.classValidatePageLink = '';

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
  
  // =================code test menu===================//

  onTestGetListChaSuccess(data){
    this.testListCha=data;
    for(var i=0; i< this.testListCha.length; i++){
        HomeMenuAction.getListCon({idCha: this.testListCha[i]._id, num: i});
    }
    console.log(data);
  }
  onTestGetListChaFail(jqXhr){
    console.log("khong get dc danh sach cha");
  }

  onTestGetListConSuccess(payload){
    this.testListCha[payload.num].child = payload.data;

    if(payload.data.length != 0){
        for(var i=0; i< payload.data.length; i++){
            HomeMenuAction.getListChau({ idChau: payload.data[i]._id, numCha: payload.num, numCon: i })  
        }
    }
    // console.log(this.testListCha);
  }
  onTestGetListConFail(jqXhr){
    console.log("khong get dc danh sach con");
  }

  //handle get chau success
  onTestGetListChauSuccess(payload){
      this.testListCha[payload.numCha].child[payload.numCon].subChild = payload.data;
      console.log(this.testListCha);
  }
  onTestGetListChauFail(jqXhr){
    console.log("khong get dc danh sach con");
  }

  //=====================end=================//

  onGetListChaSuccess(data){
    this.listCha=data;
    console.log(data);
  }
  onGetListChaFail(jqXhr){
    console.log("khong get dc danh sach cha");
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

  onOpenMoDEditLinkToPage(payload){
    this.modalIsOpenEditLinkPage = true;
    this.idEditLinkToPage = payload.id;
    this.typeEditPageLink = payload.type;
    this.pagelink = payload.pageId;
    console.log(this.typeEditPageLink);
    this.classValidatePageLink = '';
    this.validatePageLink = '';
  }
  onCloseModalEditLinkPage(){
    this.modalIsOpenEditLinkPage = false;
    this.pagelink = 0;
    this.classValidatePageLink = '';
    this.validatePageLink = '';
  }

  onUpdateLinkToPage(event){
    this.pagelink = event.target.value;
    this.classValidatePageLink = '';
    this.validatePageLink = '';
    console.log(this.pagelink);
  }
  onInvalidPageLink(){
    this.classValidatePageLink = 'has-error';
    this.validatePageLink = 'Vui lòng chọn trang';
  }
  onEditLinkToPageSuccess(data){
    this.modalIsOpenEditLinkPage = false;
    HomeMenuAction.getListCha();
    HomeMenuAction.getListChild();
    HomeMenuAction.getListSubChild();
    console.log(data);
  }
  onEditLinkToPageFail(){
    console.log('edit fail');
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


  // get all menu
  onGetAllMenuSuccess(data){
    console.log(data);
  }
  onGetAllMenuFail(jqXhr){
    console.log("khong get dc");
  }
  
}

export default alt.createStore(HomeMenuStore);
