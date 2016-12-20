var mongoose = require('mongoose');

var tintucSchema = new mongoose.Schema({ 
 	title: String,
 	content: String,
 	description: String,
 	img: String,
 	slug: String,
 	dateCreate: Date,
 	dateModify: Date,
 	status: Number,
 	hienthi: Number
});
module.exports = mongoose.model('tintuc', tintucSchema);