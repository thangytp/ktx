var mongoose = require('mongoose');

var tangSchema = new mongoose.Schema({
  ten: 'String'
});
module.exports = mongoose.model('Tang', tangSchema);
