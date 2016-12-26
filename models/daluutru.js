var mongoose = require('mongoose');

var daluutruSchema = new mongoose.Schema({
  _sinhvien_id : {type: mongoose.Schema.Types.ObjectId},
  luutru: [{
    ki : 'Number',
    nam : 'Number',
    _tang : {type: mongoose.Schema.Types.ObjectId, ref : 'Tang'},
    _loaiphong : {type: mongoose.Schema.Types.ObjectId, ref: 'Phong'},
    _phong:  {type: mongoose.Schema.Types.ObjectId, ref: 'Phongchitiet'},
    giuong: 'String'
  }]
});
module.exports = mongoose.model('Daluutru', daluutruSchema);
