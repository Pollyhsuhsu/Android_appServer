var express=require("express");
var connection = require("../db/db.connection");

module.exports.findAll = function(req,res){
    var email=req.body.email;
    var password=req.body.password;
   
   
    connection.query('SELECT * FROM users ', function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        res.json({
            status:true,
            data:results,
            message:'All all User.'
        })
      }
    });
}
