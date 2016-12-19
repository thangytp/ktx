import alt from '../../../alt';

class CaiDatLuuTruAction {
  	constructor() {
	    this.generateActions(

	    		'updateNgayBatDauDangKy',
	    		'updateNgayKetThucDangKy',

	    		'updateNgayBatDauGiaHan',
	    		'updateNgayKetThucGiaHan',

	    		'updateDangKyLuuTruMoiSuccess',
	    		'updateDangKyLuuTruMoiFail',

	    		'updateGiaHanLuuTruSuccess',
	    		'updateGiaHanLuuTruFail',

	    		'luuDangKyLuuTruMoiSuccess',
	    		'luuDangKyLuuTruMoiFail',

	    		'luuGiaHanLuuTruSuccess',
	    		'luuGiaHanLuuTruFail',

	    		'getCaiDatDangKyMoiSuccess',
	    		'getCaiDatDangKyMoiFail'
	    		
	    	);
	}

	updateNgayBatDauDangKy(date){
		this.actions.updateNgayBatDauDangKy(date);
	}
	updateNgayKetThucDangKy(date){
		this.actions.updateNgayKetThucDangKy(date);
	}

	updateNgayBatDauGiaHan(date){
		this.actions.updateNgayBatDauGiaHan(date);
	}
	updateNgayKetThucGiaHan(date){
		this.actions.updateNgayKetThucGiaHan(date);
	}

	luuDangKyLuuTruMoi(payload){
		$.ajax({
            type: 'POST',
            url: '/api/luudangkymoi',
            data: { ngayBatDauDangKy: payload.ngayBatDauDangKy, ngayKetThucDangKy: payload.ngayKetThucDangKy
             }
        })
        .done((data) => {
            this.actions.luuDangKyLuuTruMoiSuccess(data.message);
        })
        .fail((jqXhr) => {
            this.actions.luuDangKyLuuTruMoiFail(jqXhr.responseJSON);
        });
	}
	updateDangKyLuuTruMoi(payload){
		$.ajax({
            type: 'PUT',
            url: '/api/updatedangkymoi',
            data: { idNgayBatDauDangKy: payload.idNgayBatDauDangKy, ngayBatDauDangKy: payload.ngayBatDauDangKy, ngayKetThucDangKy: payload.ngayKetThucDangKy
             }
        })
        .done((data) => {
            this.actions.updateDangKyLuuTruMoiSuccess(data.message);
        })
        .fail((jqXhr) => {
            this.actions.updateDangKyLuuTruMoiFail(jqXhr.responseJSON);
        });
	}

	luuGiaHanLuuTru(payload){
		$.ajax({
            type: 'POST',
            url: '/api/luugiahan',
            data: { idNgayBatDauDangKy: payload.idNgayBatDauDangKy, ngayBatDauGiaHan: payload.ngayBatDauGiaHan, ngayKetThucGiaHan: payload.ngayKetThucGiaHan
             }
        })
        .done((data) => {
            this.actions.luuGiaHanLuuTruSuccess(data.message);
        })
        .fail((jqXhr) => {
            this.actions.luuGiaHanLuuTruFail(jqXhr.responseJSON);
        });
	}
	updateGiaHanLuuTru(payload){
		$.ajax({
            type: 'PUT',
            url: '/api/updategiahan',
            data: { idNgayBatDauDangKy: payload.idNgayBatDauDangKy, ngayBatDauGiaHan: payload.ngayBatDauGiaHan, ngayKetThucGiaHan: payload.ngayKetThucGiaHan
             }
        })
        .done((data) => {
            this.actions.updateGiaHanLuuTruSuccess(data.message);
        })
        .fail((jqXhr) => {
            this.actions.updateGiaHanLuuTruFail(jqXhr.responseJSON);
        });
	}

	getCaiDatDangKyMoi(){
		$.ajax({
            type: 'GET',
            url: '/api/getcaidatdangkymoi',
            
        })
        .done((data) => {
            this.actions.getCaiDatDangKyMoiSuccess(data);
        })
        .fail((jqXhr) => {
            this.actions.getCaiDatDangKyMoiFail(jqXhr.responseJSON);
        });
	}
}

export default alt.createActions(CaiDatLuuTruAction);
