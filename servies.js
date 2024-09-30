const jwt = require('jsonwebtoken');
const secret = "Althaf@1699"

function getToken(user){
    return jwt.sign({name : user.name, email : user.email}, secret)
}

function verifyToken(token){
    return jwt.verify(token, secret);
}

module.exports = {
    getToken,
    verifyToken
}