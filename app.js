var express = require("express");
var session = require('express-session');
var bodyParser = require("body-parser");
var app = express();

var path = require('path');
let AWS = require('aws-sdk');
var fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//***** CloudFront credentials **********/

let keyPairId = 'APKAJ4R6WOEZ7C4XNR2Q';
let privateKey = fs.readFileSync('./pk-APKAJ4R6WOEZ7C4XNR2Q.pem', 'utf8')
let cfUrl = "d3dh4vtuzcywao.cloudfront.net";
let expiry = 15789990340;

let policy = {
    'Statement': [{
        'Resource': 'http*://' + cfUrl + '/*',
        'Condition': {
            'DateLessThan': { 'AWS:EpochTime': expiry }
        }
    }]
};
let policyString = JSON.stringify(policy);
let signer = new AWS.CloudFront.Signer(keyPairId, privateKey);
var abc;
function gettingSignedCookie() {
    var options = { url: "http://" + cfUrl, policy: policyString };

  abc =  signer.getSignedCookie(options, function (err, cookie) {
        if (err) {
            console.log(err);
            return err;
        } else {
            // console.log("cookies: ");
            // console.log(cookie);
            return cookie;
            // res.send(cookie);
        }
    });
    console.log(abc);
    return abc;
};

// ***** Login form *****
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function (request, response) {

    var username = request.body.username;
    var password = request.body.password;
    console.log(username + "in post");

    if (username == "aws" && password == "aws") {

        console.log(username);
        request.session.loggedin = true;
        request.session.username = username;
        console.log("cookies in /auth post method");
       var cookies = gettingSignedCookie();
        console.log("inside /auth if ");
        console.log(cookies);



    }
    else {
        response.send('Incoreect credential');
    }

    response.end();
});

// app.get('/home', function (request, response) {
//     response.sendFile(path.join(__dirname + '/home.html'));
// });

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});