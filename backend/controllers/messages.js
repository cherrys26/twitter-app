const Messages = require('../models/Messages');
const mongoose = require('mongoose')
const ObjectId = mongoose.ObjectId

exports.getAllMessages = (req, res) => {
    Messages.find().then(messages => res.json(messages)).catch(err => res.status(400).json('Error: ' + err))
}

exports.updateMessages = (req, res, next) => {
    let { userFrom, userTo } = req.body;
    let errors = [];
    Messages.find({ userTo: userTo })
        .then(users1 => {
            if (users1) {
                const users1 = new Messages({
                    userFrom: {
                        users: userFrom
                    },
                    userTo: {
                        users: userTo
                    }
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
exports.getMessageByUser = (req, res) => {
    let user = req.params.user
    Messages.find({ $or: [{ 'userFrom.users': user }, { 'userTo.users': user }] })
        .then(users => res.json(users))
        .catch(error => res.json(error))
}

exports.userFromPost = (req, res) => {
    let _id = req.params.id
    let { users, message } = req.body
    Messages.findOneAndUpdate(
        { _id: _id, 'userFrom.users': users },
        { $push: { 'userFrom.messages': { message: message, user: users } } }

    )
        .then(user => res.json(user))
        .catch(error => res.json(error))
}
exports.userToPost = (req, res) => {
    let _id = req.params.id
    let { users, message } = req.body
    Messages.findOneAndUpdate(
        { _id: _id, 'userTo.users': users },
        { $push: { 'userTo.messages': { message: message, user: users } } }

    )
        .then(user => res.json(user))
        .catch(error => res.json(error))
}

exports.deleteMessage = (req, res) => {
    let _id = req.params.id
    Messages.findByIdAndDelete(
        { _id: _id },
    )
        .then(follower => res.json(follower))
        .catch(error => res.json(error))
}