import alt from '../../../alt';
import AddItemMenuAction from '../../../actions/admin/menu/AddItemMenuAction';

class AddItemMenuStore {
  constructor() {
    this.bindActions(AddItemMenuAction);
    this.styleContentRight = 'none';
    this.numberOfImageItem = 0;
    this.fileAvatar ={};
    this.imagePreviewUrl='/uploads/LogoBK.png';
    this.imageUrl='/uploads/LogoBK.png';

    this.helpBlockUpload ='';
  }
  onShowContentRight(){
    this.styleContentRight = 'block';
  }
  onHideContentRight(){
    this.styleContentRight = 'none';
  }

  onHandleUpload()
  {
   this.helpBlockUpload ="Đang tải lên....";
  }
  onUpdateImagepreview(imgURL)
  {
        this.imagePreviewUrl = imgURL;
  }
  onUpdateImagefile(file)
  {
        this.fileAvatar = file;
  }

  onAddImg(){
    this.numberOfImageItem +=1;
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
  
}

export default alt.createStore(AddItemMenuStore);
