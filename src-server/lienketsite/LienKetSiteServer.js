var LienketSite = require('../../models/lienketsite');

function LienKetSiteServer(app){

	app.get('/api/getlistsite', function(req, res, next){
		try{
			LienketSite.find()
			.sort({sort:-1})
			.exec(function(err, listSite){
				if(err) return next(err);
				res.send(listSite);
			})
		} catch(e){
		    res.status(e).send({ message: 'Error when get list page'});
		}
	});

	app.get('/api/getsite/:id', function(req, res, next){
		var id = req.params.id;
		LienketSite.findOne({_id: id}, function(err, siteRes){
			if(err) return next(err);
			res.send(siteRes);
		});
	});

	app.post('/api/addsite', function(req, res, next){
		var name = req.body.name;
		var link = req.body.link;
		var image = req.body.image;
		var count = 0;

		LienketSite.find(function(err, siteRes){
			if(err) return next(err);
			if(siteRes.length == 0) count = 1;
			else count = siteRes.length + 1;
			var newSite = new LienketSite({
				name: name,
				link: link,
				image: image,
				sort: count
			});
			newSite.save(function(err){
				if(err) return next(err);
				res.send({message: 'Them site thanh cong'});
			});
		});
	});

	app.put('/api/updatesite', function(req, res, next){
		var id = req.body.id;
		var name = req.body.name;
		var link = req.body.link;
		var image = req.body.image;

		LienketSite.findOne({_id: id}, function(err, siteRes){
			if(err) return next(err);
			
			siteRes.update({ $set: {
				name: name,
				link: link,
				image: image
				
			} }, function(err, re){
				res.send({message: 'Cập nhật site thành công!'});
			});
			
		});
	});

	// xoa site
	app.post('/api/deletesite', function(req, res, next){
		var id = req.body.id;
		LienketSite.remove({_id: id}, function(err, re){
			res.send({message: 'Delete thanh cong'});
		});
	});

}
module.exports = LienKetSiteServer;