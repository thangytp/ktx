var mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({ 
 	title: String,
 	slug: String,
 	order: Number,
 	_parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'menu'},
 	_postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});
module.exports = mongoose.model('menu', menuSchema);