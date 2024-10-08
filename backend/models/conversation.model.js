const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
   participants : [
    { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
   ],
   messages : [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
    }
   ]
}, {timeStamps : true})

module.exports = mongoose.model("Conversation", conversationSchema)