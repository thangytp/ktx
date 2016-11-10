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

    this.helpBlockUpload ='';
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
    this.arrImg.push({imgText : '', imgLink : ''});
    console.log(this.arrImg);
  }
  onAddVideo(){
    this.numberOfVideoItem +=1;
    var videoText = 'videoText';
    var videoLink = 'videoLink';
    this.arrVideo.push({videoText : '', videoLink : ''});
  }
  onUploadSuccess(link)
  {
      this.helpBlockUpload ="Tải lên thành công";
      this.imageUrl=link;
      console.log(this.imageUrl);
  }
  onUploadFail(jqXhr)
  {
   this.helpBlockUpload ="Quá trình tải thất bại";
   toastr.error(jqXhr.responseJSON.message);
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

}

export default alt.createStore(AddPageStore);
