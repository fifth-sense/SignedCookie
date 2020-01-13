var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cloudfrontFile = require('./cookieSign')
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
let cookies={
    "CloudFront-Policy": "eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9kM2RoNHZ0dXpjeXdhby5jbG91ZGZyb250Lm5ldC8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNTc4ODk5MDkzfX19XX0_",
    "CloudFront-Key-Pair-Id": "APKAJ4R6WOEZ7C4XNR2Q",
    "CloudFront-Signature": "Xm0Wo5iXy8VgonzCJeSpKRE5nvMjCBZS9YTQYVg34eLoNuzCHeRu2KYwWJOf9BJW6bJWqMg8sRf-kTwmzSo5fMsZqJR8tTKOykSf4Rdp3Mep1b3IwaWCRaxftMSfX9Wp6QvShG5IUdMYyTX-FoPclfNwEFrNIO~S2RqcZ7Q5EFKkO0Z-W7ibuwNmwF-LNMPNVzXC0czKmVxMpg5lR0ymC~PaSVozSD5UdRsBowXCrxJxnA9SI48EZQviH-Gd3pFAaN3Hd18Yj9rhzVryofWYQ-6fY3dni3kJk-lg~xmklhHivAFFMLxRB3rmJkf1bNgzafYsPv6Nkyy4aEkX5l~oUQ__"

}
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});
app.get('/home',function(request,response){
    response.sendFile(path.join(__dirname+'/home.html'));
});

app.post('/auth', function (request, response) {
    
    var username = request.body.username;
    var password = request.body.password;
    console.log(username + "in post");
 

    if (username == "user" && password == "user") {
        
        console.log(username);
        request.session.loggedin = true;
        request.session.username = username;
        response.cloudfrontFile
        response.cookie("userdata",cookies);
        response.redirect('/home');
    }
    else {
        response.send('Incoreect credential');
    }

    response.end();
});
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
