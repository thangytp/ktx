import alt from '../../../alt';
import KhoaAdminAction from '../../../actions/admin/khoa/KhoaAdminAction';

class KhoaAdminStore {
  	constructor() {
    	this.bindActions(KhoaAdminAction);

    	this.id = '';
    	this.ten = '';
    	this.helpBlockTen = '';
    	this.classValidate = '';
    	this.validateTitle = '';

    	this.modalIsOpen = false;

    	this.idKhoaToDel = '';
    	this.modalIsOpenDelete = false;

    	this.listKhoa = [];
	}

	onUpdateTen(e){
		this.ten = e.target.value;
	}

	onEditKhoa(payload){
		this.id = payload.id;
		this.ten = payload.ten;
	}

	onGetListKhoaSuccess(data){
		this.listKhoa = data;
	}
	onGetListKhoaFail(data){
		console.log(data);
	}

	onAddKhoaSuccess(data){
		this.id = '';
    	this.ten = '';
    	this.classValidate = '';
    	this.validateTitle = '';

    	KhoaAdminAction.getListKhoa();
    	this.modalIsOpen = false;
	}
	onAddKhoaFail(data){
		console.log(data);
	}

	onUpdateKhoaSuccess(data){
		this.id = '';
    	this.ten = '';
		console.log('cap nhat thanh cong');
		KhoaAdminAction.getListKhoa();
	}
	onUpdateKhoaFail(data){
		console.log('Cap nhat khoa khong thanh cong');
	}

	onOpenMoDDeleteKhoa(id){
		this.idKhoaToDel = id;
		this.modalIsOpenDelete = true;
	}
	onCloseModalDelete(){
		this.modalIsOpenDelete = false;
	}

	onOpenMoD(){
		this.modalIsOpen = true;
	}
	onCloseModal(){
		this.modalIsOpen = false;
	}

	onDeleteKhoaSuccess(data){
		console.log('delete thanh cong');

	}
	onDeleteKhoaFail(data){
		console.log('delete that bai');
	}
}

export default alt.createStore(KhoaAdminStore);