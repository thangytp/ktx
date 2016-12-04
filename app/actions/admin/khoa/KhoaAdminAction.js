import alt from '../../../alt';

class KhoaAdminAction {
  	constructor() {
	    this.generateActions(

	    		'openMoDDeleteKhoa',
	    		'closeModalDelete',
	    		'updateTen',

	    		'editKhoa',

	    		'getListKhoaSuccess',
	    		'getListKhoaFail',

	    		'addKhoaSuccess',
	    		'addKhoaFail',

	    		'updateKhoaSuccess',
	    		'updateKhoaFail',

	    		'deleteKhoaSuccess',
	    		'deleteKhoaFail',

	    		'openMoD',
	    		'closeModal'
	    	);
	}


	openMoDDeleteKhoa(id){
		this.actions.openMoDDeleteKhoa(id);
	}

	editKhoa(payload){
		this.actions.editKhoa({id: payload.id, ten: payload.ten});
	}

	getListKhoa(){
		$.ajax({
			url: '/api/getlistkhoa',
			type: 'GET',
			
		})
		.done((data) => {
	        this.actions.getListKhoaSuccess(data);
	    })
	    .fail((jqXhr) => {
	        this.actions.getListKhoaFail(jqXhr.responseJSON);
	    });
	}

	addKhoa(payload){
		$.ajax({
			url: '/api/addkhoa',
			type: 'POST',
			data: {ten: payload.ten},
		})
		.done((data) => {
	        this.actions.addKhoaSuccess(data.message);
	    })
	    .fail((jqXhr) => {
	        this.actions.addKhoaFail(jqXhr.responseJSON);
	    });
		
	}
	updateKhoa(payload){
		$.ajax({
			url: '/api/updatekhoa',
			type: 'PUT',
			data: {id: payload.id, ten: payload.ten},
		})
		.done((data) => {
	        this.actions.updateKhoaSuccess(data.message);
	    })
	    .fail((jqXhr) => {
	        this.actions.updateKhoaFail(jqXhr.responseJSON);
	    });
		
	}
	deleteKhoa(id){
		$.ajax({
			url: '/api/deletekhoa',
			type: 'DELETE',
			data: {id: id},
		})
		.done((data) => {
	        this.actions.deleteKhoaSuccess(data.message);
	    })
	    .fail((jqXhr) => {
	        this.actions.deleteKhoaFail(jqXhr.responseJSON);
	    });
	}
}

export default alt.createActions(KhoaAdminAction);
