const express = require('express')
const {addUser, cheakUser} = require('../controllers/user')
const route = express();

route.post('/signUp', addUser);

route.get('/login', cheakUser)


module.exports = route