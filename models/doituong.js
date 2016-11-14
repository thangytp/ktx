var mongoose = require('mongoose');

var doituongSchema = new mongoose.Schema({
  ten: 'String',
  diem: 'Number',
  ma: 'String'
});
module.exports = mongoose.model('Doituong', doituongSchema);
