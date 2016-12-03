var mongoose = require('mongoose');

var phongchitietSchema = new mongoose.Schema({
  _loai: {type: mongoose.Schema.Types.ObjectId, ref: 'Phong'},
  _tang: {type: mongoose.Schema.Types.ObjectId, ref: 'Tang'},
  ma: 'String'
});
module.exports = mongoose.model('Phongchitiet', phongchitietSchema);
