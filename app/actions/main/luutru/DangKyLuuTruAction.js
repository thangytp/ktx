import alt from '../../../alt';

class DangKyLuuTruAction {
  	constructor() {
    	this.generateActions(
    		'dangKyLuuTruSuccess',
    		'dangKyLuuTruFail',

    		'updateKhuVuc',
    		'updateTinh',
    		'updateDoiTuong',
    		'updateHocLuc',
    		'updateHoanCanh',
    		'updateLoaiPhong',

    		'invalidKhuVuc',
    		'invalidTinh',
    		'invalidDoiTuong',
    		'invalidHocluc',
    		'invalidHoanCanh'

    	);
	}

	dangKyLuuTru(payload){
		$.ajax({
	      	type: 'POST',
	      	url: '/api/dangkyluutru',
	      	data: { userEmail: payload.userEmail,  svkhuvuc: payload.svkhuvuc, svtinh: payload.svtinh, 
            svdoituong: payload.svdoituong, svhocluc: payload.svhocluc, svhoancanh: payload.svhoancanh, svloaiphong: payload.svloaiphong }
	    })
	    .done((data) => {
	        this.actions.dangKyLuuTruSuccess(data.message);
	    })
	    .fail((jqXhr) => {
	        this.actions.dangKyLuuTruFail(jqXhr.responseJSON);
	    });
	}


}

export default alt.createActions(DangKyLuuTruAction);