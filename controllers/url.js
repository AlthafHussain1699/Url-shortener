const shortId = require('shortid')
const url = require('../models/url')
const {verifyToken} = require('../servies')

async function getallurls(req, res){
     const token = req.cookies['Token'];
     if(!token) return res.redirect('/login');
     const user = verifyToken(token);
     urls = await url.find({createdBy : user.id})
     res.render('home', {urls})
}

async function genarateShortUrl(req, res){
    if(!req.body.url) return res.json("url is requied");
    const token = req.cookies['Token'];
    if(!token) return res.redirect('/login');
    const reqType = req.body.typeOfUrl;
    var shortUrl = "http://localhost:8000/";
    if(reqType === 'custom'){
        try{
        const s =shortUrl+req.body.customUrl;
        const entry = await url.findOne({ shorturl: s });;
        if(entry){
            res.render('home', {exist : true})
            return ;
        }
        else{
            shortUrl += req.body.customUrl;
        }
        }
        catch(error){
          console.log(error);
        }

    }
    else{
        shortUrl +=  shortId.generate();
    }
    const user = verifyToken(token);
    try{
     await url.create({
        shorturl : shortUrl,
        redirectedurl : req.body.url,
        visitedHistory : [],
        createdBy : user.id
     })
    }catch(err){
        console.log(err);
    }
     let data = {
        originalUrl : req.body.url,
        shortUrl : shortUrl,
        analytics : null
     }
     return res.render('home', data);
}

async function redirectToUrl(req, res){
    const shortid = req.params.url
    const a = "http://localhost:8000/"
    const urls = a+shortid;
    const entry = await url.findOneAndUpdate(
        {shorturl : urls},
        { $push: { visitedHistory: { timestamp: Date.now() } } }
    )
    if(!entry){
        res.send("url not found")
        return ;
    }
     res.redirect(entry.redirectedurl)
}

async function returnanalytices(req, res){
    const shortid = req.query.url;
    const id = shortid.trim();
    const entry = await url.findOne({ shorturl: id });
    if (entry) {
        const cnt = entry.visitedHistory.length;
        res.render('home', {
            shortUrl: null,
            analytics: { count: cnt }
        });
    } else {
        res.render('home', {
            shortUrl: null,
            analytics: { count: 0 }
        });
    }
}
module.exports = {
    genarateShortUrl,
    redirectToUrl,
    returnanalytices,
    getallurls
}