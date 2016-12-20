var caidatluutru = require('../../models/caidatluutru');

function CaiDatLuuTruServer(app){
	
	app.get('/api/getcaidatdangkymoi', function(req, res, next){
		caidatluutru.find()
		.exec(function(err, caidat){
			if(err) return next(err);
			res.send(caidat);
		})
	});

	app.post('/api/luudangkymoi', function(req, res, next){
		var ngayBatDauDangKy = req.body.ngayBatDauDangKy;
		var ngayKetThucDangKy = req.body.ngayKetThucDangKy;

		try {
			var newCaiDatLuuTru = new caidatluutru({
				dangkymoi : {ngaybatdaudangky: ngayBatDauDangKy, ngayketthucdangky: ngayKetThucDangKy}
			});
			newCaiDatLuuTru.save(function(err){
	    		if(err) return next(err);
	    		res.send({ message: 'Lưu thành công.' });
	    	});

		}catch (e) {
	        res.status(e).send({ message: 'Lưu thất bại. Thử lại' });
	    }
	});
	app.put('/api/updatedangkymoi', function(req, res, next){
		var idNgayBatDauDangKy = req.body.idNgayBatDauDangKy;
		var ngayBatDauDangKy = req.body.ngayBatDauDangKy;
		var ngayKetThucDangKy = req.body.ngayKetThucDangKy;

		try {
			caidatluutru.findOne({_id: idNgayBatDauDangKy}, function(err, caidatRes){
				if(err) return next(err);
				caidatRes.update({ $set: { dangkymoi : {ngaybatdaudangky: ngayBatDauDangKy, ngayketthucdangky: ngayKetThucDangKy} } }, function(err1, re){
					if(err1) return next(err);
					res.send({ message: 'Lưu thành công.' });
				});
			});

		}catch (e) {
	        res.status(e).send({ message: 'Lưu thất bại. Thử lại' });
	    }
	});

	app.post('/api/luugiahan', function(req, res, next){
		var ngayBatDauGiaHan = req.body.ngayBatDauGiaHan;
		var ngayKetThucGiaHan = req.body.ngayKetThucGiaHan;

		try {
			var newCaiDatLuuTru = new caidatluutru({
				giahan : {ngaybatdaugiahan: ngayBatDauGiaHan, ngayketthucgiahan: ngayKetThucGiaHan}
			});
			newCaiDatLuuTru.save(function(err){
	    		if(err) return next(err);
	    		res.send({ message: 'Lưu thành công.' });
	    	});

		}catch (e) {
	        res.status(e).send({ message: 'Lưu thất bại. Thử lại' });
	    }
	});
	app.put('/api/updategiahan', function(req, res, next){
		var idNgayBatDauDangKy = req.body.idNgayBatDauDangKy;
		var ngayBatDauGiaHan = req.body.ngayBatDauGiaHan;
		var ngayKetThucGiaHan = req.body.ngayKetThucGiaHan;

		try {
			caidatluutru.findOne({_id: idNgayBatDauDangKy}, function(err, caidatRes){
				if(err) return next(err);
				caidatRes.update({ $set: { giahan : {ngaybatdaugiahan: ngayBatDauGiaHan, ngayketthucgiahan: ngayKetThucGiaHan} } }, function(err1, re){
					if(err1) return next(err);
					res.send({ message: 'Lưu thành công.' });
				});
			});
				
			
		}catch (e) {
	        res.status(e).send({ message: 'Lưu thất bại. Thử lại' });
	    }
	});
}
module.exports = CaiDatLuuTruServer;