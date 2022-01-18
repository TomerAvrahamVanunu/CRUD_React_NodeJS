const express = require("express");
const bodyParser = require ("body-parser");
const app = express();
const mysql = require ("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
   password: "password",
   database: "crud_1_db",
});

app.use (bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) =>{
    const sqlSelect =
        "SELECT * FROM employee_tbl";
    db.query(sqlSelect, (err, result) =>{
        res.send(result);
    });
});


app.post("/api/insert", (req, res) => {
   
    const Id = req.body.Id;
    const Name = req.body.Name;
    const Email = req.body.Email;
    const LastSeen = req.body.LastSeen;
   
    const sqlInsert =
        "INSERT INTO employee_tbl (ID, Name, Email, LastSeen) VALUES (?,?,?,?)";
    db.query(sqlInsert, [Id, Name, Email, LastSeen], (err, result) =>{
        console.log(result);
    });
});

app.delete("/api/delete/:Id", (req, res) => {
    const Id = req.params.Id;
    const sqlDelete = "DELETE FROM employee_tbl WHERE ID= ?";
        
    db.query(sqlDelete, Id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/api/update", (req, res) => {
    const Id = req.body.Id;
    const Email = req.body.Email;
    const sqlUpdate = "UPDATE employee_tbl SET Email = ? WHERE Id = ?";

    db.query(sqlUpdate, [Email, Id], (err, result) => {
        if (err) {
         console.log(err);
        }else {
            res.send(result);
        }
      }
    );
});


app.listen(3001, ()=> {
    console.log("running on port 3001");
});