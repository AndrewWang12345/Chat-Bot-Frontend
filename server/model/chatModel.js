const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    }
);

module.exports = mongoose.model("Chat", chatSchema);