import alt from '../../../alt';
import LienKetSiteAction from '../../../actions/admin/lienketsite/LienKetSiteAction';

class LienKetSiteStore {
  	constructor() {
    	this.bindActions(LienKetSiteAction);

    	this.id= '';
    	this.name = '';
    	this.link = '';
    	this.image = '';

    	this.helpBlockName = '';
    	this.helpBlockLink = '';
    	this.helpBlockLogo = '';
      this.modalIsOpen = false;
    	this.listSite = [];

    	this.idToDelete = '';
    	this.modalIsOpenDelete = false;
	}

	onGetListSiteSuccess(data){
		this.listSite = data;
	}
	onGetListPageFail(data){
		console.log(data);
	}

  onCloseModal(){
    this.modalIsOpen = false;
  }

	onAddSiteSuccess(data){
		this.id= '';
    	this.name = '';
    	this.link = '';
    	this.image = '';
    	this.helpBlockName = '';
    	this.helpBlockLink = '';
    	this.helpBlockLogo = '';
    	LienKetSiteAction.getListSite();
	}
	onAddSiteFail(data){
		console.log('Add site khong thanh cong');
	}

	onUpdateSiteSuccess(data){
		this.id= '';
    	this.name = '';
    	this.link = '';
    	this.image = '';
    	LienKetSiteAction.getListSite();
	}
	onUpdateSiteFail(data){
		console.log('Cap nhat khong thanh cong');
	}

	onUpdateName(e){
		this.name = e.target.value;
	}
	onUpdateLink(e){
		this.link = e.target.value;
	}
	onUpdateLogo(e){
		this.image = e.target.value;
	}

	onInvalidName(){
		this.helpBlockName = 'Vui lòng nhập tên site';
	}
	onInvalidLink(){
		this.helpBlockLink = 'Vui lòng nhập link site';
	}
	onInvalidLogo(){
		this.helpBlockLogo = 'Vui lòng nhập đường dẫn logo site';
	}

	onOpenMoDDelete(id){
		this.idToDelete = id;
		this.modalIsOpenDelete = true;
	}
	onCloseModalDelete(){
		this.idToDelete = '';
		this.modalIsOpenDelete = false;
	}

	onDeleteSiteSuccess(data){
		console.log(data);
		this.idToDelete = '';
		this.modalIsOpenDelete = false;
		LienKetSiteAction.getListSite();
	}
	onDeleteSiteFail(){
		console.log('khong delete dc');
	}

	onGetSiteSuccess(data){
    this.modalIsOpen = true;
		this.id= data._id;
    	this.name = data.name;
    	this.link = data.link;
    	this.image = data.image;

    	this.helpBlockName = '';
    	this.helpBlockLink = '';
    	this.helpBlockLogo = '';
	}
	onGetSiteFail(data){
		console.log(data);
	}

}

export default alt.createStore(LienKetSiteStore);
