import alt from '../../../alt';

class DangKyLuuTruAction {
  	constructor() {
    	this.generateActions(
    		'dangKyLuuTruSuccess',
    		'dangKyLuuTruFail',

            'updateHoLot',
            'updateTen',
            'updateGioiTinhNam',
            'updateGioiTinhNu',
            'updateNgaySinh',
            'updateKhoa',
            'updateHeDaoTao',
            'updateNamVaoTruong',
    		'updateKhuVuc',
    		'updateTinh',
    		'updateDoiTuong',
            'updateTonGiao',
            'updateDoanThe',
            'updateSoCMND',
            'updateHoKhau',
            'updateDienThoaiSV',
            'updateDienThoaiGiaDinh',
            'updateEmailThuongDung',
    		'updateHocLuc',
    		'updateHoanCanh',
    		'updateLoaiPhong',

            'updateDVMayGiat',
            'updateDVTuLanh',

            'updateNhapThongTin',
            'updateDongY',

            'invalidHoLot',
            'invalidTen',
            'invalidKhuVuc',
            'invalidGioiTinh',
            'invalidNgaySinh',
            'invalidTinh',
            'invalidKhoa',
            'invalidNam',
    		'invalidHeDaoTao',
    		'invalidDoiTuong',
            'invalidTonGiao',
            'invalidDoanThe',
            'invalidSoCMND',
            'invalidHoKhau',
            'invalidSVDienThoai',
            'invalidGiaDinhDienThoai',
            'invalidDongY',

    		'invalidHocluc',
    		'invalidHoanCanh',
            'invalidLoaiPhong',

            'showLoading',

            'getStudentSuccess',
            'getStudentFail',

            'giaHanLuuTruSuccess',
            'giaHanLuuTruFail',

            'getLoaiPhongByIdSuccess',
            'getLoaiPhongByIdFail',

            'quayLai'

    	);
	}

    updateNgaySinh(date){
        this.actions.updateNgaySinh(date);
    }

	dangKyLuuTru(payload){
		$.ajax({
	      	type: 'POST',
	      	url: '/api/dangkyluutru',
	      	data: { 
                userEmail: payload.userEmail, svmssv: payload.svmssv, holot: payload.holot, ten: payload.ten, svkhuvuc: payload.svkhuvuc, 
                gioitinh: payload.gioitinh, ngaySinh: payload.ngaySinh, svtinh: payload.svtinh, svkhoa: payload.svkhoa, namvaotruong: payload.namvaotruong,  
                svhedaotao: payload.svhedaotao, svdoituong: payload.svdoituong, svtongiao: payload.svtongiao, svdoanthe: payload.svdoanthe, socmnd: payload.socmnd, 
                hokhau: payload.hokhau, svdienthoai: payload.svdienthoai, giadinhdienthoai: payload.giadinhdienthoai, emailThuongDung: payload.emailThuongDung, 
                svhocluc: payload.svhocluc, svhoancanh: payload.svhoancanh, svloaiphong: payload.svloaiphong
            }
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
            url: '/api/getstudentBymssv/' + id
        })
        .done((data) =>{
            this.actions.getStudentSuccess(data);
        })
        .fail((jqXhr) => {
            this.actions.getStudentFail(jqXhr.responseJSON);
        });
    }

    getLoaiPhongById(id){
        $.ajax({
            type: 'GET',
            url: '/api/getphongbyid/'+id
        })
        .done((data) =>{
            this.actions.getLoaiPhongByIdSuccess(data);
        })
        .fail((jqXhr) => {
            this.actions.getLoaiPhongByIdFail(jqXhr.responseJSON);
        });
    }


}

export default alt.createActions(DangKyLuuTruAction);
