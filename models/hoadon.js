var mongoose = require('mongoose');

var hoadonSchema = new mongoose.Schema({ 
 	_ma_phong: String,
 	thang: Number,
 	nam: Number,
 	dien: {
 		socu: Number,
 		somoi: Number,
 		tongtien: Number
 	},
 	nuoc: {
 		socu: Number,
 		somoi: Number,
 		tongtien: Number
 	},
 	
 	_da_nop_tien: {type : 'Boolean', default: false}

});
module.exports = mongoose.model('hoadon', hoadonSchema);