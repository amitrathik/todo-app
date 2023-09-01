require('dotenv').config();
// Requiring express in our server
const cors = require("cors");
const express = require('express');
const app = express();
const port = process.env.port
//Enable cors
app.use(cors());
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
// API Endpoints
const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_pswd,
    port: process.env.db_port,
	database: process.env.db_name
});


// TODOS
app.get('/todos', async (req,res) =>{
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		const sql = "SELECT * FROM Tasks LIMIT 10 OFFSET 0";
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Result: " + result);
			res.json(result)
		});
	});
})

app.post('/todos', async (req,res) =>{
	console.log(req.body);
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		const sql = `INSERT INTO Tasks (title) VALUES ('${req.body.name}')`;
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Result: " + result);
			res.json(result)
		});
	});
})


app.post('/todos/:id', async (req,res) =>{
	console.log(req.body);
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		const sql = `UPDATE Tasks SET description = '${req.body.description}' WHERE id = ${req.params.id}`;
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Result: " + result);
			res.json(result)
		});
	});
})

app.delete('/todos/:id', async (req,res) =>{
	console.log(req.body);
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		const sql = `DELETE FROM Tasks WHERE id = ${req.params.id}`;
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Result: " + result);
			res.json(result)
		});
	});
})


// Setting the server to listen at port 3000
app.listen(port, function(req, res) {
	console.log(`Server is running at port ${port}`);
});