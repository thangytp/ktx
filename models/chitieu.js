var mongoose = require('mongoose');

var chitieuSchema = new mongoose.Schema({
  nam: String,
   nam1 : {
     male: {
       type: 'Number'
     },
     female: {
       type: 'Number'
     },
     diemcoban: {type: 'Number'}
   },
   nam2 : {
     male: {
       type: 'Number'
     },
     female: {
       type: 'Number'
     },
     diemcoban: {type: 'Number'}
   },
   nam3 : {
     male: {
       type: 'Number'
     },
     female: {
       type: 'Number'
     },
     diemcoban: {type: 'Number'}
   },
   nam4 : {
     male: {
       type: 'Number'
     },
     female: {
       type: 'Number'
     },
     diemcoban: {type: 'Number'}
   },
   nam5 : {
     male: {
       type: 'Number'
     },
     female: {
       type: 'Number'
     },
     diemcoban: {type: 'Number'}
   },
   nam6 : {
     male: {
       type: 'Number'
     },
     female: {
       type: 'Number'
     },
     diemcoban: {type: 'Number'}
   }
});
module.exports = mongoose.model('Chitieu', chitieuSchema);
