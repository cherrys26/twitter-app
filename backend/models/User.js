const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        validate(value) {
            if (!value.match(/^\S*$/)) {
                throw new Error('Email is not valid.');
            }
        },
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!value.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
                throw new Error('Email is not valid.');
            }
        },
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(value) {
            if (!value.match(/^\S*$/)) {
                throw new Error('Email is not valid.');
            }
        },

    },
    bio: {
        type: String,
        required: true,
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    tweet: {
        type: [Schema.Types.ObjectId],
        ref: "Tweets"
    },
    likes: [{
        like: String
    }],
    // messages: [{
    // type: Schema.Types.ObjectId, ref: "Messages"
    // }]
}, {
    timestamps: true,
    collection: 'users'
})

// let messageSchema = new Schema({
//     user: { type: Schema.Types.ObjectId, ref: "User" },
//     message: String
// }, {
//     timestamps: true,
//     collection: "messages"
// });

// const Messages = mongoose.model("Messages", messageSchema);
const User = mongoose.model('User', userSchema);

// module.exports = Messages;
module.exports = User;