var mongoose = require('mongoose');

var hedaotaoSchema = new mongoose.Schema({
  ten: 'String'
});
module.exports = mongoose.model('Hedaotao', hedaotaoSchema);
