import alt from '../../../alt';

class DangKyLuuTruAction {
  	constructor() {
    	this.generateActions(
    		'dangKyLuuTruSuccess',
    		'dangKyLuuTruFail',

            'updateGioiTinhNam',
            'updateGioiTinhNu',
            'updateNamVaoTruong',
    		'updateKhuVuc',
    		'updateTinh',
    		'updateDoiTuong',
    		'updateHocLuc',
    		'updateHoanCanh',
    		'updateLoaiPhong',

            'invalidGioiTinh',
            'invalidNam',
    		'invalidKhuVuc',
    		'invalidTinh',
    		'invalidDoiTuong',
    		'invalidHocluc',
    		'invalidHoanCanh',
            'invalidLoaiPhong',

            'showLoading',

            'getStudentSuccess',
            'getStudentFail',

            'giaHanLuuTruSuccess',
            'giaHanLuuTruFail'

    	);
	}

	dangKyLuuTru(payload){
		$.ajax({
	      	type: 'POST',
	      	url: '/api/dangkyluutru',
	      	data: { userEmail: payload.userEmail, userName: payload.userName, svmssv: payload.svmssv, gioitinh: payload.gioitinh, namvaotruong: payload.namvaotruong, svkhuvuc: payload.svkhuvuc, svtinh: payload.svtinh, 
            svdoituong: payload.svdoituong, svhocluc: payload.svhocluc, svhoancanh: payload.svhoancanh, svloaiphong: payload.svloaiphong }
	    })
	    .done((data) => {
	        this.actions.dangKyLuuTruSuccess(data.message);
	    })
	    .fail((jqXhr) => {
	        this.actions.dangKyLuuTruFail(jqXhr.responseJSON);
	    });
	}

    giaHanLuuTru(payload){
        $.ajax({
            type: 'PUT',
            url: '/api/giahanluutru',
            data: { idStu: payload.idStu, svhocluc: payload.svhocluc, svhoancanh: payload.svhoancanh, svloaiphong: payload.svloaiphong }
        })
        .done((data) => {
            this.actions.giaHanLuuTruSuccess(data.message);
        })
        .fail((jqXhr) => {
            this.actions.giaHanLuuTruFail(jqXhr.responseJSON);
        });
    }

    getStudent(id){
        $.ajax({
            type: 'GET',
            url: '/getstudentBymssv/' + id
        })
        .done((data) =>{
            this.actions.getStudentSuccess(data);
        })
        .fail((jqXhr) => {
            this.actions.getStudentFail(jqXhr.responseJSON);
        });
    }


}

export default alt.createActions(DangKyLuuTruAction);
