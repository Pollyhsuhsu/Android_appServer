module.exports = app => {
    const nearby = require("../controllers/nearby.contorllers");
    
    // Retrieve nearby Chatroom
    app.get("/nearby/nychatroom/:lat&:lng&:dis", nearby.nychatroom);

};