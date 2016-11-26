var CotPhaiHome = require('../../models/cotphaihome');

function CotPhaiHomeServer(app){

	app.get('/api/getlistcotphaihome', function(req, res, next){
		try{
			CotPhaiHome.find()
			.sort({sort:1})
			.exec(function(err, listItem){
				if(err) return next(err);
				res.send(listItem);
			})
		} catch(e){
		    res.status(e).send({ message: 'Error when get list page'});
		}
	});

	app.get('/api/getitem/:id', function(req, res, next){
		var id = req.params.id;
		CotPhaiHome.findOne({_id: id}, function(err, itemRes){
			if(err) return next(err);
			res.send(itemRes);
		});
	});

	app.post('/api/additemimage', function(req, res, next){
		var name = req.body.name;
		var link = req.body.link;
		var image = req.body.image;
		var type = req.body.type;
		var count = 0;

		CotPhaiHome.find(function(err, itemRes){
			if(err) return next(err);
			if(itemRes.length == 0) count = 1;
			else count = itemRes.length + 1;
			var newItem = new CotPhaiHome({
				name: name,
				linkToPage: link,
				image: image,
				type: type,
				sort: count
			});
			newItem.save(function(err){
				if(err) return next(err);
				res.send({message: 'Them item thanh cong'});
			});
		});
	});

	app.put('/api/updateitemimage', function(req, res, next){
		var id = req.body.id;
		var name = req.body.name;
		var link = req.body.link;
		var image = req.body.image;
		var type = req.body.type;

		CotPhaiHome.findOne({_id: id}, function(err, itemRes){
			if(err) return next(err);
			
			itemRes.update({ $set: {
				name: name,
				linkToPage: link,
				image: image,
				type: type
				
			} }, function(err, re){
				res.send({message: 'Cập nhật item thành công!'});
			});
			
		});
	});

	app.post('/api/additemvideo', function(req, res, next){
		var name = req.body.name;
		var link = req.body.link;
		var type = req.body.type;
		var count = 0;

		CotPhaiHome.find(function(err, itemRes){
			if(err) return next(err);
			if(itemRes.length == 0) count = 1;
			else count = itemRes.length + 1;
			var newItem = new CotPhaiHome({
				name: name,
				linkVideo: link,
				type: type,
				sort: count
			});
			newItem.save(function(err){
				if(err) return next(err);
				res.send({message: 'Them item thanh cong'});
			});
		});
	});

	app.put('/api/updateitemvideo', function(req, res, next){
		var id = req.body.id;
		var name = req.body.name;
		var link = req.body.link;
		var type = req.body.type;

		CotPhaiHome.findOne({_id: id}, function(err, itemRes){
			if(err) return next(err);
			
			itemRes.update({ $set: {
				name: name,
				linkVideo: link,
				type: type
				
			} }, function(err, re){
				res.send({message: 'Cập nhật item thành công!'});
			});
			
		});
	});

	// xoa site
	app.post('/api/deleteitem', function(req, res, next){
		var id = req.body.id;
		CotPhaiHome.remove({_id: id}, function(err, re){
			res.send({message: 'Delete thanh cong'});
		});
	});

}
module.exports = CotPhaiHomeServer;