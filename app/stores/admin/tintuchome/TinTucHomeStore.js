import alt from '../../../alt';
import TinTucHomeAction from '../../../actions/admin/tintuchome/TinTucHomeAction';

class TinTucHomeStore {
  constructor() {
    this.bindActions(TinTucHomeAction);

    this.idTinTucHome = '';
    this.titleTinTucHome = '';
    this.contentLeft = '';
    this.linkChitiet = '';
    this.hienthi = 1;
    this.checkHienThi = 'checked';
    this.modalIsOpen = false;


    this.helpBlockAddTinTuc = '';
    this.helpBlockTitle = '';
    this.helpBlockContent = '';
    this.helpBlockLinkTinTuc = '';

    // initial state for list page
    this.listTinTuc = [];

    // initial for delete page
    this.modalIsOpenDeleteTinTuc = false;
    this.idTinTucToDelete = '';

    this.textButton = 'Thêm';

    this.listTinTucSearch = [];

    this.nameTinTuc = '';
    this.displayListTinTuc = 'none';
    this.disableButtonAddPage = '';

    this.a = [];
  }

  onUpdateTitleTinTucHome(event){
    this.helpBlockAddTinTuc = '';
    this.titleTinTucHome = event.target.value;
  }

  onUpdateLinkChitiet(event){
    this.linkChitiet = event.target.value;
    TinTucHomeAction.searchTinTuc(this.linkChitiet);

    if(this.linkChitiet===''){
      this.linkChitiet = undefined;
      this.displayListTinTuc = 'none';
      this.disableButtonAddPage = '';
    }
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

  // =========== validate ============== //
  onInvalidTitle(){
      this.helpBlockTitle = 'Vui lòng nhập tiêu đề';
  }

  onInvalidContent(){
      this.helpBlockContent = 'Vui lòng nhập nội dung';
  }
  onInvalidLinkChitiet(){
      this.helpBlockLinkTinTuc = 'Vui lòng chọn link tin tức';
  }

  // ====== add page success =========== //
  onAddTinTucHomeSuccess(data){
      this.helpBlockAddTinTuc = 'Thêm tin thành công!';
      this.idTinTucHome = '';
      this.titleTinTucHome = '';
      this.contentLeft = '';
      this.linkChitiet = '';
      CKEDITOR.instances.editor_1.setData('');

      this.helpBlockTitle = '';
      this.helpBlockContent = '';
      this.helpBlockLinkTinTuc = '';

      this.modalIsOpenDeleteTinTuc = false;
      this.idTinTucToDelete = '';

      this.textButton = 'Thêm';

      TinTucHomeAction.getListTinTuc();
  }

  onAddTinTucHomeFail(jqXhr){
      console.log('add page fail');
  }

  // ========= get list page ==============//
  onGetListTinTucHomeSuccess(data){
    this.listTinTuc = data;
  }

  onGetListTinTucHomeFail(jqXhr){
    console.log("khong get dc danh sach page");
  }

  onCloseModal(){
    this.modalIsOpen = false;
  }
  
  onGetTinTucHomeSuccess(data){
    this.modalIsOpen = true;
    this.idTinTucHome = data._id;
    this.titleTinTucHome = data.title;
    this.contentLeft = data.content;
    this.linkChitiet = data.linkChitiet;
    this.hienthi = data.hienthi;
    if(this.hienthi){
      this.checkHienThi = 'checked';
    }
    else this.checkHienThi = '';
    // console.log(data);  

    this.helpBlockTitle = '';
    this.helpBlockContent = '';
    this.helpBlockLinkTinTuc = '';

    this.helpBlockAddTinTuc = '';
    this.textButton = 'Lưu';
  }

  onGetTinTucHomeFail(jqXhr){
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
    TinTucHomeAction.getListTinTuc();
    console.log(data);
  }

  onDeleteTinTucFail(jqXhr){
    console.log('khong xoa dc sach');
  }

  //update page
  onUpdateTinTucHomeSuccess(data){
    this.idTinTucHome = '';
    this.titleTinTucHome = '';
    this.contentLeft = '';
    this.linkChitiet = '';
    CKEDITOR.instances.editor_1.setData('');

    this.helpBlockTitle = '';
    this.helpBlockContent = '';
    this.helpBlockLinkTinTuc = '';

    this.helpBlockAddTinTuc = 'Cập nhật tin thành công';
    this.textButton = 'Thêm';

    this.idTinTucToDelete = '';
    this.modalIsOpenDeleteTinTuc = false;

    TinTucHomeAction.getListTinTuc();
  }

  onUpdateTinTucHomeFail(data){
    console.log(data);
  }

  onSearchTinTucSuccess(data){
    this.listTinTucSearch = data;
    this.displayListTinTuc = 'block';
    if(data.length==0){
        this.disableButtonAddPage = 'disabled';
    }
  }

  onUpdateTinTucSelect(payload){
    this.linkChitiet = payload.slug;
    this.displayListTinTuc = 'none';
    this.disableButtonAddPage = '';
  }

  // get list tin tuc to display home
  onGetListTinTucToDisplayHomeSuccess(data){
    this.a = data;
    console.log(data);
  }
  onGetListTinTucToDisplayHomeFail(data){
    console.log(data);
  }

}

export default alt.createStore(TinTucHomeStore);
