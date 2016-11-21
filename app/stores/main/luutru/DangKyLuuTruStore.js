import alt from '../../../alt';
import DangKyLuuTruAction from '../../../actions/main/luutru/DangKyLuuTruAction';

class DangKyLuuTruStore {
  	constructor() {
    	this.bindActions(DangKyLuuTruAction);

        this.daDangKyLuuTru = '';

        this.gioitinh = '';
    	this.namvaotruong = new Date().getFullYear();
    	this.svkhuvuc = '';
    	this.svtinh = '';
    	this.svdoituong = '';
    	this.svhocluc = '';
    	this.svhoancanh = '';
    	this.svloaiphong = '';

        this.validateGioiTinh = '';
    	this.validateNam = '';
    	this.validateKhuVuc = '';
    	this.validateTinh = '';
    	this.validateDoiTuong = '';
    	this.validateHocLuc = '';
    	this.validateHoanCanh = '';
        this.validateLoaiPhong = '';

    	this.messDK = '';

        this.textButtonDangKy = 'Đăng ký';
        this.loading = 'none';
    	this.disableDK = '';
	}

	onDangKyLuuTruSuccess(data){
        this.gioitinh = '';
        this.namvaotruong = new Date().getFullYear();
		this.svkhuvuc = '';
    	this.svtinh = '';
    	this.svdoituong = '';
    	this.svhocluc = '';
    	this.svhoancanh = '';
    	this.svloaiphong = '';

        this.validateGioiTinh = '';
    	this.validateNam = '';
    	this.validateKhuVuc = '';
    	this.validateTinh = '';
    	this.validateDoiTuong = '';
    	this.validateHocLuc = '';
    	this.validateHoanCanh = '';
        this.validateLoaiPhong = '';

    	this.messDK = ' Đăng ký lưu trú thành công!';
    	this.disableDK = 'disabled';
        this.loading = 'none';

        // DangKyLuuTruAction.getStudent(svmssv);
	}
	onDangKyLuuTruFail(){
		console.log('dang ky luu tru khong thanh cong');
	}

    onUpdateGioiTinhNam(event){
        this.gioitinh = 'm';
    }
    onUpdateGioiTinhNu(){
        this.gioitinh = 'f';
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

    onInvalidGioiTinh(){
        this.validateGioiTinh = 'Vui lòng chọn giới tính của bạn';
        this.validateNam = '';
        this.validateKhuVuc = '';
        this.validateTinh = '';
        this.validateDoiTuong = '';
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }
	onInvalidNam(){
		this.validateNam = 'Vui lòng nhập năm hợp lệ. VD: 2016';
        this.validateGioiTinh = '';
    	this.validateKhuVuc = '';
    	this.validateTinh = '';
    	this.validateDoiTuong = '';
    	this.validateHocLuc = '';
    	this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
	}
	onInvalidKhuVuc(){
		this.validateKhuVuc = 'Vui lòng chọn khu vực';
        this.validateGioiTinh = '';
		this.validateNam = '';
    	this.validateTinh = '';
    	this.validateDoiTuong = '';
    	this.validateHocLuc = '';
    	this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
	}
	onInvalidTinh(){
		this.validateTinh = 'Vui lòng chọn tỉnh';
        this.validateGioiTinh = '';
		this.validateNam = '';
    	this.validateKhuVuc = '';
    	this.validateDoiTuong = '';
    	this.validateHocLuc = '';
    	this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
	}
	onInvalidDoiTuong(){
		this.validateDoiTuong = 'Vui lòng chọn đối tượng ưu tiên';
        this.validateGioiTinh = '';
		this.validateNam = '';
    	this.validateKhuVuc = '';
    	this.validateTinh = '';
    	this.validateHocLuc = '';
    	this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
	}
	onInvalidHocluc(){
		this.validateHocLuc = 'Vui lòng chọn học lực';
        this.validateGioiTinh = '';
		this.validateNam = '';
    	this.validateKhuVuc = '';
    	this.validateTinh = '';
    	this.validateDoiTuong = '';
    	this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
	}
	onInvalidHoanCanh(){
		this.validateHoanCanh = 'Vui lòng chọn hoàn cảnh gia đình';
        this.validateGioiTinh = '';
		this.validateNam = '';
    	this.validateKhuVuc = '';
    	this.validateTinh = '';
    	this.validateDoiTuong = '';
    	this.validateHocLuc = '';
        this.validateLoaiPhong = '';
	}
    onInvalidLoaiPhong(){
        this.validateGioiTinh = '';
        this.validateNam = '';
        this.validateKhuVuc = '';
        this.validateTinh = '';
        this.validateDoiTuong = '';
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = 'Vui lòng chọn loại phòng bạn muốn đăng ký';
    }

    onShowLoading(){
        this.disableDK = 'disabled';
        this.loading = 'block';
    }

    onGetStudentSuccess(data){
        if(data){
            this.daDangKyLuuTru = data;
        }
    }
    onGetStudentFail(data){
        console.log(data);
    }

}

export default alt.createStore(DangKyLuuTruStore);
