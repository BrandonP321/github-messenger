const express = require('express');
const path = require('path');

const router = express.Router();

// const someModelName = require('../models/something');


// sql stuff will be moved to appropriat folder when I know what I'm doing
const mysql = require('mysql')

const connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "scooby321",
database: "github_users_db"
});

connection.connect(function(err) {
    if (err) throw err;
    
});


// routes
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"))
});

router.get('/login/:username/:password', function(req, res) {
    const gitUsername = req.params.username;
    const userPassword = req.params.password;

    connection.query("SELECT * FROM users WHERE gitUserName=?", gitUsername, function(err, data) {
        console.log(data)
        if(err) {
            // TODO: change this error code
            return res.status(418).end()
        } else if (data.length === 0) {
            // if no user is found in the database return false to the client
            console.log('500')
            return res.status(500).end();
        // check if the given password is same as password in db
        } else if (data[0].password !== userPassword) {
            return res.status(404).end();
        // if no problems, send back object of user's info
        } else {
            const userInfoObj = {
                githubUsername: gitUsername,
                first_name: data[0].first_name,
                last_name: data[0].last_name,
                user_db_id: data[0].id
            }
            return res.json(userInfoObj)
        }
    });
})

router.post('/account/create/:username/:password/:fname/:lname', function(req, res) {
    console.log('enroute')
    connection.query("SELECT * FROM users WHERE gitUserName=?", req.params.username, function(err, data) {
        if(err) {
            return res.status(404).end();
        } else if (data.length > 0) {
            return res.status(500).end();
        }
        const insertValues = [req.params.fname, req.params.lname, req.params.username, req.params.password]
        connection.query("INSERT INTO users (first_name, last_name, gitUserName, password) VALUES (?, ?, ?, ?)", insertValues, function(err, data) {
            if(err) {
                return res.status(404).end();
            } else {
                res.json(data)
            }
            
        });
    });
});

module.exports = router;