const mongoose = require('mongoose')

async function connectMangoDb(url){
     return mongoose.connect(url);
}

module.exports = {
    connectMangoDb
}