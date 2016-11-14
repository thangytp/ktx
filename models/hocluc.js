var mongoose = require('mongoose');

var hoclucSchema = new mongoose.Schema({
  ten: 'String',
  diem: 'Number',
  ma: 'String'
});
module.exports = mongoose.model('Hocluc', hoclucSchema);
