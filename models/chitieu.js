var mongoose = require('mongoose');

var chitieuSchema = new mongoose.Schema({
  nam: String,
   nam1 : {
     xetduyet: {
       male: {
         type: 'Number'
       },
       female: {
         type: 'Number'
       },
       diemcoban: {type: 'Number'}
     },
     giahan: {
       male: {
         type: 'Number'
       },
       female: {
         type: 'Number'
       },
       diemcoban: {type: 'Number'}
     }
   },
   nam2 : {
     xetduyet: {
       male: {
         type: 'Number'
       },
       female: {
         type: 'Number'
       },
       diemcoban: {type: 'Number'}
     },
     giahan: {
       male: {
         type: 'Number'
       },
       female: {
         type: 'Number'
       },
       diemcoban: {type: 'Number'}
     }
   },
   nam3 : {
     xetduyet: {
       male: {
         type: 'Number'
       },
       female: {
         type: 'Number'
       },
       diemcoban: {type: 'Number'}
     },
     giahan: {
       male: {
         type: 'Number'
       },
       female: {
         type: 'Number'
       },
       diemcoban: {type: 'Number'}
     }
   },
   nam4 : {
     xetduyet: {
       male: {
         type: 'Number'
       },
       female: {
         type: 'Number'
       },
       diemcoban: {type: 'Number'}
     },
     giahan: {
       male: {
         type: 'Number'
       },
       female: {
         type: 'Number'
       },
       diemcoban: {type: 'Number'}
     }
   },
   nam5 : {
     xetduyet: {
       male: {
         type: 'Number'
       },
       female: {
         type: 'Number'
       },
       diemcoban: {type: 'Number'}
     },
     giahan: {
       male: {
         type: 'Number'
       },
       female: {
         type: 'Number'
       },
       diemcoban: {type: 'Number'}
     }
   },
   nam6 : {
     xetduyet: {
       male: {
         type: 'Number'
       },
       female: {
         type: 'Number'
       },
       diemcoban: {type: 'Number'}
     },
     giahan: {
       male: {
         type: 'Number'
       },
       female: {
         type: 'Number'
       },
       diemcoban: {type: 'Number'}
     }
   }
});
module.exports = mongoose.model('Chitieu', chitieuSchema);
