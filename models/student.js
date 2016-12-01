var mongoose = require('mongoose');


var studentSchema = new mongoose.Schema({
  fk_doan_the: String,
  ma_ktx: String,
  hoc_ky_nop_hs: String,
  nam_hoc_nop_hs: String,
  nam_hoc: String,
  hoc_ky: String,
  ma_sinh_vien: String,
  ho_lot: String,
  ten: String,
  ten_dan_toc: String,
  fk_dien_uu_tien: String,
  uu_tien_khac: String,
  so_cmnd: String,
  ma_giuong: String,
  ten_phong: String,
  ten_giuong: String,
  nam_vao_truong: String,
  phai: String,
  ngay_vao_ktx: String,
  ngay_ra_ktx: String,
  ghi_chu: String,
  ngay_lam_thu_tuc: String,
  dk_hoc_ky_moi: String,
  dk_hoc_ky_he: String,
  ngay: String,
  thang: String,
  ly_do_ra: String,
  ngay_sinh: String,
  dia_chi_gia_dinh: String,
  ten_tinh_tp: String,
  dtqt: String,
  bk: String,
  dien_thoai: String,
  email: String,
  ten_doan_the: String,
  tamdung_hocvu:    {type: 'Boolean', default: false},
  diem_ren_luyen: Number,
  diem_xet_duyet: Number,
  dang_o_ktx: {type: 'Boolean', default: false},
  gia_han_luu_tru: {type: 'Boolean', default: false},
  xet_duyet_thanh_cong: {type: 'Boolean', default: false},
  gia_han_thanh_cong: {type: 'Boolean', default: false},
  diem_ren_luyen_ktx : [{
    tong: {type : 'Number'},
    ve_sinh: {type: 'Number'}
  }],
  _phong_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Phong'},
  _khu_vuc_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Khuvuc'},
  _doi_tuong_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Doituong'},
  _hoc_luc_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Hocluc'},
  _hoan_canh_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Hoancanh'},
  _tinh_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Tinh'}
});
module.exports = mongoose.model('Student', studentSchema);
