var http = require('http');
var Cryptr = require('cryptr');

var express=require("express");
var connection = require('./../config');
var passwordValidator = require('password-validator');
// cryptr = new Cryptr('myTotalySecretKey');
 
module.exports.register=function(req,res){
  var schema = new passwordValidator();
  schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values(later i will add name also)

    if(schema.validate(req.body.password)){

    
    var today = new Date();

  
  var encryptedString = cryptr.encrypt(req.body.password);//encrypting pasword here before inserting into database
    var users={
        "name":req.body.name,
        "email":req.body.email,
        "password":encryptedString,
        "created_at":today,
        "updated_at":today
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        /*res.json({
            status:false,
            message:'there are some error with query'
        })*/
        res.send("some error with the query"); //response when query failed
      }else{
          /*res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })*/
        //res.send("<h2> Data Inserted ! </h2>"); //response when query passed
        res.send('<h2> Data Inserted <br>Name : ' +req.body.name+ '<br>Email : ' +req.body.email + '<br>Time : ' +today+'</h2>');
      }
    });
    }
    else
    {
      res.send('password dosenot match the required format');
    }
}