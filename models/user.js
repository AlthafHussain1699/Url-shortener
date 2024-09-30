const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
   name :{
    type : String
   },
   email : {
    type : String,
    unique : true
   },
   password : {
    type : String,
   }
}, {timestamps : true})



const user = mongoose.model("user", userSchema);

module.exports = user