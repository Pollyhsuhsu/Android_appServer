var express=require("express");
var connection = require("../db/db.connection");

module.exports.findAll = function(req,res){
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


module.exports.findOne = function(req,res){
  var user_id = req.params.user_id;
  console.log(user_id);
  connection.query('SELECT * FROM users WHERE id = ?',[user_id], function (error, results, fields) {
    if (error) {
      res.json({
          status:false,
          message:'there are some error with query'
      })
    }else{
      if(results.length >0){
          res.json({
              data:results[0],
              status:true,
              message:'successfully'
          })
      }else{
           res.json({
               status:false,    
             message:"user does not exits"
           });
         }
     }
  });
}
