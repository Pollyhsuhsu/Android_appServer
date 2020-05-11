var express = require('express');
var bodyParser = require("body-parser");

 
var connection = require('./db/db.connection');
var app = express();

// parse requests of content-type: application/json
//app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
// app.use(bodyParser.json({ limit: '50mb' }))
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit : "50mb" })); 
app.use(express.urlencoded({ limit:"50mb", extended: false }));

require("./routers/user.routers")(app);
require("./routers/chatroom.routers")(app);
require("./routers/nearby.routers")(app);
require("./routers/participant.routers")(app);

// set port, listen for requests
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
