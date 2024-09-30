const { set } = require('mongoose');
const user = require('../models/user');
const {getToken} = require('../servies');


async function addUser(req, res){
    await user.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    })
    res.redirect('/login');
}

async function cheakUser(req, res){
    const email = req.query.email
    const password = req.query.password
    const u = await user.findOne({email, password})
    if(!u){
        res.redirect('/login');
    }
    else{
        const token = getToken({id : u._id, name : u.name})
        res.cookie("Token", token);
        res.redirect("/");
    }
}

module.exports = {
    addUser, 
    cheakUser
}