const Messages = require('../models/Messages');
const mongoose = require('mongoose')
const ObjectId = mongoose.ObjectId

exports.getAllMessages = (req, res) => {
    Messages.find().then(messages => res.json(messages)).catch(err => res.status(400).json('Error: ' + err))
}

exports.updateMessage = (req, res, next) => {
    let user = req.params.user
    let { users } = req.body;
    let errors = [];
    Messages.findOne({ user: user })
        .then(users1 => {
            if (users1) {
                return res.status(422).json({ errors: [{ users1: "username already exists" }] });
            } else {
                const users1 = new Messages({
                    userFrom: [{
                        users: user
                    }],
                    userTo: [{
                        users: users
                    }]
                });
                users1.save()
                    .then(response => {
                        res.status(200).json({
                            success: true,
                            result: response
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            errors: [{ error: err }]
                        });
                    });
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
}

exports.getMessages = (req, res) => {
    let _id = req.params.id;
    Messages.findById({ _id })
        .then(user => res.json(user))
        .catch(error => res.json(error))
}

exports.postMessage = (req, res) => {
    let users = req.params.users
    let { user, message } = req.body
    Messages.updateOne(
        { users: users },
        { $push: { messages: { message: message } } },
        { $push: { messages: { user: user } } }
    )
        .then(message => res.json(message))
        .catch(error => res.json(error))
}
exports.messUp = (req, res) => {
    let _id = req.params.id;
    let { users, message, user } = req.body;
    Messages.updateOne(
        { _id, users: users },
        { $push: { messages: { message: message } } },
        { $push: { messages: { user: user } } }
    )
        .then(likes => res.json(likes))
        .catch(error => res.json(error))
}
exports.getMess = (req, res) => {
    let users = req.params.users;
    // let { users } = req.body;
    Messages.find(
        { userTo: { users: users } },
    )
        .then(likes => res.json(likes))
        .catch(error => res.json(error))
}
