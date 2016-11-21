import alt from '../../../alt';
import AddPageAction from '../../../actions/admin/page/AddPageAction';

class AddPageStore {
  constructor() {
    this.bindActions(AddPageAction);

    this.idPage = '';
    this.titlePage = '';
    this.contentLeft = '';

    this.layoutType = 1;
    this.checkedLayoutOne = "checked";
    this.checkedLayoutTwo = '';

    this.styleContentRight = 'none';
    this.numberOfImageItem = 0;
    this.numberOfVideoItem = 0;
    this.fileAvatar ={};
    this.imagePreviewUrl='/uploads/LogoBK.png';
    this.imageUrl='/uploads/LogoBK.png';

    this.cotphaiHome = 0;
    this.styleCustomContentRight = '';
    this.arrImg = [];
    this.arrVideo = [];

    this.modalIsOpenDelete = false;
    this.idItemImgDelete = '';
    this.idItemVideoDelete = '';
    this.typeItemDelete = '';

    this.helpBlockAddPage = '';
    this.helpBlockTitle = '';
    this.helpBlockContent = '';
    this.helpBlockContentRight = '';
    this.helpBlockImage = '';
    this.helpBlockVideo = '';

    // initial state for list page
    this.listPage = [];
  }

  onUpdateTitlePage(event){
    this.titlePage = event.target.value;
  }

  onShowContentRight(){
    this.layoutType = 2;
    this.checkedLayoutOne = "";
    this.checkedLayoutTwo = 'checked';
    this.styleContentRight = 'block';
  }
  onHideContentRight(){
    this.layoutType = 1;
    this.checkedLayoutOne = "checked";
    this.checkedLayoutTwo = '';
    this.styleContentRight = 'none';
  }


  onAddImg(){
    this.numberOfImageItem +=1;
    var imgText = 'imgText';
    var imgLink = 'imgLink';
    var linkToPage = 'linkToPage';
    this.arrImg.push({imgText : '', imgLink : '', linkToPage: ''});
    console.log(this.arrImg);
  }
  onAddVideo(){
    this.numberOfVideoItem +=1;
    var videoText = 'videoText';
    var videoLink = 'videoLink';
    this.arrVideo.push({videoText : '', videoLink : ''});
  }
  
  onCotphaiHome(){
    if(this.cotphaiHome){
      this.cotphaiHome = 0;
      this.styleCustomContentRight = 'block';
    }
    else{ this.cotphaiHome = 1; this.styleCustomContentRight = 'none';}
  }

  onUpdateImgText(payload){
    this.arrImg[payload.id].imgText = payload.text;
    console.log(this.arrImg);
  }
  onUpdateImgLink(payload){
    this.arrImg[payload.id].imgLink = payload.link;
    console.log(this.arrImg);
  }
  onUpdateLinkToPage(payload){
    this.arrImg[payload.id].linkToPage = payload.linkToPage;
    console.log(this.arrImg);
  }

   onUpdateVideoText(payload){
    this.arrVideo[payload.id].videoText = payload.text;
    console.log(this.arrVideo);
  }
  onUpdateVideoLink(payload){
    this.arrVideo[payload.id].videoLink = payload.link;
    console.log(this.arrVideo);
  }

// ======================== modal delete =====================//
  onOpenModalDelete(payload){
    if(payload.type == 'img')
    {
      this.idItemImgDelete = payload.id;
      this.typeItemDelete = 'img';
    }
    else if(payload.type=="video"){
      this.idItemVideoDelete = payload.id;
      this.typeItemDelete = 'video';
    }
    this.modalIsOpenDelete = true;
  }
  onCloseModalDelete(){
      this.idItemImgDelete = '';
      this.idItemVideoDelete = '';
      this.typeItemDelete = '';
      this.modalIsOpenDelete = false;
  }
  onDeleteItemOfRight(){
    if(this.typeItemDelete == 'img'){
      this.numberOfImageItem = this.numberOfImageItem -1;
      this.arrImg.splice(this.idItemImgDelete, 1);
      this.modalIsOpenDelete = false;
      console.log(this.arrImg);
    }
    else if(this.typeItemDelete == 'video'){
      this.numberOfVideoItem = this.numberOfVideoItem -1;
      this.arrVideo.splice(this.idItemVideoDelete, 1);
      this.modalIsOpenDelete = false;
      console.log(this.arrVideo);
    }
    
  }

//======================= end =================================//

  // =========== validate ============== //
  onInvalidTitle(){
      this.helpBlockTitle = 'Vui lòng nhập tên trang';
  }
  onInvalidContent(){
      this.helpBlockContent = 'Vui lòng nhập nội dung';
  }
  onInvalidContentRight(){
      this.helpBlockContentRight = 'Không được để trống nội dung cột phải';
  }
  onInvalidImgLink(){
      this.helpBlockImage = 'Link hình ảnh không được để trống';
  }
  onInvalidVideoLink(){
      this.helpBlockVideo = 'Link video không được để trống';
  }

  // ====== add page success =========== //
  onAddPageSuccess(data){
      this.helpBlockAddPage = 'Thêm trang thành công!';
      this.idPage = '';
      this.titlePage = '';
      this.contentLeft = '';
      CKEDITOR.instances.ckedit.setData('');

      this.layoutType = 1;
      this.checkedLayoutOne = "checked";
      this.checkedLayoutTwo = '';

      this.styleContentRight = 'none';
      this.numberOfImageItem = 0;
      this.numberOfVideoItem = 0;

      this.cotphaiHome = 0;
      this.styleCustomContentRight = '';
      this.arrImg = [];
      this.arrVideo = [];

      this.modalIsOpenDelete = false;
      this.idItemImgDelete = '';
      this.idItemVideoDelete = '';
      this.typeItemDelete = '';

      this.helpBlockTitle = '';
      this.helpBlockContent = '';
      this.helpBlockContentRight = '';
      this.helpBlockImage = '';
      this.helpBlockVideo = '';

      AddPageAction.getListPage();
  }
  onAddPageFail(jqXhr){
      console.log('add page fail');
  }

  // ========= get list page ==============//
  onGetListPageSuccess(data){
    this.listPage = data;
  }
  onGetListPageFail(jqXhr){
    console.log("khong get dc danh sach page");
  }

  onGetPageSuccess(data){
    this.idPage = data._id;
    this.titlePage = data.title;
    this.contentLeft = data.content;
    CKEDITOR.instances.ckedit.setData(data.content);

    this.layoutType = data.layoutType;
    if(this.layoutType==1){
      this.checkedLayoutOne = "checked";
      this.checkedLayoutTwo = '';
      this.styleContentRight = 'none';
    }
    else{
      this.checkedLayoutOne = "";
      this.checkedLayoutTwo = 'checked';
      this.styleContentRight = 'block';
    }

    // this.styleContentRight = 'none';
    this.numberOfImageItem = data.imgRight.length? data.imgRight.length : 0;
    this.numberOfVideoItem = data.videoRight.length? data.videoRight.length : 0;
    
    this.cotphaiHome = data.cotPhaiHome? data.cotPhaiHome : 0;
    if(this.cotphaiHome==1){
      this.styleCustomContentRight = 'none';
    }
    else{
      this.styleCustomContentRight = 'block';
    }
    // this.styleCustomContentRight = '';
    this.arrImg = data.imgRight;
    this.arrVideo = data.videoRight;

    this.modalIsOpenDelete = false;
    this.idItemImgDelete = '';
    this.idItemVideoDelete = '';
    this.typeItemDelete = '';

    this.helpBlockAddPage = '';
    this.helpBlockTitle = '';
    this.helpBlockContent = '';
    this.helpBlockContentRight = '';
    this.helpBlockImage = '';
    this.helpBlockVideo = '';
  }
  onGetPageFail(jqXhr){
    console.log('get page fail');
  }

  //delte page
  onDeletePageSucess(data){
    AddPageAction.getListPage();
    console.log(data);
  }
  onDeletePageFail(jqXhr){
    console.log('khong xoa dc sach');
  }

  //update page 
  onUpdatePageSuccess(data){
    this.idPage = '';
    this.titlePage = '';
    this.contentLeft = '';
    CKEDITOR.instances.ckedit.setData('');

    this.layoutType = 1;
    this.checkedLayoutOne = "checked";
    this.checkedLayoutTwo = '';

    this.styleContentRight = 'none';
    this.numberOfImageItem = 0;
    this.numberOfVideoItem = 0;

    this.cotphaiHome = 0;
    this.styleCustomContentRight = '';
    this.arrImg = [];
    this.arrVideo = [];

    this.modalIsOpenDelete = false;
    this.idItemImgDelete = '';
    this.idItemVideoDelete = '';
    this.typeItemDelete = '';

    this.helpBlockTitle = '';
    this.helpBlockContent = '';
    this.helpBlockContentRight = '';
    this.helpBlockImage = '';
    this.helpBlockVideo = '';

    AddPageAction.getListPage();
    console.log(data);
  }
  onUpdatePageFail(data){
    console.log(data);
  }

}

export default alt.createStore(AddPageStore);
