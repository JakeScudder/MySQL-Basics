const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

//Protect password from public github
const password = process.env.USER_PASSWORD;

//Database variables
const db = mysql.createConnection({
  host: "localhost",
  user: "jake",
  password: password,
  database: "ocean",
});

//Database connection
db.connect();

//GET all users
//Simple sql request
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//POST new user
//Simple sql insert
app.post("/new-user", (req, res) => {
  const sql =
    "INSERT INTO users (first_name, last_name, email, password, location, dept, is_admin, register_date) values ('Billy', 'Blanket', 'billy@gmail.com', 'abcdef7','Nevada', 'development', 0, now());";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Inserted New User");
    res.send(result);
  });
});

app.listen(5000, () => console.log("Server Started"));
