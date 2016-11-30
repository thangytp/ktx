var mongoose = require('mongoose');

var phongchitietSchema = new mongoose.Schema({
  _loai: {type: mongoose.Schema.Types.ObjectId, ref: 'Phong'},
  tang: 'Number',
  ma: 'String'
});
module.exports = mongoose.model('Phongchitiet', phongchitietSchema);
