const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let messageSchema = new Schema({

    userFrom: {
        users: { type: String, required: true },
        messages: [{
            type: new mongoose.Schema(
                {
                    message: { type: String, required: true },
                    user: { type: String, required: true },
                },
                { timestamps: true })
        }
        ]
    }
    ,
    userTo: {
        users: { type: String, required: true },
        messages: [{
            type: new mongoose.Schema(
                {
                    message: { type: String, required: true },
                    user: { type: String, required: true },
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