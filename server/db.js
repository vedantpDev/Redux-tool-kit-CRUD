const mysql = require("mysql2");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "redux_toolkit",
});

conn.connect;

module.exports = conn;
