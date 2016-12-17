var mongoose = require('mongoose');

var tienktxSchema = new mongoose.Schema({
 	_sinhvien_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
  sotien: 'Number',
  ki: 'Number',
  nam: 'Number',
  da_dong_tien : {type: Boolean, default: false}
});
module.exports = mongoose.model('Tienktx', tienktxSchema);
