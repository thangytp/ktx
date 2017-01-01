import alt from '../../../alt';
import QuanLyTinTucAction from '../../../actions/admin/quanlytintuc/QuanLyTinTucAction';

class QuanLyTinTucStore {
  constructor() {
    this.bindActions(QuanLyTinTucAction);

    this.idTinTuc = '';
    this.titleTinTuc = '';
    this.contentLeft = '';
    this.description = '';

    this.hienthi = 1;
    this.checkHienThi = 'checked';

    this.fileAvatar ={};
    this.imagePreviewUrl='/uploads/LogoBK.png';
    this.imageUrl='/uploads/LogoBK.png';
    this.helpBlockUpload = '';

    this.helpBlockAddTinTuc = '';
    this.helpBlockTitle = '';
    this.helpBlockContent = '';
    this.helpBlockDescription = '';

    // initial state for list page
    this.listTinTuc = [];

    // initial for delete page
    this.modalIsOpenDeleteTinTuc = false;
    this.idTinTucToDelete = '';

    this.textButton = 'Thêm';

    this.listTinTucBottom = [];

    this.tinByLink = {};

    this.tinSearch = [];
  }

  onUpdateTitleTinTuc(event){
    this.helpBlockAddTinTuc = '';
    this.titleTinTuc = event.target.value;
  }
  onUpdateDescription(e){
    this.description = e.target.value;
  }

  onUpdateHienThi(){
    if(this.hienthi){
        this.hienthi = 0;
        this.checkHienThi = '';
    }
    else{
        this.hienthi = 1;
        this.checkHienThi = 'checked';
    }
  }

  onUpdateImagepreview(imgURL)
  {
      this.imagePreviewUrl = imgURL;
  }
  onUpdateImagefile(file)
  {
      this.fileAvatar = file;
  }

  onHandleUpload()
  {
      this.helpBlockUpload ="Đang tải lên....";
  }
  onUploadSuccess(link){
      this.helpBlockUpload ="Tải lên thành công";
      this.imageUrl=link;
      console.log("link:" + link);
  }
  onUploadFail(jqXhr){
      this.helpBlockUpload ="Quá trình tải thất bại";
      toastr.error(jqXhr.responseJSON.message);
  }

  // =========== validate ============== //
  onInvalidTitle(){
      this.helpBlockTitle = 'Vui lòng nhập tiêu đề';
  }

  onInvalidContent(){
      this.helpBlockContent = 'Vui lòng nhập nội dung';
  }
  onInvalidDes(){
      this.helpBlockDescription = 'Vui lòng nhập nội dung rút gọn';
  }

  // ====== add page success =========== //
  onAddTinTucSuccess(data){
      this.helpBlockAddTinTuc = 'Thêm trang thành công!';
      this.idTinTuc = '';
      this.titleTinTuc = '';
      this.contentLeft = '';
      CKEDITOR.instances.ckedit.setData('');
      this.description = '';
      this.hienthi = 1;
      this.checkHienThi = 'checked';

      this.fileAvatar ={};
      this.imagePreviewUrl='/uploads/LogoBK.png';
      this.imageUrl='/uploads/LogoBK.png';
      this.helpBlockUpload = '';

      this.helpBlockTitle = '';
      this.helpBlockContent = '';
      this.helpBlockDescription = '';

      this.modalIsOpenDeleteTinTuc = false;
      this.idTinTucToDelete = '';

      this.textButton = 'Thêm';

      QuanLyTinTucAction.getListTinTuc();
  }

  onAddTinTucFail(jqXhr){
      console.log('add page fail');
  }

  // ========= get list page ==============//
  onGetListTinTucSuccess(data){
    this.listTinTuc = data;
    console.log(data);
  }

  onGetListTinTucFail(jqXhr){
    console.log("khong get dc danh sach page");
  }

  onGetTinTucSuccess(data){
    this.idTinTuc = data._id;
    this.titleTinTuc = data.title;
    this.contentLeft = data.content;
    CKEDITOR.instances.ckedit.setData(data.content);

    this.description = data.description;
    this.hienthi = data.hienthi ? data.hienthi : 0;
    if(this.hienthi){
      this.checkHienThi = 'checked';
    }
    else this.checkHienThi = '';

    this.fileAvatar ={};
    this.imagePreviewUrl= data.img? data.img : '/uploads/LogoBK.png';
    this.imageUrl= data.img ? data.img : '/uploads/LogoBK.png';
    this.helpBlockUpload = '';

    this.helpBlockTitle = '';
    this.helpBlockContent = '';
    this.helpBlockDescription = '';

    this.helpBlockAddTinTuc = '';
    this.textButton = 'Lưu';
  }

  onGetTinTucFail(jqXhr){
    console.log('get page fail');
  }

  //delte page
  onOpenMoDDeleteTinTuc(id){
    this.idTinTucToDelete = id;
    this.modalIsOpenDeleteTinTuc = true;
  }

  onCloseModalDeleteTinTuc(){
    this.idTinTucToDelete = '';
    this.modalIsOpenDeleteTinTuc = false;
  }

  onDeleteTinTucSucess(data){

    this.idTinTucToDelete = '';
    this.modalIsOpenDeleteTinTuc = false;
    QuanLyTinTucAction.getListTinTuc();
    console.log(data);
  }

  onDeleteTinTucFail(jqXhr){
    console.log('khong xoa dc sach');
  }

  //update page 
  onUpdateTinTucSuccess(data){
    this.idTinTuc = '';
    this.titleTinTuc = '';
    this.contentLeft = '';
    CKEDITOR.instances.ckedit.setData('');

    this.description = '';
    this.hienthi = 1;
    this.checkHienThi = 'checked';

    this.fileAvatar ={};
    this.imagePreviewUrl='/uploads/LogoBK.png';
    this.imageUrl='/uploads/LogoBK.png';
    this.helpBlockUpload = '';

    this.helpBlockTitle = '';
    this.helpBlockContent = '';
    this.helpBlockDescription = '';

    this.helpBlockAddTinTuc = data.message;
    this.textButton = 'Thêm';

    this.idTinTucToDelete = '';
    this.modalIsOpenDeleteTinTuc = false;

    QuanLyTinTucAction.getListTinTuc();
  }

  onUpdateTinTucFail(data){
    console.log(data);
  }

  onGetListTinTucBottomSuccess(data){
    this.listTinTucBottom = data;
  }
  onGetListTinTucBottomFail(data){
    console.log(data);
  }

  onGetTinTucByLinkSuccess(data){
    this.tinByLink = data;
  }
  onGetTinTucByLinkFail(data){
    console.log(data);
  }

  onGetTinTucByTitleSuccess(data){
     this.tinSearch = data;
  }
  onGetTinTucByTitleFail(data){
    console.log('khong search dc tin tuc');
  }

}

export default alt.createStore(QuanLyTinTucStore);
