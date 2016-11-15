var mongoose = require('mongoose');

var chaSchema = new mongoose.Schema({ 
 	title: String,
 	slug: String,
 	order: Number,
 	_parentId: Number,
 	_postId: {type: mongoose.Schema.Types.ObjectId, ref: 'page'},
 	child: Array
});
module.exports = mongoose.model('MenuCha', chaSchema);