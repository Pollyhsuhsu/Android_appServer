var express = require('express');
var bodyParser = require("body-parser");

 
var connection = require('./db/db.connection');
var app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routers/user.routers")(app);

// app.get('/', function(req,res){
//     // about mysql
//     connection.query("SELECT * FROM customers", function(error, rows, fields){
//         if(!!error){
//             console.log('Error in the query');
//         }else{
//             console.log('Successful query');
//             console.log(rows);
//         }
//     });
// });

// set port, listen for requests
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
