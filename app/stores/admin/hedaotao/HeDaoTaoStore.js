import alt from '../../../alt';
import HeDaoTaoAction from '../../../actions/admin/hedaotao/HeDaoTaoAction';

class HeDaoTaoStore {
  	constructor() {
    	this.bindActions(HeDaoTaoAction);

    	this.id = '';
    	this.ten = '';
    	this.helpBlockTen = '';
    	this.classValidate = '';
    	this.validateTitle = '';

    	this.modalIsOpen = false;

    	this.idHeDaoTaoToDel = '';
    	this.modalIsOpenDelete = false;

    	this.listHeDaoTao = [];
	}

	onUpdateTen(e){
		this.ten = e.target.value;
	}

	onEditHeDaoTao(payload){
		this.id = payload.id;
		this.ten = payload.ten;
	}

	onGetListHeDaoTaoSuccess(data){
		this.listHeDaoTao = data;
	}
	onGetListHeDaoTaoFail(data){
		console.log(data);
	}

	onAddHeDaoTaoSuccess(data){
		this.id = '';
    	this.ten = '';
    	this.classValidate = '';
    	this.validateTitle = '';

    	HeDaoTaoAction.getListHeDaoTao();
    	this.modalIsOpen = false;
	}
	onAddHeDaoTaoFail(data){
		console.log(data);
	}

	onUpdateHeDaoTaoSuccess(data){
		this.id = '';
    	this.ten = '';
		console.log('cap nhat thanh cong');
		HeDaoTaoAction.getListHeDaoTao();
	}
	onUpdateHeDaoTaoFail(data){
		console.log('Cap nhat khoa khong thanh cong');
	}

	onOpenMoDDeleteHeDaoTao(id){
		this.idHeDaoTaoToDel = id;
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

	onDeleteHeDaoTaoSuccess(data){
		console.log('delete thanh cong');
		this.idHeDaoTaoToDel = '';
		this.modalIsOpenDelete = false;
		HeDaoTaoAction.getListHeDaoTao();
	}
	onDeleteHeDaoTaoFail(data){
		console.log('delete that bai');
	}
}

export default alt.createStore(HeDaoTaoStore);