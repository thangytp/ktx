var mongoose = require('mongoose');

var khuvucSchema = new mongoose.Schema({
  ten: 'String',
  diem: 'Number',
  ma: 'String'
});
module.exports = mongoose.model('Khuvuc', khuvucSchema);
