var express=require("express");  // calling express.js module
var bodyParser=require('body-parser'); //calliing body parser
 
var connection = require('./config'); //database connection function
var app = express(); //including express as app
 
var authenticateController=require('./controllers/authenticate-controller');//including login page authentication
var registerController=require('./controllers/register-controller'); // including registration page authentication
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + "login.html" );  //first page 
})  
 
app.get('/login.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "login.html" );  
})  
 
app.get('/index.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
})  
/* route to handle login and registration */
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
 
console.log(authenticateController);
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);
app.listen(8012);