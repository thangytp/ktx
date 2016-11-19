var student = require('../../models/student');

function LuuTruServer(app){
	app.post('/api/dangkyluutru', function(req, res, next){
		var userEmail = req.body.userEmail;
		var userName = req.body.userName;
		var mssv = req.body.svmssv;
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
	    		nam_vao_truong: namvaotruong,
	    		_khu_vuc_id: svkhuvuc,
	    		_tinh_id: svtinh,
	    		_doi_tuong_id: svdoituong,
	    		_hoc_luc_id: svhocluc,
	    		_hoan_canh_id: svhoancanh,
	    		tang: svloaiphong
	    	});
	    	newStu.save(function(err){
	    		if(err) return next(err);
	    		res.send({ message: 'Dang ky luu tru thanh cong!' });
	    	});
	    }
		catch (e) {
	        res.status(e).send({ message: bookname+ 'error when add new.' });
	    }

	});
}
module.exports = LuuTruServer;