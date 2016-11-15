var mongoose = require('mongoose');

var conSchema = new mongoose.Schema({ 
 	_parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'MenuCha'},
 	title: String,
 	slug: String,
 	order: Number,
 	_postId: {type: mongoose.Schema.Types.ObjectId, ref: 'page'},
 	subChild: Array
});
module.exports = mongoose.model('MenuChild', conSchema);