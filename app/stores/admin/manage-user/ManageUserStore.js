import alt from '../../../alt';
import ManageUserAction from '../../../actions/admin/manage-user/ManageUserAction';
import localStorage from 'localStorage';
import moment from 'moment';

class ManageUserStore {
  constructor() {
    this.bindActions(ManageUserAction);
    this.users = [];
    this.usersehv = [];
    this.usershv = [];
    this.usersedrl = [];
    this.usersdrl = [];
    this.usersdxd = [];
    this.usershvloai = [];
    this.usersdrlloai = [];
    this.usersehvgh = [];
    this.usershvgh = [];
    this.usersedrlgh = [];
    this.usersdrlgh = [];
    this.usersdxdgh = [];
    this.usershvloaigh = [];
    this.usersdrlloaigh = [];
    this.usersedrlktx = [];
    this.usersdrlktx = [];
    this.usersdrlktxloai = [];
    this.usersxd = [];
    this.usersgh = [];
    this.activeHocvu = false;
    this.activeDiemrenluyen = false;
    this.activeDiemrenluyenKtx = false;
    this.activeDiemxetduyet = false;
    this.deactiveStep2 = true;
    this.deactiveStep3 = true;
    this.user = {};
    this.inputdrl = null;
    this.inputdrlktx = null;
    this.inputdvs = null;

    this.editModalShow = false;
    this.idEdit = '';
    this.email = '';
    this.mssv = '';
    this.holot = '';
    this.ten = '';
    this.ngaySinh = '';
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

    this.svhocluc = '';
    this.svhoancanh = '';
    this.svloaiphong = '';

    this.fileAvatar ={};
    this.imagePreviewUrl='/uploads/LogoBK.png';
    this.imageUrl='/uploads/LogoBK.png';
    this.helpBlockUpload = '';

    this.modalIsOpenDelete = false;
    this.idDel = '';

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
    // if(localStorage.getItem('deactiveStep2')) {
    //   this.deactiveStep2 = false;
    // } else {
    //   this.deactiveStep2 = true;
    // }
    //
    // if(localStorage.getItem('deactiveStep2')) {
    //   this.deactiveStep3 = false;
    // } else {
    //   this.deactiveStep3 = true;
    // }

  }

  onAddUserSuccess() {
    ManageUserAction.getUsers();
  }

  onGetUsersSuccess(response) {
    this.users = response;
  }

  getUsersByGiaHanThanhCongSuccess(response) {
    this.usersgh = response;
  }

  getUsersByXetDuyetThanhCongSuccess(response) {
    this.usersxd = response;
  }

  getUsersByDiemXetDuyetGiaHanSuccess(response) {
    console.log(response);
    this.usersdxdgh = response;
  }

  getUsersByDiemXetDuyetXetDuyetSuccess(response) {
    this.usersdxd = response;
  }
  onGetUsersByDiemRenLuyenKtxSuccess(response) {
    this.usersdrlktx = response;
    var users1 = this.usersdrlgh,
        users2 = response;

    var uniqueResultOne = users1.filter(function(obj) {
      return !users2.some(function(obj2) {
          return obj.ma_sinh_vien == obj2.ma_sinh_vien;
      });
    });

    var uniqueResultTwo = users2.filter(function(obj) {
        return !users1.some(function(obj2) {
            return obj.ma_sinh_vien == obj2.ma_sinh_vien;
        });
    });

    var result = uniqueResultOne.concat(uniqueResultTwo);
    this.usersdrlktxloai = result;
  }

  onGetUsersByDiemRenLuyenXetDuyetSuccess(response) {
    this.usersdrl = response;
    var users1 = this.usershv,
        users2 = response;

    var uniqueResultOne = users1.filter(function(obj) {
      return !users2.some(function(obj2) {
          return obj.ma_sinh_vien == obj2.ma_sinh_vien;
      });
    });

    var uniqueResultTwo = users2.filter(function(obj) {
        return !users1.some(function(obj2) {
            return obj.ma_sinh_vien == obj2.ma_sinh_vien;
        });
    });

    var result = uniqueResultOne.concat(uniqueResultTwo);
    this.usersdrlloai = result;
  }

  onGetUsersByDiemRenLuyenGiaHanSuccess(response) {
    this.usersdrlgh = response;
    var users1 = this.usershvgh,
        users2 = response;

    var uniqueResultOne = users1.filter(function(obj) {
      return !users2.some(function(obj2) {
          return obj.ma_sinh_vien == obj2.ma_sinh_vien;
      });
    });

    var uniqueResultTwo = users2.filter(function(obj) {
        return !users1.some(function(obj2) {
            return obj.ma_sinh_vien == obj2.ma_sinh_vien;
        });
    });

    var result = uniqueResultOne.concat(uniqueResultTwo);
    this.usersdrlloaigh = result;
  }

  onGetUsersByHocVuXetDuyetSuccess(response) {
    this.usershv = response;
    var users1 = this.users,
        users2 = response;

    var uniqueResultOne = users1.filter(function(obj) {
      return !users2.some(function(obj2) {
          return obj.ma_sinh_vien == obj2.ma_sinh_vien;
      });
    });

    var uniqueResultTwo = users2.filter(function(obj) {
        return !users1.some(function(obj2) {
            return obj.ma_sinh_vien == obj2.ma_sinh_vien;
        });
    });

    var result = uniqueResultOne.concat(uniqueResultTwo);
    this.usershvloai = result;
  }

  onGetUsersByHocVuGiaHanSuccess(response) {
    this.usershvgh = response;
    var users1 = this.users,
        users2 = response;

    var uniqueResultOne = users1.filter(function(obj) {
      return !users2.some(function(obj2) {
          return obj.ma_sinh_vien == obj2.ma_sinh_vien;
      });
    });

    var uniqueResultTwo = users2.filter(function(obj) {
        return !users1.some(function(obj2) {
            return obj.ma_sinh_vien == obj2.ma_sinh_vien;
        });
    });

    var result = uniqueResultOne.concat(uniqueResultTwo);
    this.usershvloaigh = result;
  }

  onGetUserSuccess(response) {
    this.user = response;

    // set state
    this.editModalShow = true;
    this.idEdit = response._id;
    this.email = response.email;
    this.mssv = response.ma_sinh_vien;
    this.holot = response.ho_lot;
    this.ten = response.ten;
    this.ngaySinh = moment(response.ngay_sinh);
  
    this.gioitinh = response.phai;
    this.svkhoa = response._khoa_id;
    this.svhedaotao = response._he_dao_tao_id;

    this.namvaotruong = response.nam_vao_truong;
    this.svkhuvuc = response._khu_vuc_id;
    this.svtinh = response._tinh_id;
    this.svdoituong = response._doi_tuong_id;
    this.svtongiao = response.tongiao;
    this.svdoanthe = response.ten_doan_the;
    this.socmnd = response.so_cmnd;
    this.hokhau = response.dia_chi_gia_dinh;
    this.svdienthoai = response.sdt_sinhvien;
    this.giadinhdienthoai = response.sdt_giadinh;
    this.emailThuongDung = response.email_khac;

    this.svhocluc = response._hoc_luc_id;
    this.svhoancanh = response._hoan_canh_id;
    this.svloaiphong = response._phong_id._id;

    this.fileAvatar ={};
    this.imagePreviewUrl= response.avatar? response.avatar : '/uploads/LogoBK.png';
    this.imageUrl=response.avatar? response.avatar : '/uploads/LogoBK.png';
    this.helpBlockUpload = '';
  }

  onDeleteUserSuccess() {
    ManageUserAction.getUsers();
    this.modalIsOpenDelete = false;
  }

  onEditUserSuccess() {
    ManageUserAction.getUsers();
    this.editModalShow = false;
  }
  onUpdateInfoKtxSuccess(data){
    if(data == undefined) {
      ManageUserAction.getUsersByGiaHanThanhCong();
    } else {
      ManageUserAction.getUsersByXetDuyetThanhCong();
    }
  }

  onImportUserSuccess() {
    ManageUserAction.getUsers();
  }

  onUpdateHocVuXetDuyetSuccess(data) {
    this.usersehv = data;
    ManageUserAction.getUsersByHocVuXetDuyet();
    // localStorage.setItem('deactiveStep2', false);
    // localStorage.setItem('activeHocvu', true);
    this.activeHocvu = true;
    this.deactiveStep2 = false;
  }

  onUpdateHocVuGiaHanSuccess(data) {
    this.usersehvgh = data;
    ManageUserAction.getUsersByHocVuGiaHan();
    // localStorage.setItem('deactiveStep2', false);
    // localStorage.setItem('activeHocvu', true);
    this.activeHocvu = true;
    this.deactiveStep2 = false;
  }

  onUpdateDiemRenLuyenXetDuyetSuccess(data) {
    this.usersedrl = data.eusers;
    ManageUserAction.getUsersByDiemRenLuyenXetDuyet(data.drl);
    this.inputdrl = data.drl;
    this.activeDiemrenluyen = true;
    this.deactiveStep3 = false;
  }

  onUpdateDiemRenLuyenGiaHanSuccess(data) {
    this.usersedrlgh = data.eusers;
    ManageUserAction.getUsersByDiemRenLuyenGiaHan(data.drl);
    this.inputdrl = data.drl;
    this.activeDiemrenluyen = true;
    this.deactiveStep3 = false;
  }

  onUpdateDiemRenLuyenKtxSuccess(data) {
    this.usersedrlktx = data.eusers;
    ManageUserAction.getUsersByDiemRenLuyenKtx({drl : this.inputdrl, drlktx : data.drlktx, dvs: data.dvs});
    this.inputdrlktx = data.drlktx;
    this.inputdvs = data.dvs;
    this.activeDiemrenluyenKtx = true;
    this.deactiveStep3 = false;
  }

  onUpdateXetDuyetXetDuyetSuccess(payload) {
    ManageUserAction.getUsersByDiemXetDuyetXetDuyet(payload);
    // localStorage.setItem('deactiveStep3', false);
    this.activeDiemxetduyet = true;
  }

  onUpdateXetDuyetGiaHanSuccess(payload) {
    ManageUserAction.getUsersByDiemXetDuyetGiaHan(payload);
    // localStorage.setItem('deactiveStep3', false);
    this.activeDiemxetduyet = true;
  }
  // onUpdateuser(event)
  // {
  // 	this.user = event.target.value;
  //    this.helpBlock='';
  // }
  // onUpdatepassword(event)
  // {
  // 	this.password = event.target.value;
  //   this.helpBlock='';
  // }
  // onSetOpenModal(boolean)
  // {
  //     this.LoginModalisOpen = boolean;
  //     this.user ='';
  //     this.password ='';
  // }

  onUpdateImagepreview(imgURL)
  {
      this.imagePreviewUrl = imgURL;
  }
  onUpdateImagefile(file)
  {
      this.fileAvatar = file;
  }

  onHandleUpload()
  {
      this.helpBlockUpload ="Đang tải lên....";
  }
  onUploadSuccess(link){
      this.helpBlockUpload ="Tải lên thành công";
      this.imageUrl=link;
      console.log("link:" + link);
  }
  onUploadFail(jqXhr){
      this.helpBlockUpload ="Quá trình tải thất bại";
      toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateHoLot(e){
    this.holot = e.target.value;
  }
  onUpdateTen(e){
    this.ten = e.target.value;
  }
  onUpdateGioiTinh(e){
    this.gioitinh = e.target.value;
  }
  onUpdateNgaySinh(date){
      this.ngaySinh = date;
  }
  onUpdateKhoa(e){
    this.svkhoa = e.target.value;
  }
  onUpdateHeDaoTao(e){
    this.svhedaotao = e.target.value;
  }
  onUpdateNamVaoTruong(e){
    this.namvaotruong = e.target.value;
  }
  onUpdateKhuVuc(e){
    this.svkhuvuc = e.target.value;
  }
  onUpdateTinh(e){
    this.svtinh = e.target.value;
  }
  onUpdateDoiTuong(e){
    this.svdoituong = e.target.value;
  }
  onUpdateTonGiao(e){
    this.svtongiao = e.target.value;
  }
  onUpdateDoanThe(e){
    this.svdoanthe = e.target.value;
  }
  onUpdateSoCMND(e){
    this.socmnd = e.target.value;
  }
  onUpdateHoKhau(e){
    this.hokhau = e.target.value;
  }
  onUpdateDienThoaiSV(e){
    this.svdienthoai = e.target.value;
  }
  onUpdateDienThoaiGiaDinh(e){
    this.giadinhdienthoai = e.target.value;
  }
  onUpdateEmailThuongDung(e){
    this.emailThuongDung = e.target.value;
  }
  onUpdateHocLuc(e){
    this.svhocluc = e.target.value;
  }
  onUpdateHoanCanh(e){
    this.svhoancanh = e.target.value;
  }
  onUpdateLoaiPhong(e){
    this.svloaiphong = e.target.value;
  }

  onOpenMoDDeleteStudent(id){
    this.idDel = id;
    this.modalIsOpenDelete = true;
  }
  onCloseModalDelete(){
    this.modalIsOpenDelete = false;
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
        this.validateDienThoaiSV = 'Nhập số điện thoại sinh viên';
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
        this.validateLoaiPhong = 'Vui lòng chọn loại phòng';
    }

    onCloseModalEdit(){
      this.editModalShow = false;
    }
}

export default alt.createStore(ManageUserStore);
