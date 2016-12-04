var mongoose = require('mongoose');

var khoaSchema = new mongoose.Schema({ 
 	ten: String
});
module.exports = mongoose.model('khoa', khoaSchema);