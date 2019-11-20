var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});
app.get('/branch', function(request, response) {
	response.sendFile(path.join(__dirname + '/register.html'));
});

app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
var id = 4;
app.post('/reg', function(request, response) {
    id = id+1;
    var accounts ={
        "username":request.body.username,
        "password":request.body.password,
        "email":request.body.email
    }
    var sql = "INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (id, username, password, email)";
        
        connection.query('INSERT INTO accounts SET ?',accounts, function(error,results,fields)
        {
        if(error) 
        {
            response.send('Cannot insert data into database');
        }
        else {
            request.session.registered = true;
			request.session.reguser = request.body.username;
			response.redirect('/wlcm');
        }			
        response.end();
        });
        response.end();
        });
        
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

/*app.get('/wlcm', function(request, response) {
	if (request.session.registred) {
		response.send('Welcome , ' + request.session.reguser + '!  Your data has been registered');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});*/
app.listen(3000);