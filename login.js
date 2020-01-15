var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cookieSigner = require('./cookieSign')
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});
//Get Signed Cookie route
// app.get('/getSignedCookie', cookieSigner.getSignedCookie);

//home route
app.get('/home', function (request, response) {
    response.sendFile(path.join(__dirname + '/home.html'));
});

app.post('/auth', function (request, response) {

    var username = request.body.username;
    var password = request.body.password;
    console.log(username + "in post");


    if (username == "aws" && password == "aws") {

        console.log(username);
        request.session.loggedin = true;
        request.session.username = username;
      

        // response.cookie("userdata", app.get('/getSignedCookie', cookieSigner.getSignedCookie));
        // response.redirect('/home');
    }
    else {
        response.send('Incoreect credential');
    }

    response.end();
});
app.get('/getSignedCookie',function(request,response){
    console.log(cookieSigner.getSignedCookie);
    // response.send(cookieSigner.getSignedCookie)

})
app.get('/home', function (request, response) {
    if (request.session.loggedin) {
        response.send('welcome back ' + request.session.username);

    }
    else {
        response.send('please login to view this page');
    }
    response.end();
});

app.listen(3000);
console.log("app is running on 3000 port");
