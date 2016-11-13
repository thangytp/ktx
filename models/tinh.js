var mongoose = require('mongoose');

var tinhSchema = new mongoose.Schema({
  ten: 'String',
  diem: 'Number',
  ma: 'String'
});
module.exports = mongoose.model('Tinh', tinhSchema);
