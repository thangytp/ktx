var menu = require('../../models/menu');
var MenuCha = require('../../models/chaMenu');
var MenuChild = require('../../models/conMenu');
var MenuSubChild = require('../../models/chauMenu');

function HomeMenuServer(app){

	// app.get('/api/getallmenu', function(req, res, next){
	// 	try{
			
	// 		MenuCha
	// 		.find(function(err, listCha){
	// 		    if(err) return next(err);

	// 		    if(!listCha || listCha.length==0){
	// 		      	return res.status(404).send({ message: 'Không tìm thấy danh muc menu.' });
	// 		    }
			    
	// 		    for(var i=0; i<listCha.length; i++){
	// 		    	listCha[i].child = [];
	// 		    	// console.log(listCha[i].child);
	// 		    	var _arrChild = [];
			
	// 		    	MenuChild
	// 		    	.find({ _parentId: listCha[i]._id }, function(err, listChild){
	// 			      	if(err) return next(err);
	// 			      	console.log(i);
	// 			      	if(listChild.length != 0){
	// 			      		for(var j=0; j<listChild.length; j++){
	// 			      			var _arrSubChild = [];
	// 			      			MenuSubChild
	// 						    .find({ _parentId: listChild[j]._id }, function(err, listSubChild){
	// 						      if(err) return next(err);
	// 						      _arrSubChild = listSubChild;
	// 						      // res.send(listSubChild);
	// 						      // return listSubChild;
	// 						      // arrSubChild.push(listSubChild);
	// 						    }).sort({_parentId:1, order:1});
	// 						    listChild[j].subChild.push(_arrSubChild);
	// 						      console.log(_arrSubChild);
							      

	// 			      		}
	// 			      		_arrChild = listChild;
	// 			      	}
				      	
				      	
	// 			      	//res.send(listChild);
	// 			    }).sort({_parentId:1, order:1});
	// 			    listCha[i].child.push(_arrChild);
	// 		    }
	// 		    console.log(listCha);
	// 	      	res.send(listCha);
	// 	    }).sort({order:1});
	// 	}catch(e){
	// 	    res.status(e).send({ message: 'Error when get list cha item'});
	// 	}
	// });

	// ====== code test menu ==============//
	app.get('/api/testgetcha', function(req, res, next){
		try{
		    MenuCha
		    .find()
		    .sort({order:1})
		    .exec(function(err, listCha){
		      if(err) return next(err);


		      res.send(listCha);
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
		    .populate('_postId')
		    .sort({order:1})
		    .exec(function(err, listCon){
		      if(err || !listCon) return next(err);
		      // console.log(listCon);
		      res.send(listCon);
		    })
		} catch(e){
		    res.status(e).send({ message: 'Error when get list con item'});
		}
	});

	app.get('/api/getchau/:id', function(req, res, next){
		var id = req.params.id;
		try{
		    MenuSubChild
		    .find({_parentId: id})
		    .populate('_postId')
		    .sort({order:1})
		    .exec(function(err, listChau){
		      if(err || !listChau) return next(err);
		      res.send(listChau);
		    })
		} catch(e){
		    res.status(e).send({ message: 'Error when get list chau item'});
		}
	});

	//============= end ===============//


	app.get('/api/getcha', function(req, res, next){
		try{
		    MenuCha
		    .find()
		    .sort({order:1})
		    .exec(function(err, listCha){
		      if(err) return next(err);


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
		    .sort({_parentId:1, order:1})
		    .populate('_parentId')
		    .populate('_postId')
		    .exec(function(err, listChild){
		      if(err) return next(err);
		      

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
		    .sort({_parentId:1, order:1})
		    .populate('_parentId')
		    .populate('_postId')
		    .exec(function(err, listSubChild){
		      if(err) return next(err);
		      

		      res.send(listSubChild);
		    })
		} catch(e){
		    res.status(e).send({ message: 'Error when get list cha item'});
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
			MenuCha.find({ _parentId:_parentId }).sort({order:-1}).exec(function(err, menuRes) {
				if(err) return next(err);
				if(!menuRes[0]) count = 0;
				else count = menuRes[0].order;
				console.log(menuRes);
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
				if(err2) return next(err2);
				// truong hop tim thay => item nay co cha thuoc bang menucha => luu item nay vao bang child 
				if(menuRes){
					slug = menuRes.slug + '/' + slug;
					MenuChild.find({ _parentId: _parentId }).sort({order:-1}).limit(1).exec(function(err3, menuChildRes) {
						if(err3) return next(err3);
						if(!menuChildRes[0]) count = 0;
						else count = menuChildRes[0].order;
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
						if(err7) return next(err7);
						slug = menuChildRes.slug + '/' + slug;
						MenuSubChild.find({ _parentId: _parentId }).sort({order:-1}).limit(1).exec(function(err5, menuSubChildRes) {
							if(err5) return next(err5);
							if(!menuSubChildRes[0]) count = 0;
							else count = menuSubChildRes[0].order;
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

	// delete menu item
	app.post('/api/deletemenuitemcha', function(req, res, next) {
	  	var id = req.body.id;
	  	MenuCha.findOne({_id: id}, function(err, chaRes){
	  		if(err) return next(err);
	  		if(chaRes){
	  			MenuChild.find({_parentId: chaRes._id}, function(err1, childRes){
	  				if(err1) return next(err1);
	  				var _arrChild = [];
	  				childRes.forEach(function(child){
	  					_arrChild.push(child._id);
	  				});
	  				MenuSubChild.remove({_parentId: {$in: _arrChild}}, function(err, re){
	  					console.log(re.result);
	  					if(re){
	  						MenuChild.remove({_parentId: chaRes._id}, function(err, re){
			  					console.log(re.result);
			  					if(re){
			  						chaRes.remove();
			  						res.send({message: "delete thanh cong"});
			  					}
			  				});
	  					}
	  				});

	  			});
	  		}
	  		else{
	  			MenuChild.findOne({_id: id}, function(err, childRes){
	  				if(err) return next(err);
	  				if(childRes){
	  					MenuSubChild.remove({_parentId: childRes._id}, function(err, re){
		  					console.log(re.result);
		  					childRes.remove();
		  					res.send({message: "delete thanh cong"});
		  				});
	  				}
	  				else{
	  					MenuSubChild.findOne({_id: id}, function(err, subchildRes){
	  						if(err) return next(err);
	  						if(subchildRes){
	  							subchildRes.remove(function(err, re){
	  								console.log(re.result);
	  								res.send({message: "delete thanh cong"});
	  							});
	  						}
	  					});
	  				}
	  			});
	  		}
	  	});	  	
	});

	app.put('/api/moveuporder', function(req, res, next){
		var id = req.body.id;
		var type = req.body.type;

		if(type == 'cha'){
			MenuCha.findOne({_id: id}, function(err, chaRes){
				if(err) return next(err);
				if(chaRes){
					MenuCha.findOne({order: chaRes.order-1}, function(err1, chaUpRes){
						if(err1) return next(err1);
						if(chaUpRes){
							chaUpRes.update({ $set: {order: chaRes.order} }, function(err, re){
								console.log(re);
								chaRes.update({ $set: {order: chaRes.order - 1} }, function(err, re){
									res.send({message: 'moveup thanh cong'});
								});
							});
						}
						else{
							chaRes.update({ $set: {order: chaRes.order - 1} }, function(err, re){
									res.send({message: 'moveup thanh cong'});
								});
						}
					});
				}
			});
		}
		else if(type=="con"){
			MenuChild.findOne({_id: id}, function(err, childRes){
				if(err) return next(err);
				if(childRes){
					MenuChild.findOne({ $and: [{ _parentId: childRes._parentId, order: childRes.order-1} ]}, function(err1, childUpRes){
						if(err1) return next(err1);
						if(childUpRes){
							childUpRes.update({ $set: {order: childRes.order} }, function(err, re){
								console.log(re);
								childRes.update({ $set: {order: childRes.order - 1} }, function(err, re){
									res.send({message: 'moveup thanh cong'});
								});
							});
						}
						else{
							childRes.update({ $set: {order: childRes.order - 1} }, function(err, re){
									res.send({message: 'moveup thanh cong'});
								});
						}
					});
				}
			});
		}
		else if(type=='chau'){
			MenuSubChild.findOne({_id: id}, function(err, subchildRes){
				if(err) return next(err);
				if(subchildRes){
					MenuSubChild.findOne({ $and: [{ _parentId: subchildRes._parentId, order: subchildRes.order-1} ]}, function(err1, subchildUpRes){
						if(err1) return next(err1);
						if(subchildUpRes){
							subchildUpRes.update({ $set: {order: subchildRes.order} }, function(err, re){
								console.log(re);
								subchildRes.update({ $set: {order: subchildRes.order - 1} }, function(err, re){
									res.send({message: 'moveup thanh cong'});
								});
							});
						}
						else{
							subchildRes.update({ $set: {order: subchildRes.order - 1} }, function(err, re){
									res.send({message: 'moveup thanh cong'});
								});
						}
					});
				}
			});
		}
	});

	app.put('/api/movedownorder', function(req, res, next){
		var id = req.body.id;
		var type = req.body.type;

		if(type == 'cha'){
			MenuCha.findOne({_id: id}, function(err, chaRes){
				if(err) return next(err);
				if(chaRes){
					MenuCha.findOne({order: chaRes.order+1}, function(err1, chaUpRes){
						if(err1) return next(err1);
						if(chaUpRes){
							chaUpRes.update({ $set: {order: chaRes.order} }, function(err, re){
								console.log(re);
								chaRes.update({ $set: {order: chaRes.order + 1} }, function(err, re){
									res.send({message: 'moveup thanh cong'});
								});
							});
						}
						else{
							chaRes.update({ $set: {order: chaRes.order + 1} }, function(err, re){
									res.send({message: 'moveup thanh cong'});
								});
						}
					});
				}
			});
		}
		else if(type=="con"){
			MenuChild.findOne({_id: id}, function(err, childRes){
				if(err) return next(err);
				if(childRes){
					MenuChild.findOne({ $and: [{ _parentId: childRes._parentId, order: childRes.order+1} ]}, function(err1, childUpRes){
						if(err1) return next(err1);
						if(childUpRes){
							childUpRes.update({ $set: {order: childRes.order} }, function(err, re){
								console.log(re);
								childRes.update({ $set: {order: childRes.order + 1} }, function(err, re){
									res.send({message: 'moveup thanh cong'});
								});
							});
						}
						else{
							childRes.update({ $set: {order: childRes.order + 1} }, function(err, re){
									res.send({message: 'moveup thanh cong'});
								});
						}
					});
				}
			});
		}
		else if(type=='chau'){
			MenuSubChild.findOne({_id: id}, function(err, subchildRes){
				if(err) return next(err);
				if(subchildRes){
					MenuSubChild.findOne({ $and: [{ _parentId: subchildRes._parentId, order: subchildRes.order+1} ]}, function(err1, subchildUpRes){
						if(err1) return next(err1);
						if(subchildUpRes){
							subchildUpRes.update({ $set: {order: subchildRes.order} }, function(err, re){
								console.log(re);
								subchildRes.update({ $set: {order: subchildRes.order + 1} }, function(err, re){
									res.send({message: 'moveup thanh cong'});
								});
							});
						}
						else{
							subchildRes.update({ $set: {order: subchildRes.order + 1} }, function(err, re){
									res.send({message: 'moveup thanh cong'});
								});
						}
					});
				}
			});
		}
	});

	app.post('/api/checknamemenu', function(req, res, next) {
	  	var title = req.body.title; 
	  	var _parentId = req.body._parentId;
	  
	  	if(_parentId == 0){
		  	MenuCha.findOne({title: title}, function(err, chaRes){
		  		if(err) return next(err);
		  		if(!chaRes){
		  			return res.send({message: 'Tên danh mục có thể sử dụng'});
		  		}
		  		res.send({message: 'Tên danh mục đã tồn tại'});
		  	});
	  	}
	  	else{
	  		MenuCha.findOne({_id: _parentId}, function(err, chaRes){
	  			if(err) return next(err);
	  			if(chaRes){
	  				MenuChild.findOne({title: title}, function(err1, childRes){
	  					if(err1) return next(err1);
	  					if(!childRes){
	  						return res.send({message: 'Tên danh mục có thể sử dụng'});
	  					}
	  					res.send({message: 'Tên danh mục đã tồn tại'});
	  				});
	  			}
	  			else{
	  				MenuChild.findOne({_id: _parentId}, function(err, childRes){
	  					if(err) return next(err);
	  					if(childRes){
	  						MenuSubChild.findOne({title: title}, function(err1, subchildRes){
	  							if(err1) return next(err1);
	  							if(!subchildRes){
	  								return res.send({message: 'Tên danh mục có thể sử dụng'});
	  							}
	  							res.send({message: 'Tên danh mục đã tồn tại'});
	  						});
	  					}
	  				});
	  			}
	  		});
	  	}

	});

	app.put('/api/editlinktopage', function(req, res, next){
		var idItemEditLinkToPage = req.body.idItemEditLinkToPage;
		var idPage = req.body.idPage;
		console.log(idPage);
		var typeEditPageLink = req.body.typeEditPageLink;

		if(typeEditPageLink == 'cha'){
			MenuCha.findOne({_id: idItemEditLinkToPage}, function(err, chaRes){
				if(err) return next(err);
				if(chaRes){
					
					chaRes.update({ $set: {_postId: idPage} }, function(err, re){
							res.send({message: 'edit thanh cong'});
						});
					
				}
			});
		}
		else if(typeEditPageLink=="con"){
			MenuChild.findOne({_id: idItemEditLinkToPage}, function(err, childRes){
				if(err) return next(err);
				if(childRes){
					
					childRes.update({ $set: {_postId: idPage} }, function(err, re){
							res.send({message: 'edit thanh cong'});
						});
					
				}
			});
		}
		else if(typeEditPageLink=='chau'){
			MenuSubChild.findOne({_id: idItemEditLinkToPage}, function(err, subchildRes){
				if(err) return next(err);
				if(subchildRes){
					
					subchildRes.update({ $set: {_postId: idPage} }, function(err, re){
							res.send({message: 'edit thanh cong'});
						});
					
				}
			});
		}
	});

}
module.exports = HomeMenuServer;