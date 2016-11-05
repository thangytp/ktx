var menu = require('../../models/menu');
var MenuCha = require('../../models/chaMenu');
var MenuChild = require('../../models/conMenu');
var MenuSubChild = require('../../models/chauMenu');

function HomeMenuServer(app){

	app.get('/api/getcha', function(req, res, next){
		try{
		    MenuCha
		    .find()
		    .exec(function(err, listCha){
		      if(err) next(err);


		      res.send(listCha);
		    })
		} catch(e){
		    res.status(e).send({ message: 'Error when get list cha item'});
		}
	});
	app.get('/api/getchild', function(req, res, next){
		try{
		    MenuChild
		    .find()
		    .sort({_parentId:1})
		    .populate('_parentId')
		    .exec(function(err, listChild){
		      if(err) next(err);
		      

		      res.send(listChild);
		    })
		} catch(e){
		    res.status(e).send({ message: 'Error when get list cha item'});
		}
	});
	app.get('/api/getsubchild', function(req, res, next){
		try{
		    MenuSubChild
		    .find()
		    .sort({_parentId:1})
		    .populate('_parentId')
		    .exec(function(err, listSubChild){
		      if(err) next(err);
		      

		      res.send(listSubChild);
		    })
		} catch(e){
		    res.status(e).send({ message: 'Error when get list cha item'});
		}
	});

	app.get('/api/getcon/:id', function(req, res, next){
		var id = req.params.id;
		try{
		    MenuChild
		    .find({_parentId: id})
		    .exec(function(err, listCon){
		      if(err || !listCon) next(err);
		      console.log(listCon);
		      res.send(listCon);
		    })
		} catch(e){
		    res.status(e).send({ message: 'Error when get list con item'});
		}
	});

	//add menu item
	app.post('/api/additemmenu', function(req, res, next){
		var id = req.body.id;
		var title = req.body.title;
		var slug = req.body.slug;
		var _parentId = req.body._parentId;
		var count = 0;

		if(_parentId == 0){
			MenuCha.find({ _parentId:_parentId }, function(err, menuRes) {
				if(err) next(err);
				if(!menuRes) count = 0;
				else count = menuRes.length;
				try{ 
			       	var menuItem = new MenuCha({           
				        title: title,
				        slug: slug,
				        order: count+1,
				        _parentId: _parentId        
				    });   
			       	menuItem.save(function(err1) {
				         if (err1) return next(err1);     
				         res.send({ message: title + ' has been added successfully!' });
			       	});
		      	} catch (e) {
		        	res.status(e).send({ message: title + ' error when add new.' });
		      	}
			});
		}
		else{
			MenuCha.findOne({ _id: _parentId }, function(err2, menuRes) {
				if(err2) next(err2);
				// truong hop tim thay => item nay co cha thuoc bang menucha => luu item nay vao bang child 
				if(menuRes){
					slug = menuRes.slug + '/' + slug;
					MenuChild.find({ _parentId: _parentId }, function(err3, menuChildRes) {
						if(err3) next(err3);
						if(!menuChildRes) count = 0;
						else count = menuChildRes.length;
						var menuItem = new MenuChild({           
					        title: title,
					        slug: slug,
					        order: count+1,
					        _parentId: _parentId        
					    });   
				       	menuItem.save(function(err4) {
					         if (err4) return next(err4);     
					         res.send({ message: title + ' has been added successfully!' });
				       	});
					});
				}
				// truong hop khong tim thay trong bang cha => item nay co cha thuoc bang con => luu item nay vao bang subchild
				else{
					
					MenuChild.findOne({ _id: _parentId}, function(err7, menuChildRes){
						if(err7) next(err7);
						slug = menuChildRes.slug + '/' + slug;
						MenuSubChild.find({ _parentId: _parentId }, function(err5, menuSubChildRes) {
							if(err5) next(err5);
							if(!menuSubChildRes) count = 0;
							else count = menuSubChildRes.length;
							var menuItem = new MenuSubChild({           
						        title: title,
						        slug: slug,
						        order: count+1,
						        _parentId: _parentId        
						    });   
					       	menuItem.save(function(err6) {
						         if (err6) return next(err6);     
						         res.send({ message: title + ' has been added successfully!' });
					       	});
						});
					});	
				}
			});

		}
	});

}
module.exports = HomeMenuServer;