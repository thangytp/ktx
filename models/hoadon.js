var mongoose = require('mongoose');

var hoadonSchema = new mongoose.Schema({
 	_ma_phong: String,
 	thang: Number,
 	nam: Number,
 	dien: {
 		so: Number,
 		tongtien: Number
 	},
 	nuoc: {
 		so: Number,
 		tongtien: Number
 	},
  da_dong_tien: {type: 'Boolean', default: false}
});
module.exports = mongoose.model('hoadon', hoadonSchema);
