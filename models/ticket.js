var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
  nguoitao: 'String',
  phong: 'String',
  trangthai: {type :'String', default: 'Đang Chờ'},
  tieude: 'String',
  sotien: 'Number',
  tinnhan: [{
    noidung: 'String',
    nguoipost: 'String'
  }],
  nguoidong: 'String',
  thoigiantao: {type: 'Date', default: Date.now},
  thoigiandong: {type: 'Date'}
});
module.exports = mongoose.model('Ticket', ticketSchema);
