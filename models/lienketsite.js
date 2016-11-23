var mongoose = require('mongoose');
var lienketsiteSchema = new mongoose.Schema({ 
 	name: String,
 	link: String,
 	image: String,
 	sort: Number
});
module.exports = mongoose.model('LienketSite', lienketsiteSchema);