const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let messageSchema = new Schema({
    user: String,
    message: String
}, {
    timestamps: true,
    collection: "messages"
});

const Messages = mongoose.model("Messages", messageSchema);

module.exports = Messages;