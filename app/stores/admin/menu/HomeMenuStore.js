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

    // edit link to page
    this.idEditLinkToPage = '';
    this.modalIsOpenEditLinkPage = false;
    this.pagelink = 0;
    this.pageTitle = '';

    this.typeEditPageLink = '';
    this.validatePageLink = '';
    this.classValidatePageLink = '';
    // end

    this.validateTitle = '';
    this.classValidate = '';
    this.helpBlock ='';

    // page search
    this.listPageSearch = [];
    this.displayListPage = 'none';
    this.disableButtonAddPage = '';

    // state disable button khong cho them khi ten danh muc da ton tai
    this.disabledButton = '';

    this.idtest = 111;

    this.textFind = '';
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
    // HomeMenuAction.getListCha();
    // HomeMenuAction.getListChild();
    // HomeMenuAction.getListSubChild();
    this.modalIsOpen=false;
    HomeMenuAction.testGetListCha();
  }
  onAddItemMenuFail(mess){
    console.log(mess);
  }

  onDeleteChaSuccess(mes){
    // HomeMenuAction.getListCha();
    // HomeMenuAction.getListChild();
    // HomeMenuAction.getListSubChild();
    HomeMenuAction.testGetListCha();
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
  }
  onTestGetListChauFail(jqXhr){
    console.log("khong get dc danh sach con");
  }

  //=====================end=================//

  onGetListChaSuccess(data){
    this.listCha=data;
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
    HomeMenuAction.testGetListCha();
    // HomeMenuAction.getListCha();
    // HomeMenuAction.getListChild();
    // HomeMenuAction.getListSubChild();
  }
  moveUpOrderFail(jqXhr){
    console.log("khong get dc danh sach con");
  }
  moveDownOrderSuccess(data){
    HomeMenuAction.testGetListCha();
    // HomeMenuAction.getListCha();
    // HomeMenuAction.getListChild();
    // HomeMenuAction.getListSubChild();
  }
  moveDownOrderFail(jqXhr){
    console.log("khong get dc danh sach con");
  }

  onOpenMoDEditLinkToPage(payload){

    this.modalIsOpenEditLinkPage = true;
    this.idEditLinkToPage = payload.id;
    this.typeEditPageLink = payload.type;
    this.pagelink = payload.pageId;
    this.pageTitle = payload.pageTitle;

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
  onUpdateSelectPage(payload){
    this.pagelink = payload.idPage;
    this.pageTitle = payload.pageTitle;
    console.log(this.pagelink);
    this.displayListPage = 'none';
    this.disableButtonAddPage = '';
  }


  onInvalidPageLink(){
    this.classValidatePageLink = 'has-error';
    this.validatePageLink = 'Vui lòng chọn trang';
  }
  onEditLinkToPageSuccess(data){
    this.modalIsOpenEditLinkPage = false;
    HomeMenuAction.testGetListCha();
    // HomeMenuAction.getListCha();
    // HomeMenuAction.getListChild();
    // HomeMenuAction.getListSubChild();
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

  onUpdateLinkToPage(event){
    this.pageTitle = event.target.value;
    HomeMenuAction.searchPage(this.pageTitle);
    this.classValidatePageLink = '';
    this.validatePageLink = '';
    if(this.pageTitle===''){
      this.pagelink = undefined;
      this.displayListPage = 'none';
      this.disableButtonAddPage = '';
    }
  }

  onSearchPageSuccess(data){
    this.listPageSearch = data;
    this.displayListPage = 'block';
    if(data.length==0){
      this.disableButtonAddPage = 'disabled';
    }
    console.log(data);
  }

  onUpdateTextFind(event){
    this.textFind = event.target.value;
  }
  
}

export default alt.createStore(HomeMenuStore);
