const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  socketPath: dbConfig.SOCKET
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");

 // var sqlCreateUserTable = "CREATE TABLE if not exists users (id INT(11) NOT NULL AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY(id))";
});

module.exports = connection;