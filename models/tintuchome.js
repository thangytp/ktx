var mongoose = require('mongoose');

var tintuchomeSchema = new mongoose.Schema({ 
 	title: String,
 	content: String,
 	linkChitiet: String,
 	hienthi: Number,
 	status: Number
});
module.exports = mongoose.model('tintuchome', tintuchomeSchema);