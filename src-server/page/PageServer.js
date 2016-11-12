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
					cotphaiHome: cotphaiHome
				});
				newPage.save(function(err){
					if(err) return next(err);
					res.send({message: 'Thêm trang thành công!'});
				});
			}
			else{
				if(numberOfImageItem != 0){
					for(var i=0; i<numberOfImageItem; i++){
						imgRight.push({'imgText': req.body['imgRight['+i+'][imgText]'], 'imgLink': req.body['imgRight['+i+'][imgLink]']});
					}
				}
				var newPage = new page({
					title: title,
					layoutType: layoutType,
					content: content,
					cotphaiHome: cotphaiHome,
					imgRight: imgRight,
					videoRight: []
				});
				newPage.save(function(err){
					if(err) return next(err);
					res.send({message: 'Thêm trang thành công!', data:newPage});
				});
			}
		}

	});

	//============= xoa trang
	app.delete('/api/deletepage', function(req, res, next){
		var id= req.body.id;
		page.remove({_id: id}, function(err, re){
			if(err) return next(err);
			res.send(re.result);
		});
	});

}
module.exports = PageServer;