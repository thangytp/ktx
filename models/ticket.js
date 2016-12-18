var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
  nguoitao: 'String',
  trangthai: {type :'String', default: 'Đang Chờ'},
  tieude: 'String',
  tinnhan: [{
    noidung: 'String',
    nguoipost: 'String'
  }],
  nguoidong: 'String',
  thoigiantao: {type: 'Date', default: Date.now},
  thoigiandong: {type: 'Date'}
});
module.exports = mongoose.model('Ticket', ticketSchema);
