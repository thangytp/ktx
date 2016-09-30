var mongoose = require('mongoose');


var studentSchema = new mongoose.Schema({ 
 email: {
    type: String,
    required: true,
    unique: true   
  },
  password: {
    type: String,
    required: true
  },
  name:{
  	first:String,
  	last:String
  },
  code: Number,
  type:{
  	type:Number,
  	default:3
  },
  avatar: String  
});
module.exports = mongoose.model('Student', userSchema);