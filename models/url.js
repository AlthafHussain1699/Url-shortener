const mongoose = require('mongoose')

const urlschema = new mongoose.Schema({
    shorturl : {
        type : String,
        unique : true,
        required : true
    } ,
    redirectedurl : {
        type : String, 
        required : true
    },
    visitedHistory : [{timestamp : {type : Number}}],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId
    }
},
{timestamps : true}
)
const url = mongoose.model("url", urlschema);

module.exports = url;