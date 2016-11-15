import alt from '../../../alt';
import DangKyLuuTruAction from '../../../actions/main/luutru/DangKyLuuTruAction';

class DangKyLuuTruStore {
  	constructor() {
    	this.bindActions(DangKyLuuTruAction);
    	this.svkhuvuc = '';
    	this.svtinh = '';
    	this.svdoituong = '';
    	this.svhocluc = '';
    	this.svhoancanh = '';
    	this.svloaiphong = '';

    	this.validateKhuVuc = '';
    	this.validateTinh = '';
    	this.validateDoiTuong = '';
    	this.validateHocLuc = '';
    	this.validateHoanCanh = '';
	}

	onDangKyLuuTruSuccess(data){
		console.log(data);
	}
	onDangKyLuuTruFail(){
		console.log('dang ky luu tru khong thanh cong');
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

	onInvalidKhuVuc(){
		this.validateKhuVuc = 'Vui lòng chọn khu vực';
	}
	onInvalidTinh(){
		this.validateTinh = 'Vui lòng chọn tỉnh';
	}
	onInvalidDoiTuong(){
		this.validateDoiTuong = 'Vui lòng chọn đối tượng ưu tiên';
	}
	onInvalidHocluc(){
		this.validateHocLuc = 'Vui lòng chọn học lực';
	}
	onInvalidHoanCanh(){
		this.validateHoanCanh = 'Vui lòng chọn hoàn cảnh gia đình';
	}

}

export default alt.createStore(DangKyLuuTruStore);