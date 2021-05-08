const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let tweetsSchema = new Schema({
    username: { type: String, required: true },
    tweet: { type: String, required: true }
}, {
    timestamps: true,
    collection: 'tweets'
});

const Tweets = mongoose.model('Tweets', tweetsSchema)

module.exports = Tweets;