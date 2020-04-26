const Cryptr = require('cryptr');
var express=require("express");
const cryptr = new Cryptr('myTotalySecretKey');
var connection = require("../db/db.connection");

module.exports.register = function(req,res){
    var today = new Date();
    var encryptedString = cryptr.encrypt(req.body.password);
    var users={
        "username":req.body.username,
        "email":req.body.email,
        "password":encryptedString,
        "created_at":today,
        "updated_at":today
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })
      }
    });
}

module.exports.authenticate = function(req,res){
    console.log(req.body);
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
            if(password == decryptedString){
                res.json({
                    status:true,
                    message:'successfully authenticated'
                })
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
}
