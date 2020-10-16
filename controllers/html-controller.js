const express = require('express');
const path = require('path')

const router = express.Router();

const db = require('../models/');


// routes

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"))
});

router.get('/login/:username/:password', function(req, res) {
    const gitUsername = req.params.username;
    const userPassword = req.params.password;
    console.log(gitUsername)

    db.Users.findOne({
        where: {
            gitUserName: gitUsername
        }
    }).then(function(dbUser) {
        if (dbUser.password === userPassword) {
            return res.json({
                githubUsername: dbUser.gitUserName,
                first_name: dbUser.first_name,
                last_name: dbUser.last_name,
                user_id: dbUser.id
            })
        } else if (dbUser.password !== userPassword) {
            return res.status(404).end();
        } else {
            return res.status(500).end();
        }
    })
});

router.post('/account/create', function(req, res) {
    db.Users.findAll({
        where: {
            gitUserName: req.body.gitUserName
        }
    }).then(function(dbUserList) {
        if (dbUserList.length > 0) {
            return res.status(500).end();
        }
        console.log(req.body)
        db.Users.create(req.body)
    })
});

router.get('/dashboard', function(req, res) {
    res.render('dashboard')
});

module.exports = router;