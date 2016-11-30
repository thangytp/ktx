import alt from '../../../alt';
import QuanLyTinTucAction from '../../../actions/admin/quanlytintuc/QuanLyTinTucAction';

class QuanLyTinTucStore {
  constructor() {
    this.bindActions(QuanLyTinTucAction);

    this.idTinTuc = '';
    this.titleTinTuc = '';
    this.contentLeft = '';

    this.helpBlockAddTinTuc = '';
    this.helpBlockTitle = '';
    this.helpBlockContent = '';

    // initial state for list page
    this.listTinTuc = [];

    // initial for delete page
    this.modalIsOpenDeleteTinTuc = false;
    this.idTinTucToDelete = '';

    this.textButton = 'Thêm';

    this.listTinTucBottom = [];

    this.tinByLink = {};
  }

  onUpdateTitleTinTuc(event){
    this.helpBlockAddTinTuc = '';
    this.titleTinTuc = event.target.value;
  }

  // =========== validate ============== //
  onInvalidTitle(){
      this.helpBlockTitle = 'Vui lòng nhập tiêu đề';
  }

  onInvalidContent(){
      this.helpBlockContent = 'Vui lòng nhập nội dung';
  }

  // ====== add page success =========== //
  onAddTinTucSuccess(data){
      this.helpBlockAddTinTuc = 'Thêm trang thành công!';
      this.idTinTuc = '';
      this.titleTinTuc = '';
      this.contentLeft = '';
      CKEDITOR.instances.ckedit.setData('');

      this.helpBlockTitle = '';
      this.helpBlockContent = '';

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
  }

  onGetListTinTucFail(jqXhr){
    console.log("khong get dc danh sach page");
  }

  onGetTinTucSuccess(data){
    this.idTinTuc = data._id;
    this.titleTinTuc = data.title;
    this.contentLeft = data.content;
    CKEDITOR.instances.ckedit.setData(data.content);

    this.helpBlockTitle = '';
    this.helpBlockContent = '';

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

    this.helpBlockTitle = '';
    this.helpBlockContent = '';

    this.helpBlockAddTinTuc = 'Cập nhật trang thành công';
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

}

export default alt.createStore(QuanLyTinTucStore);
