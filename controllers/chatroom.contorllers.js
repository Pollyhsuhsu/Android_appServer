var os = require("os");
var express=require("express");
var fs = require('fs');
var connection = require("../db/db.connection");


module.exports.create = function(req,res){
  //get ipaddress.
  var today = new Date();
  var ipaddress = os.networkInterfaces().en0[1].address;
  let imageName;

  if(req.body.booleanImage){
    let imgData = req.body.chatroom_image;
    let buff = Buffer.from(imgData, 'base64');
    imageName = "images/GroupImg_" + Date.now() + ".jpg";
    fs.writeFileSync(imageName,buff, function(err) {
      if (err) return
      console.log('Group Icon saved successfully')
    });
  }else{
    imageName = null;
  }

  var chatroom = {
      "chatroom_name":req.body.chatroom_name,
      "chatroom_desc":req.body.chatroom_desc,
      "chatroom_image":"http://" + ipaddress+ "/server/" + imageName,
      "created_by":req.body.created_by,
      "longitude": req.body.longitude,
      "latitude": req.body.latitude,
      "created_at":today,
  }

  connection.query('INSERT INTO chatrooms SET ?',chatroom, function (error, results, fields) {
    if (error) {
      res.json({
          status:false,
          message:'there are some error with query'
      })
    }else{
        res.json({
          status:true,
          data:results,
          insertid: results.insertId,
          message:'Create a chatroom sucessfully'
      })
    }
  });
}

module.exports.findAll = function(req,res){
  connection.query('SELECT * FROM chatrooms ', function (error, results, fields) {
    if (error) {
        res.json({
          status:false,
          message:'there are some error with query'
          })
    }else{
      res.json({
          status:true,
          data:results,
          message:'All chatroom.'
      })
    }
  });
}

module.exports.findOne = function(req,res){
  var chatroom_id = req.params.chatroom_id;
  connection.query('SELECT * FROM chatrooms WHERE id = ?',[chatroom_id], function (error, results, fields) {
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
              message:"Chatroom does not exits"
            });
          }
      }
  });
}

