const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var express=require("express");
var connection = require("../db/db.connection");
var fs = require('fs');
var os = require("os");
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
        decryptedString = cryptr.decrypt(results[0].password);
        results[0].password = decryptedString
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

module.exports.update = function(req,res){
  var today = new Date();
  var encryptedString = cryptr.encrypt(req.body.password);
  var ipaddress = os.networkInterfaces().en0[1].address;
  
  let imageName;

  if(req.body.booleanImage){
    let imgData = req.body.user_image;
    let buff = Buffer.from(imgData, 'base64');
    var imageNamePath = "images/UserImg_" + Date.now() + ".jpg";
    fs.writeFileSync(imageNamePath,buff, function(err) {
      if (err) return
      console.log('User Icon saved successfully')
    });
    imageName = "http://" + ipaddress+ "/server/" + imageNamePath;
  }else{
    imageName = null;
  }

  console.log(imageName);
  var users={
      "id":req.body.id,
      "username":req.body.username,
      "email":req.body.email,
      "password":encryptedString,
      "user_image":imageName,
      "updated_at":today
  }

  connection.query(`UPDATE users SET username = ?, email = ?, password = ?, updated_at = ? ,user_image = ? WHERE id = ?`,[users.username,users.email,users.password,users.updated_at,users.user_image,users.id], function (error, results, fields) {
    if (error) {
      res.json({
          status:false,
          message: error
      })
    }else{
        // decryptedString = cryptr.decrypt(results[0].password);
        // results[0].password = decryptedString
          res.json({
              data:results,
              status:true,
              message:'successfully'
          })
        }
  });
}