module.exports = app => {
    const chatroom = require("../controllers/chatroom.contorllers");
    //  Create a chat room
    app.post("/chatrooms/createchatroom", chatroom.create);
    //  Register a new Customer
   // app.post("/users/register", auth.register);
    
    // Retrieve all Customers
    app.get("/chatrooms/All", chatroom.findAll);
  
    // Retrieve a single Chat room with chatroomID
    app.get("/chatrooms/querybyId/:chatroom_id", chatroom.findOne);
  
    

    // Update a Customer with customerId
    //app.put("/chatrooms/:user_id", chatroom.findByUserId);
  
    // Delete a Customer with customerId
    //app.delete("/customers/:customerId", customers.delete);
  
    // Create a new Customer
    //app.delete("/customers", customers.deleteAll);
  };