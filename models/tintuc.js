var mongoose = require('mongoose');

var tintucSchema = new mongoose.Schema({ 
 	title: String,
 	content: String,
 	slug: String,
 	dateCreate: Date,
 	dateModify: Date,
 	status: Number
});
module.exports = mongoose.model('tintuc', tintucSchema);