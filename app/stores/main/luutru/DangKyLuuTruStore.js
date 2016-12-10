import alt from '../../../alt';

import moment from 'moment';

import DangKyLuuTruAction from '../../../actions/main/luutru/DangKyLuuTruAction';

class DangKyLuuTruStore {
  	constructor() {
    	this.bindActions(DangKyLuuTruAction);

        this.styleFormThongTinCaNhan = 'block';
        this.styleFormDangKyLuuTru = 'none';
        this.styleDichVu = 'none';

        this.titleForm = 'Đăng ký lưu trú';
        this.daDangKyLuuTru = '';
        this.daGiaHan = '';

        this.idStu = '';
        this.holot = '';
        this.ten = '';
        this.ngaySinh = moment("1994-01-01");
        this.checkNam = '';
        this.checkNu = '';
        this.gioitinh = '';
        this.svkhoa = '';
        this.svhedaotao = '';

    	this.namvaotruong = new Date().getFullYear();
    	this.svkhuvuc = '';
    	this.svtinh = '';
    	this.svdoituong = '';
        this.svtongiao = '';
        this.svdoanthe = '';
        this.socmnd = '';
        this.hokhau = '';
        this.svdienthoai = '';
        this.giadinhdienthoai = '';
        this.emailThuongDung = '';

        this.dongY = 0;

    	this.svhocluc = '';
    	this.svhoancanh = '';
    	this.svloaiphong = '';

        this.dichvu = [];

        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
    	this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        this.validateDongY = '';

    	this.validateHocLuc = '';
    	this.validateHoanCanh = '';
        this.validateLoaiPhong = '';


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

    onUpdateHoLot(event){
        this.holot = event.target.value;
    }
    onUpdateTen(event){
        this.ten = event.target.value;
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
    // onUpdateNgaySinh(event){
    //     this.ngaySinh = event.target.value;
    //     console.log(this.ngaySinh);
    // }
    onUpdateKhoa(event){
        this.svkhoa = event.target.value;
    }
    onUpdateHeDaoTao(event){
        this.svhedaotao = event.target.value;
    }


    onUpdateNgaySinh(date){
        this.ngaySinh = date;
    }

	onUpdateNamVaoTruong(event){
		this.namvaotruong = event.target.value;
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
    onUpdateTonGiao(event){
        this.svtongiao = event.target.value;
    }
    onUpdateDoanThe(event){
        this.svdoanthe = event.target.value;
    }
    onUpdateSoCMND(event){
        this.socmnd = event.target.value;
    }
    onUpdateHoKhau(event){
        this.hokhau = event.target.value;
    }
    onUpdateDienThoaiSV(event){
        this.svdienthoai = event.target.value;
    }
    onUpdateDienThoaiGiaDinh(event){
        this.giadinhdienthoai = event.target.value;
    }
    onUpdateEmailThuongDung(event){
        this.emailThuongDung = event.target.value;
    }

    onUpdateDongY(){
        if(this.dongY){
            this.dongY = 0;
        }else this.dongY = 1;
    }

	onUpdateHocLuc(event){
		this.svhocluc = event.target.value;
	}
	onUpdateHoanCanh(event){
		this.svhoancanh = event.target.value;
	}
	onUpdateLoaiPhong(event){
		this.svloaiphong = event.target.value;
                                
        DangKyLuuTruAction.getLoaiPhongById(this.svloaiphong);
	}

    onUpdateDV(payload){
        console.log(payload);

        var index = this.dichvu.indexOf(payload.id);
        console.log(index);
        if(index>=0){
            this.dichvu.splice(index, 1);
        }
        else this.dichvu.push(payload.id);
        console.log(this.dichvu);
    }

    onUpdateDVMayGiat(){
        if(this.dvmaygiat){
            this.dvmaygiat = 0;
        }else this.dvmaygiat = 1;
    }
    onUpdateDVTuLanh(){
        if(this.dvtulanh){
            this.dvtulanh = 0;
        }else this.dvtulanh = 1;
    }

    onUpdateNhapThongTin(){
        this.styleFormThongTinCaNhan = 'none';
        this.styleFormDangKyLuuTru = 'block';
    }
    onQuayLai(){
        this.styleFormThongTinCaNhan = 'block';
        this.styleFormDangKyLuuTru = 'none';

        this.disableDK = '';
        this.loading = '';
    }

    onInvalidHoLot(){
        this.validateHoLot = 'Vui lòng nhập họ và tên lót';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }
    onInvalidTen(){
        this.validateHoLot = '';
        this.validateTen = 'Vui lòng nhập tên';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }
    onInvalidKhuVuc(){
        this.validateKhuVuc = 'Vui lòng chọn khu vực';
        this.validateHoLot = '';
        this.validateTen = '';
        
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }
    onInvalidGioiTinh(){
        this.validateGioiTinh = 'Vui lòng chọn giới tính của bạn';
        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }
    onInvalidNgaySinh(){
        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = 'Ngày sinh không hợp lệ';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }
    onInvalidTinh(){
        this.validateTinh = 'Vui lòng chọn tỉnh';
        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }
    onInvalidKhoa(){
        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = 'Vui lòng chọn khoa';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }

	onInvalidNam(){
		this.validateNam = 'Vui lòng nhập năm hợp lệ. VD: 2016';
        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
	}
    onInvalidHeDaoTao(){
        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = 'Chọn hệ đào tạo';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }

	onInvalidDoiTuong(){
		this.validateDoiTuong = 'Vui lòng chọn đối tượng ưu tiên';
        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
	}
    onInvalidTonGiao(){
        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = 'Vui lòng nhập tôn giáo';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }
    onInvalidDoanThe(){
        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = 'Vui lòng chọn đoàn thể';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }
    onInvalidSoCMND(){
        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = 'Nhập số chứng minh nhân dân';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }
    onInvalidHoKhau(){
        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = 'Nhập hộ khẩu';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }
    onInvalidSVDienThoai(){
        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = 'Nhập số điện thoại của bạn';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        this.validateDongY = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }
    onInvalidGiaDinhDienThoai(){
        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = 'Nhập số điện thoại của gia đình';
        this.validateEmailThuongDung = '';
        this.validateDongY = '';
        
        this.validateHocLuc = '';
        this.validateHoanCanh = '';
        this.validateLoaiPhong = '';
    }
    onInvalidDongY(){
        this.validateHoLot = '';
        this.validateTen = '';
        this.validateKhuVuc = '';
        this.validateGioiTinh = '';
        this.validateNgaySinh = '';
        this.validateTinh = '';
        this.validateKhoa = '';
        this.validateNam = '';
        this.validateHeDaoTao = '';
        this.validateDoiTuong = '';
        this.validateTonGiao = '';
        this.validateDoanThe = '';
        this.validateSoCMND = '';
        this.validateHoKhau = '';
        this.validateDienThoaiSV = '';
        this.validateDienThoaiGiaDinh = '';
        this.validateEmailThuongDung = '';
        this.validateDongY = 'Vui lòng chọn đồng ý với các điều khoản để tiếp tục';

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
        this.validateDongY = '';
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
        this.validateDongY = '';
	}
    onInvalidLoaiPhong(){
        this.validateGioiTinh = '';
        this.validateNam = '';
        this.validateKhuVuc = '';
        this.validateTinh = '';
        this.validateDoiTuong = '';
        this.validateDongY = '';
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
            this.styleFormThongTinCaNhan = 'none';
            this.styleFormDangKyLuuTru = 'block';
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

    onGetLoaiPhongByIdSuccess(data){
        console.log(data);
        if(data.loai === 1){
            this.styleDichVu = 'block';
        }
        else {
            this.styleDichVu = 'none';
            this.dichvu = [];
            console.log(this.dichvu);
        }
    }
    onGetLoaiPhongByIdFail(data){
        this.styleDichVu = 'none';
        console.log(data);
    }

}

export default alt.createStore(DangKyLuuTruStore);
