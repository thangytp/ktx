var student = require('../../models/student');
var Phong = require('../../models/phong');

function LuuTruServer(app){
	app.post('/api/dangkyluutru', function(req, res, next){
		var userEmail = req.body.userEmail;
		var userName = req.body.userName;
		var mssv = req.body.svmssv;
		var gioitinh = req.body.gioitinh;
		var namvaotruong = req.body.namvaotruong;
	    var svkhuvuc = req.body.svkhuvuc;
	    var svtinh = req.body.svtinh;
	    var svdoituong = req.body.svdoituong;
	    var svhocluc = req.body.svhocluc;
	    var svhoancanh = req.body.svhoancanh;
	    var svloaiphong = req.body.svloaiphong;

	    try{
	    	var newStu = new student({
	    		email: userEmail,
	    		ten: userName,
	    		ma_sinh_vien: mssv,
	    		phai: gioitinh,
	    		nam_vao_truong: namvaotruong,
	    		_khu_vuc_id: svkhuvuc,
	    		_tinh_id: svtinh,
	    		_doi_tuong_id: svdoituong,
	    		_hoc_luc_id: svhocluc,
	    		_hoan_canh_id: svhoancanh,
	    		_phong_id: svloaiphong,
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
