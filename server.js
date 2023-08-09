// This code is the server operation for "Storyload"
// Open the terminal and execute "node server.js"

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

app.use(express.static('views'));
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
app.use(methodOverride("_method"))

app.post("/", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/main",
    failureRedirect: "/",
    failureFlash: true
}))

app.post("/register", checkNotAuthenticated, async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(), 
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        console.log(users); 
        res.redirect("/")
        
    } catch (e) {
        console.log(e);
        res.redirect("/register")
    }
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
  });

app.get('/main', (req, res) => {
  res.sendFile(__dirname + '/views/loading.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
  });

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

app.listen(3000)