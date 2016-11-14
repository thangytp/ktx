var mongoose = require('mongoose');

var hoancanhSchema = new mongoose.Schema({
  ten: 'String',
  diem: 'Number',
  ma: 'String'
});
module.exports = mongoose.model('Hoancanh', hoancanhSchema);
