const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let messageSchema = new Schema({

    userFrom: [{
        users: { type: String },
        messages: [
            {
                message: { type: String },
                user: { type: String }
            },
            { timestamp: true }
        ]
    }]
    ,
    userTo: [{
        users: { type: String },
        messages: [
            {
                message: String,
                user: String
            },
            { timestamp: true }
        ]
    }]
}, {
    timestamps: true,
    collection: "messages"
});

const Messages = mongoose.model("Messages", messageSchema);

module.exports = Messages;