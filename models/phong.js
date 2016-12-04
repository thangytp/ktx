var mongoose = require('mongoose');

var phongSchema = new mongoose.Schema({
	ten: String,
  	loai: Number,
  	gia: 'Number',
  	kichco: 'Number',
  	soluong: 'Number'
});
module.exports = mongoose.model('Phong', phongSchema);
