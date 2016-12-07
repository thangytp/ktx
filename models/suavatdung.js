var mongoose = require('mongoose');

var suavatdungSchema = new mongoose.Schema({ 
 	_ma_phong: String,
 	thang: Number,
 	nam: Number,
 	tinhtrang: String,
 	noidungsua: String,
 	ketqua: String,
 	sotien: Number

});
module.exports = mongoose.model('suavatdung', suavatdungSchema);