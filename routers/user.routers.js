module.exports = app => {
    const auth = require("../controllers/auth.controllers");
    const users = require("../controllers/user.controllers");
    //  Authenticate
    app.post("/users/authenticate", auth.authenticate);
    //  Register a new Customer
    app.post("/users/register", auth.register);
    
    // Retrieve all Customers
    app.get("/customers", users.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/customers/querybyId/:user_id", users.findOne);
  
    // Update a Customer with customerId
    app.put("/customers/update", users.update);
  
    // Delete a Customer with customerId
    //app.delete("/customers/:customerId", customers.delete);
  
    // Create a new Customer
    //app.delete("/customers", customers.deleteAll);
  };