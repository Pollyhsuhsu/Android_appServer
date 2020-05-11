module.exports = app => {
    const participant = require("../controllers/participant.contorllers");
    
    // 
    app.post("/participant/join", participant.join);

    // 
    app.get("/participant/checkexists/:user_id&:chatroom_id", participant.checkExists);

    // Retrieve a list of Chat room with user ID
    app.get("/participant/querybyuserid/:user_id", participant.findByUserId);

    // Retrieve a list of Chat room with user ID
    app.get("/participant/most", participant.most);
};