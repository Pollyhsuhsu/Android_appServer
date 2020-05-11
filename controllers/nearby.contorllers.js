var os = require("os");
var express=require("express");
var fs = require('fs');
var connection = require("../db/db.connection");

module.exports.nychatroom = function(req,res){
  var currentLatitude = req.params.lat; //緯度
  var currentLongitude = req.params.lng; //經度
  var distance = req.params.dis;

  console.log(currentLatitude,currentLongitude);
  connection.query('SELECT `id`,`chatroom_name`, `chatroom_desc`, `chatroom_image`, `created_by`, `created_at`, `longitude`, `latitude`, 6371 * acos(cos(radians('+ currentLatitude +')) * cos(radians(`latitude`)) * cos(radians(`longitude`) - radians('+ currentLongitude +')) + sin(radians('+ currentLatitude +')) * sin(radians(`latitude`))) AS `distance` FROM `chatrooms` HAVING `distance` < ' + distance + ' ORDER BY `distance`', function (error, results, fields) {
  //FROM chatrooms WHERE chatroom_id = ?',[chatroom_id], function (error, results, fields) {
    if (error) {
      res.json({
          status:false,
          message:'there are some error with query'
      })
    }else{
      if(results.length >0){
          res.json({
              status:true,
              data:results,
              message:'successfully'
          })
      }else{
            res.json({
              status:false,    
              message:"chatroom does not exits"
            });
          }
      }
  });
}