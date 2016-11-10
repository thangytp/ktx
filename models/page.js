var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({ 
 	title: String,
 	layoutType: Number,
 	content: String,
 	cotPhaiHome: Number,
 	imgRight: Array,
 	videoRight: Array
});
module.exports = mongoose.model('page', pageSchema);