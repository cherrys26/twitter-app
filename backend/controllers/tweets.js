const Tweets = require('../models/Tweets');
const mongoose = require('mongoose')
const ObjectId = mongoose.ObjectId
exports.postTweet = (req, res, next) => {
    let { tweet, username } = req.body;
    let errors = [];
    if (!tweet) {
        errors.push({ tweet: "required" });
    }
    Tweets.find({ username: username })
        .then(user => {
            if (!user) {
                return res.status(422).json({ errors: [{ user: "username doesnt exists" }] });
            } else {
                const user = new Tweets({
                    username: username,
                    tweet: tweet
                });
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
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
}
exports.getTweet = (req, res) => {
    let username = req.params.username
    Tweets.find({ username: username })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.getTweetById = (req, res) => {
    let _id = req.params.id
    Tweets.findById({ _id })
        .then(tweet => res.json(tweet))
        .catch(err => res.status(400).json('Error: ' + err))
}
exports.getAllTweets = (req, res) => {
    Tweets.find().then(tweets => res.json(tweets)).catch(err => res.status(400).json('Error: ' + err))

}