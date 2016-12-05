var student = require('../../models/student');
var Phong = require('../../models/phong');

function LuuTruServer(app){
	app.post('/api/dangkyluutru', function(req, res, next){
		var userEmail = req.body.userEmail;

		var mssv = req.body.svmssv;
		var holot = req.body.holot;
		var ten = req.body.ten;
		var svkhuvuc = req.body.svkhuvuc;
		var gioitinh = req.body.gioitinh;
		var ngaySinh = req.body.ngaySinh;
		var svtinh = req.body.svtinh;
		var svkhoa = req.body.svkhoa;
		var namvaotruong = req.body.namvaotruong;
	    var svhedaotao = req.body.svhedaotao;

	    var svdoituong = req.body.svdoituong;
	    var svtongiao = req.body.svtongiao;
	    var svdoanthe = req.body.svdoanthe;
	    var socmnd = req.body.socmnd;
	    var hokhau = req.body.hokhau;
	    var svdienthoai = req.body.svdienthoai;
	    var giadinhdienthoai = req.body.giadinhdienthoai;
	    var emailThuongDung = req.body.emailThuongDung;

	    var svhocluc = req.body.svhocluc;
	    var svhoancanh = req.body.svhoancanh;
	    var svloaiphong = req.body.svloaiphong;

	    var dichvu = req.body.dichvu;

	    var arrDichVu = [];
			if(dichvu){
		    for(var i=0; i<dichvu.length; i++){
		    	arrDichVu.push({'_dichvu_id':dichvu[i]});
		    }
			}

	    try{
	    	var newStu = new student({
	    		email: userEmail,
	    		ma_sinh_vien: mssv,
	    		ho_lot: holot,
	    		ten: ten,
	    		_khu_vuc_id: svkhuvuc,
	    		phai: gioitinh,
	    		ngay_sinh: ngaySinh,
	    		_tinh_id: svtinh,
	    		_khoa_id: svkhoa,
	    		nam_vao_truong: namvaotruong,
	    		_he_dao_tao_id: svhedaotao,

	    		_doi_tuong_id: svdoituong,
	    		tongiao: svtongiao,
	    		ten_doan_the: svdoanthe,
	    		so_cmnd: socmnd,
	    		dia_chi_gia_dinh: hokhau,
	    		sdt_sinhvien: svdienthoai,
	    		sdt_giadinh: giadinhdienthoai,
	    		email_khac: emailThuongDung,

	    		_hoc_luc_id: svhocluc,
	    		_hoan_canh_id: svhoancanh,
	    		_phong_id: svloaiphong,
	    		dich_vu: arrDichVu,
	    		dang_o_ktx: false
	    	});
	    	newStu.save(function(err){
	    		if(err) return next(err);
	    		res.send({ message: 'Dang ky luu tru thanh cong!' });
	    	});
	    }
		catch (e) {
	        res.status(e).send({ message: 'Đăng ký lưu trú thất bại' });
	    }

	});

	app.put('/api/giahanluutru', function(req, res, next){
		var idStu = req.body.idStu;

	    var svhocluc = req.body.svhocluc;
	    var svhoancanh = req.body.svhoancanh;
	    var svloaiphong = req.body.svloaiphong;

	    try{
	    	student.findOne({_id: idStu}, function(err, stuRes){
	    		if(err) return next(err);
	    		stuRes.update({ $set: {_hoc_luc_id: svhocluc, _hoan_canh_id: svhoancanh, _phong_id: svloaiphong, gia_han_luu_tru: true} }, function(err1, re){
	    			if(err1) return next(err1);
	    			res.send({message: 'Gia hạn thành công'});
	    		});
	    	});

	    }
		catch (e) {
	        res.status(e).send({ message: 'Gia hạn thất bại' });
	    }

	});

	app.get('/api/getstudentBymssv/:id', function(req, res, next){
		var mssv = req.params.id;
		student.findOne({ma_sinh_vien: mssv})
		// .populate('_khu_vuc_id')
		// .populate('_doi_tuong_id')
		// .populate('_hoc_luc_id')
		// .populate('_hoan_canh_id')
		// .populate('_tinh_id')
		// .populate('_khu_vuc_id')
		.exec(function(err, stuRes){
			if(err) return next(err);
			res.send(stuRes);
		});
	});

	app.get('/api/getphongbyid/:id', function(req, res, next){
		var id= req.params.id;
		Phong.findOne({_id: id}, function(err, phongRes){
			if(err) return next(err);
			if(phongRes){
				res.send(phongRes);
			}
		});
	});
}
module.exports = LuuTruServer;
