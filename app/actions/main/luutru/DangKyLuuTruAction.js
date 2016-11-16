import alt from '../../../alt';

class DangKyLuuTruAction {
  	constructor() {
    	this.generateActions(
    		'dangKyLuuTruSuccess',
    		'dangKyLuuTruFail',

            'updateNamVaoTruong',
    		'updateKhuVuc',
    		'updateTinh',
    		'updateDoiTuong',
    		'updateHocLuc',
    		'updateHoanCanh',
    		'updateLoaiPhong',

            'invalidNam',
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
	      	data: { userEmail: payload.userEmail, userName: payload.userName, svmssv: payload.svmssv, namvaotruong: payload.namvaotruong, svkhuvuc: payload.svkhuvuc, svtinh: payload.svtinh, 
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
