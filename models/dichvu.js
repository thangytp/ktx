var mongoose = require('mongoose');

var dichvuSchema = new mongoose.Schema({
  ten: 'String',
  gia: 'Number'
});
module.exports = mongoose.model('Dichvu', dichvuSchema);
