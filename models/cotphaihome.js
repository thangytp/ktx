var mongoose = require('mongoose');
var cotphaihomeSchema = new mongoose.Schema({ 
 	name: String,
 	linkToPage: String,
 	linkVideo: String,
 	image: String,
 	type: String,
 	sort: Number
});
module.exports = mongoose.model('CotPhaiHome', cotphaihomeSchema);