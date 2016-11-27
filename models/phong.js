var mongoose = require('mongoose');

var phongSchema = new mongoose.Schema({
  loai: 'String',
  gia: 'Number',
  kichco: 'Number',
  soluong: 'Number'
});
module.exports = mongoose.model('Phong', phongSchema);
