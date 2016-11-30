var tintuchome = require('../../models/tintuchome');
var tintuc = require('../../models/tintuc');

function TinTucHomeServer(app){

	//get list page
	app.get('/api/getListTinTucHome', function(req, res, next){
		try{
			tintuchome.find()
			.sort({_id:-1})
			.exec(function(err, listTinTuc){
				if(err) return next(err);
				res.send(listTinTuc);
			})
		} catch(e){
		    res.status(e).send({ message: 'Error when get list tin'});
		}

	});

	// get page by id
	app.get('/api/gettintuchome/:id', function(req, res, next){
		var id = req.params.id;
		tintuchome.findOne({_id: id})
		.exec(function(err, tintucRes){
			if(err) return next(err);
			if (!tintucRes) {
		      	return res.status(404).send({ message: 'Không tìm thấy tin.' });
		    }
		    res.send({data: tintucRes});
		});
	});

	// get list tin tuc hienthi=1
	app.get('/api/getListTinTucToDisplayHome', function(req, res, next){
		try{
			tintuchome.find({hienthi: 1})
			.sort({_id: 1})
			.exec(function(err, listTinTuc){
				if(err) return next(err);
				res.send(listTinTuc);
			})
		} catch(e){
		    res.status(e).send({ message: 'Error when get list tin'});
		}
	});

	// add page
	app.post('/api/addtintuchome', function(req, res, next){
		var title = req.body.title;
		var content = req.body.content;
		var linkChitiet = req.body.linkChitiet;	
		var hienthi = req.body.hienthi;
			
			var newTinTuc = new tintuchome({
				title: title,
				content: content,
				linkChitiet: linkChitiet,
				hienthi: hienthi
				
			});
			newTinTuc.save(function(err){
				if(err) return next(err);
				res.send({message: 'Thêm tin thành công!'});
			});
	});

	// update page
	app.put('/api/updatetintuchome', function(req, res, next){
		var id = req.body.id;
		var title = req.body.title;
		var content = req.body.content;
		var linkChitiet = req.body.linkChitiet;
		var hienthi = req.body.hienthi;

		tintuchome.findOne({_id: id}, function(err, tintucRes){
			if(err) return next(err);
			
				tintucRes.update({ $set: {title: title, content: content, linkChitiet: linkChitiet, hienthi: hienthi} }, function(err, re){
					res.send({message: 'Cập nhật trang thành công!'});
				});
			
		});

	});

	//============= xoa trang
	app.delete('/api/deletetintuchome', function(req, res, next){
		var id= req.body.id;
		tintuchome.remove({_id: id}, function(err, re){
			if(err) return next(err);
			res.send(re.result);
		});
	});

	// get list page by name
	app.get('/api/searchtintuchome/:name', function(req, res, next){
		var name = req.params.name;
		tintuc.find({title: { $regex: new RegExp(name, "i") } })
		.exec(function(err, tintucs){
			if(err) return next(err);
			if (!tintucs) {
		      	return res.status(404).send({ message: 'Không tìm thấy tin tức.' });
		    }
		    res.send(tintucs);
		});
	});

}
module.exports = TinTucHomeServer;