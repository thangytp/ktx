var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var adminSchema = new mongoose.Schema({
 email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: 'String'
});

adminSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
adminSchema.methods.valiPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
