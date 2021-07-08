const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
    createJWT,
} = require("../utils/auth");
const { db } = require('../models/User');
exports.signup = (req, res, next) => {
    let { name, username, email, password, bio, followers, following } = req.body;
    let errors = [];
    if (!name) {
        errors.push({ name: "required" });
    }
    if (!username) {
        errors.push({ username: "required" });
    }
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!password) {
        errors.push({ password: "required" });
    }
    if (!bio) {
        errors.push({ bio: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    User.findOne({ username: username })
        .then(user => {
            if (user) {
                return res.status(422).json({ errors: [{ user: "username already exists" }] });
            } else {
                const user = new User({
                    name: name,
                    username: username,
                    email: email,
                    password: password,
                    bio: bio,
                    followers: followers,
                    following, following
                });
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        user.password = hash;
                        user.save()
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
                    });
                });
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
}
exports.signin = (req, res) => {
    let { username, password } = req.body;
    let errors = [];
    if (!username) {
        errors.push({ username: "required" });
    }
    if (!password) {
        errors.push({ password: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    User.findOne({ username: username }).then(user => {
        if (!user) {
            return res.status(404).json({
                errors: [{ user: "not found" }],
            });
        } else {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) {
                    return res.status(400).json({
                        errors: [{
                            password:
                                "incorrect"
                        }]
                    });
                }
                let access_token = createJWT(
                    user.username,
                    user._id,
                    3600
                );
                jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
                    decoded) => {
                    if (err) {
                        res.status(500).json({ erros: err });
                    }
                    if (decoded) {
                        return res.status(200).json({
                            success: true,
                            token: access_token,
                            message: user
                        });
                    }
                });
            }).catch(err => {
                res.status(500).json({ erros: err });
                console.log({ error: err })
            });
        }
    }).catch(err => {
        res.status(500).json({ erros: err });
    });
}
exports.allUsers = (req, res) => {
    User.find().then(users => res.json(users)).catch(err => res.status(400).json('Error: ' + err))
}
exports.getUser = (req, res) => {
    let username = req.params.username
    User.find({ username: username })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err))
}
exports.updateUser = (req, res) => {
    let username = req.params.username;
    let { bio } = req.body
    User.updateMany(
        { username: username },
        { $set: { bio: bio } }

    )
        .then(user => res.json(user))
        .catch(error => res.json(error))
}

exports.getSearch = (req, res) => {
    User.find({ username: { $regex: req.query.username } })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
}

//followers
exports.getFollowers = (req, res) => {
    let username = req.params.username
    User.find({ username: username })
        .then(user => res.json(user[0].followers))
        .catch(err => res.status(400).json('Error: ' + err))
}
exports.updateFollowers = (req, res) => {
    let username = req.params.username
    let { followers } = req.body
    User.updateOne(
        { username: username },
        { $push: { followers: followers } }
    )
        .then(follower => res.json(follower))
        .catch(error => res.json(error))
}
exports.deleteFollowers = (req, res) => {
    let username = req.params.username
    let { followers } = req.body
    User.updateOne(
        { username: username },
        { $pull: { followers: followers } }
    )
        .then(follower => res.json(follower))
        .catch(error => res.json(error))
}

//following
exports.getFollowing = (req, res) => {
    let username = req.params.username
    User.find({ username: username })
        .then(user => res.json(user[0].following))
        .catch(err => res.status(400).json('Error: ' + err))
}
exports.updateFollowing = (req, res) => {
    let username = req.params.username
    let { following } = req.body
    User.updateOne(
        { username: username },
        { $push: { following: following } }
    )
        .then(following => res.json(following))
        .catch(error => res.json(error))
}
exports.deleteFollowing = (req, res) => {
    let username = req.params.username
    let { following } = req.body
    User.updateOne(
        { username: username },
        { $pull: { following: following } }
    )
        .then(following => res.json(following))
        .catch(error => res.json(error))
}

// likes
exports.getLikes = (req, res) => {
    let username = req.params.username
    User.find({ username: username })
        .then(user => res.json(user[0].likes))
        .catch(err => res.status(400).json('Error: ' + err))
}
exports.updateLikes = (req, res) => {
    let username = req.params.username
    let { like } = req.body
    User.updateOne(
        { username: username },
        { $push: { likes: { like: like } } }
    )
        .then(likes => res.json(likes))
        .catch(error => res.json(error))
}
exports.deleteLikes = (req, res) => {
    let username = req.params.username
    let { like } = req.body
    User.updateOne(
        { username: username },
        { $pull: { likes: { like: like } } }
    )
        .then(likes => res.json(likes))
        .catch(error => res.json(error))
}

// test

exports.testJoin = (req, res) => {
    db.Tweets.create(req.body).then(function (dbTweets) {
        return User.findOneAndUpdate({ _id: req.params.id }, { tweet: dbTweets._id }, { new: true });
    })
        .then(function (User) {
            res.json(User);
        })
        .catch(function (err) {
            res.json(err);
        });
}

exports.testGetJoin = (req, res) => {    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    User.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("tweet")
        .then(function (User) {
            // If we were able to successfully find an Product with the given id, send it back to the client
            res.json(User);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
}