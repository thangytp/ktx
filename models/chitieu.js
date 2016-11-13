var mongoose = require('mongoose');

var chitieuSchema = new mongoose.Schema({
  nam: String,
   nam1 : {
     soluong: {type: 'Number'},
     diemcoban: {type: 'Number'}
   },
   nam2 : {
     soluong: {type: 'Number'},
     diemcoban: {type: 'Number'}
   },
   nam3 : {
     soluong: {type: 'Number'},
     diemcoban: {type: 'Number'}
   },
   nam4 : {
     soluong: {type: 'Number'},
     diemcoban: {type: 'Number'}
   },
   nam5 : {
     soluong: {type: 'Number'},
     diemcoban: {type: 'Number'}
   },
   nam6 : {
     soluong: {type: 'Number'},
     diemcoban: {type: 'Number'}
   }
});
module.exports = mongoose.model('Chitieu', chitieuSchema);
