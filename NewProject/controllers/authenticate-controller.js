var Cryptr = require('cryptr');
var express=require("express");
var session = require('express-session');
cryptr = new Cryptr('myTotalySecretKey');

var app = express();
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
})); 

var connection = require('./../config');
module.exports.authenticate=function(req,res){
  
  
    var email=req.body.email;
    var password=req.body.password;
   
   
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
       
        if(results.length >0){
  decryptedString = cryptr.decrypt(results[0].password);
            if(password==decryptedString){
              //req.session.loggedin = true;
              //req.session.username = email;
              Object.keys(results).forEach(function(key) {
              var row = results[key]; 
           
             //res.send('Welcome back, ' + email+ '!'); 
                res.send('Welcome Back '+ row.name );
              });
                /*res.json({
                    status:true,
                    message:'successfully authenticated'
                })*/
            }else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
          
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
    /*app.get('/home', function(request, response) {
      if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
      } else {
        response.send('Please login to view this page!');
      }
      response.end();
    });*/ 
}