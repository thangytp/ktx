import alt from '../../../alt';
import moment from 'moment';
import CaiDatLuuTruAction from '../../../actions/admin/caidatluutru/CaiDatLuuTruAction';

class CaiDatLuuTruStore {
  	constructor() {
    	this.bindActions(CaiDatLuuTruAction);

    	this.idNgayBatDauDangKy = '';
    	this.ngayBatDauDangKy = moment();
    	this.ngayKetThucDangKy = moment();


    	this.helpBlockNgayBatDauDangKy = '';
    	this.helpBlockNgayKetThucDangKy = '';

    	this.mesLuu = '';

    	this.ngayBatDauGiaHan = moment();
    	this.ngayKetThucGiaHan = moment();
    	this.helpBlockNgayBatDauGiaHan = '';
    	this.helpBlockNgayKetThucGiaHan = '';
    	this.mesLuuGiaHan = '';

    	this.ngayBatDauDangKyMain = null;
    	this.ngayBatDauGiaHanMain = null;
    	this.ngayKetThucDangKyMain = null;
    	this.ngayKetThucGiaHanMain = null;

	}

	onUpdateNgayBatDauDangKy(date){
		this.ngayBatDauDangKy = date;
	}
	onUpdateNgayKetThucDangKy(date){
		this.ngayKetThucDangKy = date;
		if(this.ngayKetThucDangKy._d < this.ngayBatDauDangKy._d){
			this.helpBlockNgayBatDauDangKy = '';
			this.helpBlockNgayKetThucDangKy = 'Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu';
		}
		else {
			this.helpBlockNgayKetThucDangKy = '';
		}
	}

	onUpdateNgayBatDauGiaHan(date){
		this.ngayBatDauGiaHan = date;
	}
	onUpdateNgayKetThucGiaHan(date){
		this.ngayKetThucGiaHan = date;
		if(this.ngayKetThucGiaHan._d < this.ngayBatDauGiaHan._d){
			this.helpBlockNgayBatDauGiaHan = '';
			this.helpBlockNgayKetThucGiaHan = 'Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu';
		}
		else {
			this.helpBlockNgayKetThucGiaHan = '';
		}
	}

	onLuuDangKyLuuTruMoiSuccess(data){
		this.mesLuu = data;
		CaiDatLuuTruAction.getCaiDatDangKyMoi();
	}
	onLuuDangKyLuuTruMoiFail(data){
		this.mesLuu = data;
	}
	onUpdateDangKyLuuTruMoiSuccess(data){
		this.mesLuu = data;
	}
	onUpdateDangKyLuuTruMoiFail(data){
		this.mesLuu = data;
	}

	onLuuGiaHanLuuTruSuccess(data){
		console.log(data);
		this.mesLuuGiaHan = data;
		CaiDatLuuTruAction.getCaiDatDangKyMoi();
	}
	onLuuGiaHanLuuTruFail(data){
		this.mesLuuGiaHan = data;
	}
	onUpdateGiaHanLuuTruSuccess(data){
		this.mesLuuGiaHan = data;
	}
	onUpdateGiaHanLuuTruFail(data){
		this.mesLuuGiaHan = data;
	}

	onGetCaiDatDangKyMoiSuccess(data){
		console.log(data);
		this.idNgayBatDauDangKy = data[0]._id;
		// this.ngayBatDauDangKy = data[0].dangkymoi.ngaybatdaudangky ? moment(data[0].dangkymoi.ngaybatdaudangky) : moment();
		// this.ngayKetThucDangKy = data[0].dangkymoi.ngayketthucdangky ? moment(data[0].dangkymoi.ngayketthucdangky) : moment();

		if(data[0]){
			// dang ky moi
			if(data[0].dangkymoi){
				this.ngayBatDauDangKy = moment(data[0].dangkymoi.ngaybatdaudangky);
				this.ngayKetThucDangKy = moment(data[0].dangkymoi.ngayketthucdangky);

				this.ngayBatDauDangKyMain = moment(data[0].dangkymoi.ngaybatdaudangky);
				this.ngayKetThucDangKyMain = moment(data[0].dangkymoi.ngayketthucdangky);
			}else{
				this.ngayBatDauDangKy = moment();
				this.ngayKetThucDangKy = moment();
				this.ngayBatDauDangKyMain = null;
    			this.ngayKetThucDangKyMain = null;
			}
			// gia han
			if(data[0].giahan){
				this.ngayBatDauGiaHan = moment(data[0].giahan.ngaybatdaugiahan);
				this.ngayKetThucGiaHan = moment(data[0].giahan.ngayketthucgiahan);

				this.ngayBatDauGiaHanMain = moment(data[0].giahan.ngaybatdaugiahan);
				this.ngayKetThucGiaHanMain = moment(data[0].giahan.ngayketthucgiahan);
			}
			else {
				this.ngayBatDauGiaHan = moment();
				this.ngayKetThucGiaHan = moment();
				this.ngayBatDauGiaHanMain = null;
    			this.ngayKetThucGiaHanMain = null;
			}
		}
		else{
			this.ngayBatDauDangKyMain = null;
	    	this.ngayKetThucDangKyMain = null;

	    	this.ngayBatDauGiaHanMain = null;
	    	this.ngayKetThucGiaHanMain = null;
    	}

	}
	onGetCaiDatDangKyMoiFail(data){
		console.log(data);
	}

}

export default alt.createStore(CaiDatLuuTruStore);
