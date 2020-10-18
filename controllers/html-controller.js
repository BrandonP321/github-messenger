const express = require('express');
const path = require('path')

const router = express.Router();

const db = require('../models/');


// routes

// route for login page
router.get('/', function (req, res) {
    // send login html to client
    res.sendFile(path.join(__dirname, "../public/login.html"))
});

// api route for logging user in
router.get('/login/:username/:password', function (req, res) {
    // save url params for username and password
    const gitUsername = req.params.username;
    const userPassword = req.params.password;

    // try to find the user account with the given username
    db.Users.findOne({
        where: {
            gitUserName: gitUsername
        }
    }).then(function (dbUser) {
        // passwords match, send back info on user
        if (dbUser.password === userPassword) {
            return res.json({
                git_user_name: dbUser.git_user_name,
                first_name: dbUser.first_name,
                last_name: dbUser.last_name,
                user_id: dbUser.id
            })
            // if passwords don't match, send back 404
        } else if (dbUser.password !== userPassword) {
            return res.status(404).end();
            // for any other error send 505
        } else {
            return res.status(500).end();
        }
    })
});

// post route for creating a new account
router.post('/account/create', function (req, res) {
    // check if a user account with the given username already exists
    db.Users.findAll({
        where: {
            gitUserName: req.body.git_user_name
        }
    }).then(function (dbUserList) {
        // if length of returned array contains any users, send 505 error
        if (dbUserList.length > 0) {
            return res.status(500).end();
        }
        // if no user account already exists, create a new record in users table
        db.Users.create(req.body)
    })
});

// route to create and send dashboard page to client
router.get('/dashboard', function (req, res) {
    // find all groups for the logged in user
    db.Groups.findAll().then(function (dbAllGroups) {
        // create arrays differentiating which group chats are project channels, group chats, and dm's
        const channelsArr = []
        const groupsArr = []
        const dmArr = []

        // iterate through each group the user is in
        dbAllGroups.forEach(group => {
            // empty object to store group info in
            const obj = {}

            // store group id/name/grouptype in object
            obj.id = group.dataValues.id
            obj.name = group.dataValues.group_name
            obj.groupType = group.dataValues.group_type

            // push the object to it's appropriat array above
            if (obj.groupType === 'channel') {
                obj.repoUrl = group.dataValues.repo_url
                channelsArr.push(obj)
            } else if (obj.groupType === 'groupChat') {
                groupsArr.push(obj)
            } else {
                dmArr.push(obj)
            }
        })
        // render the dashboard page with the groups from the 3 arrays
        res.render('dashboard', {
            channels: channelsArr,
            groups: groupsArr,
            dms: dmArr
        })
    })
});

// route for retrieving all messages/users/groupInfo on a given group
router.get('/groups/messages/:group_id', function (req, res) {
    // find a group with id == id param passed in url
    db.Groups.findOne({
        // only grab group name, type, and repo url from db
        attributes: [
            'group_name',
            'group_type',
            'repo_url'
        ],
        where: {
            id: req.params.group_id
        },
        // also grab all messages sent to the same group and members of the group
        include: [
            {
                model: db.Messages,
                // only grab message id, creator(user) id, and message text
                attributes: [
                    'id',
                    ['user_id', 'creator_id'],
                    'message_body'
                ],
                where: { group_id: req.params.group_id }
            },
            {
                // model containing info on which users are a part of which groups
                model: db.User_group,
                attributes: [
                    'id',
                    'UserId',
                    'GroupId'
                ],
                // then include only the users who are a part of the current group
                include: [{
                    model: db.Users,
                    // grab user id, first name, last name, & git username
                    attributes: [
                        ['id', 'user_id'],
                        'first_name',
                        'last_name',
                        'git_user_name'
                    ]
                }]
            }
        ]
    }).then(function (dbGroup) {
        // create array to store all members of the group
        let membersArr = []
        // clean up json format to only contain one array of all users
        dbGroup.User_groups.forEach(user_group => membersArr.push(user_group.User))

        // create json object to be sent to client
        const apiObj = {
            group_name: dbGroup.group_name,
            group_type: dbGroup.group_type,
            repo_url: dbGroup.repo_url,
            messages: dbGroup.Messages,
            group_members: membersArr
        }
        // send json obj back to client
        res.json(apiObj)
    })
})

router.post('/api/messages/new', function(req, res) {
    console.log(req.body)
    db.Messages.create({
        message_body: req.body.message_body,
        UserId: req.body.user_id,
        GroupId: req.body.group_id
    }).then(function(data) {
        res.status(200).end();
    })
});

module.exports = router;