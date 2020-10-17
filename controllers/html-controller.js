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
                git_user_name: dbUser.git_user_name,
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
            gitUserName: req.body.git_user_name
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
    console.log('on dash')
    db.Groups.findAll().then(function(dbAllGroups) {
        const channelsArr = []
        const groupsArr = []
        const dmArr = []

        dbAllGroups.forEach(group => {
            const obj = {}
            
            obj.id = group.dataValues.id
            obj.name = group.dataValues.group_name
            obj.groupType = group.dataValues.group_type

            if (obj.groupType === 'channel') {
                obj.repoUrl = group.dataValues.repo_url
                channelsArr.push(obj)
            } else if (obj.groupType === 'groupChat') {
                groupsArr.push(obj)
            } else {
                dmArr.push(obj)
            }
        })
        console.log(dmArr)
        res.render('dashboard', {
            channels: channelsArr,
            groups: groupsArr,
            dms: dmArr
        })
    })

    // router.get('/groups/messages/:group_id', function(req, res) {
    //     console.log('\n*** GETTING MESSAGES ***\n')
    //     db.Groups.findOne({
    //         attributes: [
    //             'group_name',
    //             'group_type',
    //             'repo_url'
    //         ],
    //         where: {
    //             id: req.params.group_id
    //         },
    //         include: [
    //             {
    //                 model: db.Messages,
    //                 attributes: [
    //                     'id',
    //                     ['user_id', 'creator_id'],
    //                     'message_body'
    //                 ],
    //                 where: {group_id: req.params.group_id}
    //             },
    //             {
    //                 model: db.User_group,
    //                 attributes: [
    //                     'UserId',
    //                     'GroupId'
    //                 ],
    //                 include: [
    //                     {
    //                         model: db.Users,
    //                         attributes: [
    //                             'id',
    //                             'first_name',
    //                             'last_name',
    //                             'git_user_name'
    //                         ]
    //                     }
    //                 ],
    //                 where: {group_id: req.params.group_id}
    //             }
    //         ]
    //     }).then(function(dbGroup) {
    //         console.log('group')
    //         res.json(dbGroup)
    //     })
    // })

    router.get('/groups/messages/:group_id', function(req, res) {
        console.log('\n*** GETTING MESSAGES ***\n')
        db.Groups.findOne({
            attributes: [
                'group_name',
                'group_type',
                'repo_url'
            ],
            where: {
                id: req.params.group_id
            },
            include: [
                {
                    model: db.Messages,
                    attributes: [
                        'id',
                        ['user_id', 'creator_id'],
                        'message_body'
                    ],
                    where: {group_id: req.params.group_id}
                },
                {
                    model: db.User_group,
                    attributes: [
                        'id',
                        'UserId',
                        'GroupId'
                    ],
                    include: [{
                        model: db.Users,
                        attributes: [
                            ['id', 'user_id'],
                            'first_name',
                            'last_name',
                            'git_user_name'
                        ]
                    }]
                }
            ]
        }).then(function(dbGroup) {
            let membersArr = []
            dbGroup.User_groups.forEach(user_group => membersArr.push(user_group.User))


            const apiObj = {
                group_name: dbGroup.group_name,
                group_type: dbGroup.group_type,
                repo_url: dbGroup.repo_url,
                messages: dbGroup.Messages,
                group_members: membersArr
            }
            res.json(apiObj)
        })
    })

});

module.exports = router;