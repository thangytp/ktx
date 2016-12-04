import alt from '../../../alt';

class HeDaoTaoAction {
  	constructor() {
	    this.generateActions(

	    		'openMoDDeleteHeDaoTao',
	    		'closeModalDelete',
	    		'updateTen',

	    		'editHeDaoTao',

	    		'getListHeDaoTaoSuccess',
	    		'getListHeDaoTaoFail',

	    		'addHeDaoTaoSuccess',
	    		'addHeDaoTaoFail',

	    		'updateHeDaoTaoSuccess',
	    		'updateHeDaoTaoFail',

	    		'deleteHeDaoTaoSuccess',
	    		'deleteHeDaoTaoFail',

	    		'openMoD',
	    		'closeModal'
	    	);
	}


	openMoDDeleteHeDaoTao(id){
		this.actions.openMoDDeleteHeDaoTao(id);
	}

	editHeDaoTao(payload){
		this.actions.editHeDaoTao({id: payload.id, ten: payload.ten});
	}

	getListHeDaoTao(){
		$.ajax({
			url: '/api/getlisthedaotao',
			type: 'GET',
			
		})
		.done((data) => {
	        this.actions.getListHeDaoTaoSuccess(data);
	    })
	    .fail((jqXhr) => {
	        this.actions.getListHeDaoTaoFail(jqXhr.responseJSON);
	    });
	}

	addHeDaoTao(payload){
		$.ajax({
			url: '/api/addhedaotao',
			type: 'POST',
			data: {ten: payload.ten},
		})
		.done((data) => {
	        this.actions.addHeDaoTaoSuccess(data.message);
	    })
	    .fail((jqXhr) => {
	        this.actions.addHeDaoTaoFail(jqXhr.responseJSON);
	    });
		
	}
	updateHeDaoTao(payload){
		$.ajax({
			url: '/api/updatehedaotao',
			type: 'PUT',
			data: {id: payload.id, ten: payload.ten},
		})
		.done((data) => {
	        this.actions.updateHeDaoTaoSuccess(data.message);
	    })
	    .fail((jqXhr) => {
	        this.actions.updateHeDaoTaoFail(jqXhr.responseJSON);
	    });
		
	}
	deleteHeDaoTao(id){
		$.ajax({
			url: '/api/deletehedaotao',
			type: 'DELETE',
			data: {id: id},
		})
		.done((data) => {
	        this.actions.deleteHeDaoTaoSuccess(data.message);
	    })
	    .fail((jqXhr) => {
	        this.actions.deleteHeDaoTaoFail(jqXhr.responseJSON);
	    });
	}
}

export default alt.createActions(HeDaoTaoAction);
