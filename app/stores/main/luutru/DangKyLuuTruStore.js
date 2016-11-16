import alt from '../../../alt';
import DangKyLuuTruAction from '../../../actions/main/luutru/DangKyLuuTruAction';

class DangKyLuuTruStore {
  	constructor() {
    	this.bindActions(DangKyLuuTruAction);
    	this.namvaotruong = new Date().getFullYear();
    	this.svkhuvuc = '';
    	this.svtinh = '';
    	this.svdoituong = '';
    	this.svhocluc = '';
    	this.svhoancanh = '';
    	this.svloaiphong = '';

    	this.validateNam = '';
    	this.validateKhuVuc = '';
    	this.validateTinh = '';
    	this.validateDoiTuong = '';
    	this.validateHocLuc = '';
    	this.validateHoanCanh = '';
    	this.messDK = '';

    	this.disableDK = '';
	}

	onDangKyLuuTruSuccess(data){
		console.log(data);
		this.svkhuvuc = '';
    	this.svtinh = '';
    	this.svdoituong = '';
    	this.svhocluc = '';
    	this.svhoancanh = '';
    	this.svloaiphong = '';

    	this.validateNam = '';
    	this.validateKhuVuc = '';
    	this.validateTinh = '';
    	this.validateDoiTuong = '';
    	this.validateHocLuc = '';
    	this.validateHoanCanh = '';
    	this.messDK = 'Đăng ký lưu trú thành công!';
    	this.disableDK = 'disabled';
	}
	onDangKyLuuTruFail(){
		console.log('dang ky luu tru khong thanh cong');
	}

	onUpdateNamVaoTruong(event){
		this.namvaotruong = event.target.value;
		console.log(this.namvaotruong);
	}

	onUpdateKhuVuc(event){
		this.svkhuvuc = event.target.value;
	}
	onUpdateTinh(event){
		this.svtinh = event.target.value;
	}
	onUpdateDoiTuong(event){
		this.svdoituong = event.target.value;
	}
	onUpdateHocLuc(event){
		this.svhocluc = event.target.value;
	}
	onUpdateHoanCanh(event){
		this.svhoancanh = event.target.value;
	}
	onUpdateLoaiPhong(event){
		this.svloaiphong = event.target.value;
	}

	onInvalidNam(){
		this.validateNam = 'Vui lòng nhập năm hợp lệ. VD: 2016';
    	this.validateKhuVuc = '';
    	this.validateTinh = '';
    	this.validateDoiTuong = '';
    	this.validateHocLuc = '';
    	this.validateHoanCanh = '';
	}
	onInvalidKhuVuc(){
		this.validateKhuVuc = 'Vui lòng chọn khu vực';
		this.validateNam = '';
    	this.validateTinh = '';
    	this.validateDoiTuong = '';
    	this.validateHocLuc = '';
    	this.validateHoanCanh = '';
	}
	onInvalidTinh(){
		this.validateTinh = 'Vui lòng chọn tỉnh';
		this.validateNam = '';
    	this.validateKhuVuc = '';
    	this.validateDoiTuong = '';
    	this.validateHocLuc = '';
    	this.validateHoanCanh = '';
	}
	onInvalidDoiTuong(){
		this.validateDoiTuong = 'Vui lòng chọn đối tượng ưu tiên';
		this.validateNam = '';
    	this.validateKhuVuc = '';
    	this.validateTinh = '';
    	this.validateHocLuc = '';
    	this.validateHoanCanh = '';
	}
	onInvalidHocluc(){
		this.validateHocLuc = 'Vui lòng chọn học lực';
		this.validateNam = '';
    	this.validateKhuVuc = '';
    	this.validateTinh = '';
    	this.validateDoiTuong = '';
    	this.validateHoanCanh = '';
	}
	onInvalidHoanCanh(){
		this.validateHoanCanh = 'Vui lòng chọn hoàn cảnh gia đình';
		this.validateNam = '';
    	this.validateKhuVuc = '';
    	this.validateTinh = '';
    	this.validateDoiTuong = '';
    	this.validateHocLuc = '';
	}

}

export default alt.createStore(DangKyLuuTruStore);
