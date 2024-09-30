const express = require('express')
//doubt
const {genarateShortUrl, redirectToUrl, returnanalytices, getallurls} = require('../controllers/url');

const route = express.Router();

route.get("/get/showAllUrls", getallurls);

route.post("/post/url", genarateShortUrl);

route.get("/get/analytics", returnanalytices);

route.get("/redirect/:url", redirectToUrl);


module.exports = route;
