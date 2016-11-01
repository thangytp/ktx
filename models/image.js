var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({ 
 	link: String
});
module.exports = mongoose.model('Image', imageSchema);