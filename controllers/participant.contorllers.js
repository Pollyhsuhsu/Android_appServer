var os = require("os");
var express=require("express");
var fs = require('fs');
var connection = require("../db/db.connection");

module.exports.join = function(req,res){
  var today = new Date();

  var participant = {
      "user_id":req.body.user_id,
      "chatroom_id":req.body.chatroom_id,
      "created_at":today,
  }
  console.log(participant);
  connection.query('INSERT INTO participant SET ?',participant, function (error, results, fields) {
    if (error) {
      res.json({
          status:false,
          message:'there are some error with query'
      })
    }else{
        res.json({
          status:true,
          data:results,
          message:'Participant join sucessfully'
      })
    }
  });
}

module.exports.checkExists = function(req,res){
  var user_id = req.params.user_id;
  var chatroom_id = req.params.chatroom_id;
  connection.query('SELECT `user_id`, `chatroom_id` FROM `participant` WHERE `user_id` = '+ user_id + ' AND `chatroom_id`= ' + chatroom_id, function (error, results, fields) {
    if (error) {
      res.json({
          status:false,
          message:'there are some error with query'
      })
    }else{
      if(results.length >0){
          res.json({
              exists:true,
              status:true,
              message:'successfully'
          })
      }else{
            res.json({
              exists:false,
              status:false,    
              message:"Chatroom does not exits"
            });
          }
      }
  });
}

module.exports.findByUserId = function(req,res){
  var user_id = req.params.user_id;
  connection.query('SELECT * FROM participant WHERE id = ?',[user_id], function (error, results, fields) {
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


module.exports.findByUserId = function(req,res){
  var user_id = req.params.user_id;
  //   
  connection.query('SELECT * FROM participant INNER JOIN chatrooms ON participant.chatroom_id = chatrooms.id WHERE participant.user_id = ?',[user_id], function (error, results, fields) {
    if (error) {
      res.json({
          status:false,
          message:'there are some error with query'
      })
    }else{
      if(results.length >0){
          res.json({
              data:results,
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

module.exports.most = function(req,res){
  connection.query('SELECT chatrooms.id, chatrooms.chatroom_name, chatrooms.chatroom_image, chatrooms.chatroom_desc, COUNT(participant.user_id) AS num_items FROM participant INNER JOIN chatrooms ON (participant.chatroom_id = chatrooms.id) GROUP BY participant.chatroom_id ASC LIMIT 3 ', function (error, results, fields) {
    if (error) {
        res.json({
          status:false,
          message:'there are some error with query'
          })
    }else{
      res.json({
          status:true,
          data:results,
          message:'Get the three most popular groups.'
      })
    }
  });
}