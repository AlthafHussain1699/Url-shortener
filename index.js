const express = require('express')
const {connectMangoDb} = require('./connetdb');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const route = require('./routes/url');
const userRoute = require('./routes/userRoute')
const user = require('./models/user');
const { log } = require('console');
const port = 8000;
const app = express();

connectMangoDb("mongodb://localhost:27017/").then(()=>{console.log("mongo db connect successfully")});

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.set('view engine', 'ejs');
function antheication(){
    return (req, res, next) =>{
        const token = req.cookies['Token'];
    if(!token) return res.redirect('/login');
    next();
}
}
    
app.get("/", (req, res)=>{
    res.render("home", {})
})

app.get("/signUp", (req, res)=>{
    res.render('signUp');
})

app.get("/logOut", (req, res)=>{
    res.clearCookie("Token")
    res.redirect("/");
})

app.get('/login', (req, res)=>{
    res.render('login');
})

app.use("/user", userRoute);
app.use("/", antheication(), route);

app.listen(port, ()=>{
    console.log(`server Started at ${port}`);
})