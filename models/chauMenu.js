var mongoose = require('mongoose');

var chauSchema = new mongoose.Schema({ 
 	_parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'MenuChild'},
 	title: String,
 	slug: String,
 	order: Number,
 	_postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});
module.exports = mongoose.model('MenuSubChild', chauSchema);