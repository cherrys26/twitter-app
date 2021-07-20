const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let messageSchema = new Schema({

    userFrom: {
        users: { type: String },
        messages: [{
            type: new mongoose.Schema(
                {
                    message: { type: String },
                    user: { type: String },
                },
                { timestamps: true })
        }
        ]
    }
    ,
    userTo: {
        users: { type: String },
        messages: [{
            type: new mongoose.Schema(
                {
                    message: { type: String },
                    user: { type: String },
                },
                { timestamps: true })
        }
        ]
    }
}, {
    timestamps: true,
    collection: "messages"
});

const Messages = mongoose.model("Messages", messageSchema);

module.exports = Messages;