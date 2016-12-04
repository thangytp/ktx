var khoa = require('../../models/khoa');
var hedaotao  = require('../../models/hedaotaonew');

function KhoaServer(app){

	app.get('/api/getlistkhoa', function(req, res, next){
		try{
			khoa.find()
			.sort({_id:-1})
			.exec(function(err, listKhoa){
				if(err) return next(err);
				res.send(listKhoa);
			})
		}
		catch(e){
		    res.status(e).send({ message: 'Error when get list khoa'});
		}
	});

	// get khoa by id
	app.get('/api/getkhoabyid/:id', function(req, res, next){
		var id = req.params.id;
		khoa.findOne({_id: id})
		.exec(function(err, khoaRes){
			if(err) return next(err);
			if (!khoaRes) {
		      	return res.status(404).send({ message: 'Không tìm thấy khoa.' });
		    }
		    res.send(khoaRes);
		});
	});

	// add khoa
	app.post('/api/addkhoa', function(req, res, next){
		var ten = req.body.ten;
			
			var newKhoa = new khoa({
				ten: ten

			});
			newKhoa.save(function(err){
				if(err) return next(err);
				res.send({message: 'Thêm khoa thành công!'});
			});
	});

	// update khoa
	app.put('/api/updatekhoa', function(req, res, next){
		var id = req.body.id;
		var ten = req.body.ten;

		khoa.findOne({_id: id}, function(err, khoaRes){
			if(err) return next(err);
			
				khoaRes.update({ $set: {ten: ten} }, function(err, re){
					res.send({message: 'Cập nhật khoa thành công!'});
				});
			
		});

	});

	//============= xoa khoa
	app.delete('/api/deletekhoa', function(req, res, next){
		var id= req.body.id;
		khoa.remove({_id: id}, function(err, re){
			if(err) return next(err);
			res.send(re.result);
		});
	});

	//he dao tao api
	app.get('/api/getlisthedaotao', function(req, res, next){
		try{
			hedaotao.find()
			.sort({_id:-1})
			.exec(function(err, listHeDaoTao){
				if(err) return next(err);
				res.send(listHeDaoTao);
			})
		}
		catch(e){
		    res.status(e).send({ message: 'Error when get list khoa'});
		}
	});

	// get khoa by id
	app.get('/api/gethedaotaobyid/:id', function(req, res, next){
		var id = req.params.id;
		hedaotao.findOne({_id: id})
		.exec(function(err, hedaotaoRes){
			if(err) return next(err);
			if (!hedaotaoRes) {
		      	return res.status(404).send({ message: 'Không tìm thấy khoa.' });
		    }
		    res.send(hedaotaoRes);
		});
	});

	// add khoa
	app.post('/api/addhedaotao', function(req, res, next){
		var ten = req.body.ten;
			
			var newHeDaoTao = new hedaotao({
				ten: ten

			});
			newHeDaoTao.save(function(err){
				if(err) return next(err);
				res.send({message: 'Thêm khoa thành công!'});
			});
	});

	// update khoa
	app.put('/api/updatehedaotao', function(req, res, next){
		var id = req.body.id;
		var ten = req.body.ten;

		hedaotao.findOne({_id: id}, function(err, hedaotaoRes){
			if(err) return next(err);
			
				hedaotaoRes.update({ $set: {ten: ten} }, function(err, re){
					res.send({message: 'Cập nhật khoa thành công!'});
				});
			
		});

	});

	//============= xoa khoa
	app.delete('/api/deletehedaotao', function(req, res, next){
		var id= req.body.id;
		hedaotao.remove({_id: id}, function(err, re){
			if(err) return next(err);
			res.send(re.result);
		});
	});
}

module.exports = KhoaServer;