import alt from '../../../alt';
import CotPhaiHomeAction from '../../../actions/admin/cotphaihome/CotPhaiHomeAction';

class CotPhaiHomeStore {
  	constructor() {
    	this.bindActions(CotPhaiHomeAction);

    	this.idImage= '';
    	this.nameImage = '';
    	this.linkToPage = '';
    	this.image = '';
    	this.textButtonImage = 'Thêm';

    	this.helpBlockNameImage = '';
    	this.helpBlockLinkToPage = '';
    	this.helpBlockImage = '';

    	this.idVideo = '';
    	this.nameVideo = '';
    	this.linkVideo ='';
    	this.helpBlockNameVideo = '';
    	this.helpBlockLinkVideo = '';
    	this.textButtonVideo = 'Thêm';

    	this.listItem = [];

    	this.idToDelete = '';
    	this.modalIsOpenDelete = false;

    	this.modalIsOpenSelectImage = false;

    	this.stateAddItemImage = '';
    	this.stateAddItemVideo = '';

    	this.nameItemMenu = '';
    	this.displayListPage = 'none';
    	this.disableButtonAddPage = '';
    	this.listMenuSearch = [];
	}

	onGetListItemSuccess(data){
		this.listItem = data;
	}
	onGetListItemFail(data){
		console.log(data);
	}

	onAddItemImageSuccess(data){
		this.idImage= '';
    	this.nameImage = '';
    	this.linkToPage = '';
    	this.image = '';
    	this.textButtonImage = 'Thêm';

    	this.stateAddItemImage = 'Thêm item thành công';

    	this.helpBlockNameImage = '';
    	this.helpBlockLinkToPage = '';
    	this.helpBlockImage = '';
    	CotPhaiHomeAction.getListItem();
	}
	onAddItemImageFail(data){
		console.log('Add item khong thanh cong');
	}

	onUpdateItemImageSuccess(data){
		this.idImage= '';
    	this.nameImage = '';
    	this.linkToPage = '';
    	this.image = '';
    	this.textButtonImage = 'Thêm';

    	this.stateAddItemImage = 'Cập nhật item thành công';

    	this.helpBlockNameImage = '';
    	this.helpBlockLinkToPage = '';
    	this.helpBlockImage = '';
    	CotPhaiHomeAction.getListItem();
	}
	onUpdateItemImageFail(data){
		console.log('Cap nhat khong thanh cong');
		this.stateAddItemImage = 'Cập nhật item thất bại';
	}

	onAddItemVideoSuccess(data){
		this.idVideo = '';
    	this.nameVideo = '';
    	this.linkVideo ='';
    	this.helpBlockNameVideo = '';
    	this.helpBlockLinkVideo = '';
    	this.textButtonVideo = 'Thêm';

    	this.stateAddItemVideo = 'Thêm item thành công';

    	CotPhaiHomeAction.getListItem();
	}
	onAddItemVideoFail(data){
		console.log(data);
	}
    onUpdateItemVideoSuccess(data){
    	this.idVideo = '';
    	this.nameVideo = '';
    	this.linkVideo ='';
    	this.helpBlockNameVideo = '';
    	this.helpBlockLinkVideo = '';
    	this.textButtonVideo = 'Thêm';

    	this.stateAddItemVideo = 'Cập nhật item thành công';

    	CotPhaiHomeAction.getListItem();
    }
    onUpdateItemVideoFail(data){
    	console.log(data);
    	this.stateAddItemVideo = 'Cập nhật item thất bại';
    }

	//function update value for input
	onUpdateNameImage(e){
		this.stateAddItemImage = '';
		this.nameImage = e.target.value;
	}
	onUpdateLink(e){
		this.linkToPage = e.target.value;
		CotPhaiHomeAction.searchItemMenu(this.linkToPage);
	    this.classValidatePageLink = '';
	    this.validatePageLink = '';
	    if(this.linkToPage===''){
	      this.linkToPage = undefined;
	      this.displayListPage = 'none';
	      this.disableButtonAddPage = '';
	    }
	}
	onUpdateItemMenuSelect(payload){
		this.linkToPage = payload.slug;
		this.nameItemMenu = payload.title;
		this.displayListPage = 'none';
    	this.disableButtonAddPage = '';
    	console.log(this.linkToPage);
	}
	
	onUpdateImage(link){
		this.image = link;
		this.modalIsOpenSelectImage = false;
	}

	onUpdateNameVideo(e){
		this.stateAddItemVideo = '';
		this.nameVideo = e.target.value;
	}
	onUpdateLinkVideo(e){
		this.linkVideo = e.target.value;
	}

	//end

	//function valide input
	onInvalidNameImage(){
		this.helpBlockNameImage = 'Vui lòng nhập tên item';
	}
	onInvalidLinkToPage(){
		this.helpBlockLinkToPage = 'Vui lòng nhập link item';
	}
	onInvalidImage(){
		this.helpBlockImage = 'Vui lòng chọn hình ảnh';
	}
	onInvalidNameVideo(){
		this.helpBlockNameVideo = 'Vui lòng nhập tên item';
	}
	onInvalidLinkVideo(){
		this.helpBlockLinkVideo = 'Vui lòng nhập link video';
	}

	//end

	onOpenMoDDelete(id){
		this.idToDelete = id;
		this.modalIsOpenDelete = true;
	}
	onCloseModalDelete(){
		this.idToDelete = '';
		this.modalIsOpenDelete = false;
	}

	onDeleteItemSuccess(data){
		console.log(data);
		this.idToDelete = '';
		this.modalIsOpenDelete = false;
		CotPhaiHomeAction.getListItem();
	}
	onDeleteItemFail(){
		console.log('khong delete dc');
	}

	onGetItemSuccess(payload){
		if(payload.type === 'image'){
			this.idImage= payload.data._id;
	    	this.nameImage = payload.data.name;
	    	this.linkToPage = payload.data.linkToPage;
	    	this.image = payload.data.image;
	    	this.textButtonImage = 'Lưu';

	    	this.helpBlockNameImage = '';
	    	this.helpBlockLinkToPage = '';
	    	this.helpBlockImage = '';
		}
		else if(payload.type === 'video'){
			this.idVideo = payload.data._id;
	    	this.nameVideo = payload.data.name;
	    	this.linkVideo =payload.data.linkVideo;
	    	this.helpBlockNameVideo = '';
	    	this.helpBlockLinkVideo = '';
	    	this.textButtonVideo = 'Lưu';
		}
		
	}
	onGetItemFail(data){
		console.log(data);
	}

	onOpenModalSelectImage(){
		this.modalIsOpenSelectImage = true;
	}
	onCloseModalSelectImage(){
		this.modalIsOpenSelectImage = false;
	}

	onSearchItemMenuSuccess(data){
		this.listMenuSearch = data.itemMenuChilds.concat(data.itemMenuSubChilds);
		this.displayListPage = 'block';
	    if(data.length==0){
	      this.disableButtonAddPage = 'disabled';
	    }
	}

}

export default alt.createStore(CotPhaiHomeStore);