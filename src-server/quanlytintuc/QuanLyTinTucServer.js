var tintuc = require('../../models/tintuc');
var tintuchome = require('../../models/tintuchome');
var Admin = require('../../models/admin');

function QuanLyTinTucServer(app){

	//get list page
	app.get('/api/getListTinTuc', function(req, res, next){
		try{
			tintuc.find()
			.sort({_id:-1})
			.exec(function(err, listTinTuc){
				if(err) return next(err);
				res.send(listTinTuc);
			})
		} catch(e){
		    res.status(e).send({ message: 'Error when get list tin'});
		}

	});

	app.get('/api/getListTinTucLimit/:from/:limit', function(req, res, next){
		try{
			tintuc.find()
			.sort({_id:-1})
			.limit(parseInt(req.params.limit))
			.skip(parseInt(req.params.from))
			.exec(function(err, listTinTuc){
				if(err) return next(err);
				res.send(listTinTuc);
			})
		} catch(e){
		    res.status(e).send({ message: 'Error when get list tin'});
		}

	});

	// get page by id
	app.get('/api/gettintuc/:id', function(req, res, next){
		var id = req.params.id;
		tintuc.findOne({_id: id})
		.exec(function(err, tintucRes){
			if(err) return next(err);
			if (!tintucRes) {
		      	return res.status(404).send({ message: 'Không tìm thấy tin.' });
		    }
		    res.send({data: tintucRes});
		});
	});

	// get list tin tuc to display bottom home
	app.get('/api/getListTinTucBottom', function(req, res, next){
		try{
			tintuchome.find({hienthi: 1})
			.exec(function(err, listTinTucTop){
				if(err) return next(err);

				var _query = [];
				listTinTucTop.forEach(function(e){
					_query.push(e.linkChitiet);
				});

				tintuc.find({ slug: {$nin: _query} })
				.sort({dateCreate:-1})
				.limit(10)
				.exec(function(err, listTinTucBottom){
					if(err) return next(err);
					res.send(listTinTucBottom);
				})
			});
			
		} catch(e){
		    res.status(e).send({ message: 'Error when get list tin'});
		}
	});

	// get tin tuc by link
	app.get('/api/gettintucbylink/:link', function(req, res, next){
		var link  = req.params.link;
		tintuc.findOne({slug: link})
		.exec(function(err, tintucRes){
			if(err) return next(err);
			res.send(tintucRes);
		});
	});
	// get tin tuc by title
	app.get('/api/gettintucbytitle/:text', function(req, res, next){
		var text  = req.params.text;
		tintuc.find({title: { $regex: new RegExp(text, "i") } })
		.exec(function(err, tintucRes){
			if(err) return next(err);
			res.send(tintucRes);
		});
	});

	// add page
	app.post('/api/addtintuc', function(req, res, next){
		var access_token = req.body.access_token;
		var title = req.body.title;
		var content = req.body.content;
		var description = req.body.description;
		var img = req.body.img;
		var dateCreate = req.body.dateCreate;
		var slug = req.body.slug;
		var hienthi = req.body.hienthi;

		Admin.findOne({access_token: access_token}, function(err, admin){
			if(err) return next(err);
			if(admin){
				var newTinTuc = new tintuc({
					title: title,
					content: content,
					description: description,
					img: img,
					dateCreate: dateCreate,
					slug: slug,
					hienthi: hienthi
				
				});
				newTinTuc.save(function(err){
					if(err) return next(err);
					res.send({message: 'Thêm tin thành công!'});
				});
			}
		});	
	});

	// update page
	app.put('/api/updatetintuc', function(req, res, next){
		var access_token = req.body.access_token;

		var id = req.body.id;
		var title = req.body.title;
		var content = req.body.content;
		var description = req.body.description;
		var img = req.body.img;
		var dateModify = req.body.dateModify;
		var slug = req.body.slug;
		var hienthi = req.body.hienthi;

		Admin.findOne({access_token: access_token}, function(err, admin){
			if(err) return next(err);
			if(admin){
				tintuc.findOne({_id: id}, function(err, tintucRes){
					if(err) return next(err);
						tintucRes.update({ $set: {title: title, content: content, description: description, img: img, dateModify: dateModify, slug: slug, hienthi: hienthi } }, function(err, re){
							res.send({message: 'Cập nhật tin thành công!'});
						});
					
				});
			}
		});

	});

	//============= xoa tin tuc
	app.delete('/api/deletetintuc', function(req, res, next){
		var access_token = req.body.access_token;
		var id= req.body.id;
		Admin.findOne({access_token: access_token}, function(err, admin){
			if(err) return next(err);
			if(admin){
				tintuc.remove({_id: id}, function(err, re){
					if(err) return next(err);
					res.send(re.result);
				});
			}
		});
	});

	// get list page by name
	app.get('/api/searchtintuc/:name', function(req, res, next){
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
module.exports = QuanLyTinTucServer;