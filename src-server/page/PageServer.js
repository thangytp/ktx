var page = require('../../models/page');

function PageServer(app){

	//get list page
	app.get('/api/getListPage', function(req, res, next){
		try{
			page.find()
			.sort({_id:-1})
			.exec(function(err, listPage){
				if(err) return next(err);
				res.send(listPage);
			})
		} catch(e){
		    res.status(e).send({ message: 'Error when get list page'});
		}

	});

	// get page by id
	app.get('/api/getpage/:id', function(req, res, next){
		var id = req.params.id;
		page.findOne({_id: id})
		.exec(function(err, page){
			if(err) return next(err);
			if (!page) {
		      	return res.status(404).send({ message: 'Không tìm thấy trang.' });
		    }
		    res.send({data: page});
		});
	});

	// add page
	app.post('/api/addpage', function(req, res, next){
		var title = req.body.title;
		var layoutType = req.body.layoutType;
		var content = req.body.content;
		var cotphaiHome = req.body.cotphaiHome;
		var imgRight = [];
		var videoRight = [];
		var numberOfImageItem = req.body.numberOfImageItem;
		var numberOfVideoItem = req.body.numberOfVideoItem;

		if(layoutType==1){
			var newPage = new page({
				title: title,
				layoutType: layoutType,
				content: content
				
			});
			newPage.save(function(err){
				if(err) return next(err);
				res.send({message: 'Thêm trang thành công!'});
			});
		}
		else{
			if(cotphaiHome==1){
				var newPage = new page({
					title: title,
					layoutType: layoutType,
					content: content,
					cotPhaiHome: cotphaiHome
				});
				newPage.save(function(err){
					if(err) return next(err);
					res.send({message: 'Thêm trang thành công!'});
				});
			}
			else{
				if(numberOfImageItem != 0){
					for(var i=0; i<numberOfImageItem; i++){
						imgRight.push({'imgText': req.body['imgRight['+i+'][imgText]'], 'imgLink': req.body['imgRight['+i+'][imgLink]'], 'linkToPage': req.body['imgRight['+i+'][linkToPage]']});
					}
				}
				if(numberOfVideoItem != 0){
					for(var i=0; i<numberOfVideoItem; i++){
						videoRight.push({'videoText': req.body['videoRight['+i+'][videoText]'], 'videoLink': req.body['videoRight['+i+'][videoLink]']});
					}
				}
				var newPage = new page({
					title: title,
					layoutType: layoutType,
					content: content,
					cotPhaiHome: cotphaiHome,
					imgRight: imgRight,
					videoRight: videoRight
				});
				newPage.save(function(err){
					if(err) return next(err);
					res.send({message: 'Thêm trang thành công!', data:newPage});
				});
			}
		}

	});

	// update page
	app.put('/api/updatepage', function(req, res, next){
		var id = req.body.id;
		var title = req.body.title;
		var layoutType = req.body.layoutType;

		var content = req.body.content;
		var cotphaiHome = req.body.cotphaiHome;
		var imgRight = [];
		var videoRight = [];
		var numberOfImageItem = req.body.numberOfImageItem;
		var numberOfVideoItem = req.body.numberOfVideoItem;

		page.findOne({_id: id}, function(err, pageRes){
			if(err) return next(err);
			if(layoutType==1){
				pageRes.update({ $set: {title: title, content: content, layoutType: layoutType} }, function(err, re){
					res.send({message: 'Cập nhật trang thành công!'});
				});
			}
			else{
				if(cotphaiHome==1){
					
					pageRes.update({ $set: {title: title, content: content, layoutType: layoutType, cotPhaiHome: cotphaiHome} }, function(err, re){
						res.send({message: 'Cập nhật trang thành công!'});
					});
				}
				else{
					if(numberOfImageItem != 0){
						for(var i=0; i<numberOfImageItem; i++){
							imgRight.push({'imgText': req.body['imgRight['+i+'][imgText]'], 'imgLink': req.body['imgRight['+i+'][imgLink]'], 'linkToPage': req.body['imgRight['+i+'][linkToPage]']});
						}
					}
					if(numberOfVideoItem != 0){
						for(var i=0; i<numberOfVideoItem; i++){
							videoRight.push({'videoText': req.body['videoRight['+i+'][videoText]'], 'videoLink': req.body['videoRight['+i+'][videoLink]']});
						}
					}
					
					pageRes.update({ $set: { title: title, layoutType: layoutType, content: content, cotPhaiHome: cotphaiHome,
							imgRight: imgRight, videoRight: videoRight} }, function(err, re){
								console.log(layoutType);
						res.send({message: 'Cập nhật trang thành công!', page: pageRes});
					});
					
				}
			}
		});

	});

	//============= xoa trang
	app.delete('/api/deletepage', function(req, res, next){
		var id= req.body.id;
		page.remove({_id: id}, function(err, re){
			if(err) return next(err);
			res.send(re.result);
		});
	});

	// get list page by name
	app.get('/api/searchpage/:name', function(req, res, next){
		var name = req.params.name;
		console.log(name);
		page.find({title: { $regex: new RegExp(name, "i") } })
		.exec(function(err, pages){
			if(err) return next(err);
			if (!pages) {
		      	return res.status(404).send({ message: 'Không tìm thấy trang.' });
		    }
		    res.send(pages);
		});
	});

}
module.exports = PageServer;