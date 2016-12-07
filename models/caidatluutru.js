var mongoose = require('mongoose');

var caidatluutruSchema = new mongoose.Schema({ 
 	dangkymoi: {
 		ngaybatdaudangky: Date,
 		ngayketthucdangky: Date
 	},
 	giahan: {
 		ngaybatdaugiahan: Date,
 		ngayketthucgiahan: Date
 	}
});
module.exports = mongoose.model('caidatluutru', caidatluutruSchema);