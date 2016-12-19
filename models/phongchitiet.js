var mongoose = require('mongoose');

var phongchitietSchema = new mongoose.Schema({
  _loai: {type: mongoose.Schema.Types.ObjectId, ref: 'Phong'},
  _tang: {type: mongoose.Schema.Types.ObjectId, ref: 'Tang'},
  ma: 'String',
  giuong: [{
    ten: {type : 'String'},
    da_dang_ky: {type : 'Boolean', default: false},
    _sinhvien_id : {type: mongoose.Schema.Types.ObjectId}
  }]
});
module.exports = mongoose.model('Phongchitiet', phongchitietSchema);
