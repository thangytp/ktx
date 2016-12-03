import alt from '../../../alt';
import DangKyLuuTruAction from '../../../actions/main/luutru/DangKyLuuTruAction';

class DangKyLuuTruStore {
  	constructor() {
    	this.bindActions(DangKyLuuTruAction);

        this.titleForm = 'Đăng ký lưu trú';
        this.daDangKyLuuTru = '';
        this.daGiaHan = '';

        this.idStu = '';

        this.checkNam = '';
        this.checkNu = '';
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

        this.styleGioiTinh = 'block';
        this.styleNamVaoTruong = 'block';
        this.styleKhuVuc = 'block';
        this.styleTinh = 'block';
        this.styleDoiTuong = 'block';

    	this.messDK = '';

        this.textButtonDangKy = 'Đăng ký';
        this.loading = 'none';
    	this.disableDK = '';
	}

	onDangKyLuuTruSuccess(data){
        this.idStu = '';
        this.checkNam = '';
        this.checkNu = '';
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
        this.checkNam = 'checked';
        this.checkNu = '';
    }
    onUpdateGioiTinhNu(){
        this.gioitinh = 'f';
        this.checkNam = '';
        this.checkNu = 'checked';
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
            this.titleForm = 'Gia hạn lưu trú';
            this.daDangKyLuuTru = data;
            this.idStu = data._id;
            this.gioitinh = data.phai;
            if(this.gioitinh === 'm'){
                this.checkNam = 'checked';
                this.checkNu = '';
            }
            else {
                this.checkNam = '';
                this.checkNu = 'checked';
            }
            this.namvaotruong = data.nam_vao_truong;
            this.svkhuvuc = data._khu_vuc_id;
            this.svtinh = data._tinh_id;
            this.svdoituong = data._doi_tuong_id;
            this.svhocluc = data._hoc_luc_id;
            this.svhoancanh = data._hoan_canh_id;
            this.svloaiphong = data._phong_id;

            this.daGiaHan = data.gia_han_luu_tru;

            this.validateGioiTinh = '';
            this.validateNam = '';
            this.validateKhuVuc = '';
            this.validateTinh = '';
            this.validateDoiTuong = '';
            this.validateHocLuc = '';
            this.validateHoanCanh = '';
            this.validateLoaiPhong = '';

            this.messDK = '';

            this.textButtonDangKy = 'Gia hạn lưu trú';
            this.loading = 'none';
            this.disableDK = '';

            this.styleGioiTinh = 'none';
            this.styleNamVaoTruong = 'none';
            this.styleKhuVuc = 'none';
            this.styleTinh = 'none';
            this.styleDoiTuong = 'none';
        }
    }
    onGetStudentFail(data){
        console.log(data);
    }

    onGiaHanLuuTruSuccess(data){
        this.idStu = '';
        this.checkNam = '';
        this.checkNu = '';
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

        this.messDK = ' Gia hạn lưu trú thành công!';
        this.disableDK = 'disabled';
        this.loading = 'none';
    }
    onGiaHanLuuTruFail(data){
        console.log(data);
    }

}

export default alt.createStore(DangKyLuuTruStore);
