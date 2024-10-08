const Conversation = require("../models/conversation.model")
const Message = require("../models/message.model")
const { getReceiverSocketId, io } = require("../socket/socket")

const sendMessage = async (req,res) => {
    try{
      const {message} = req.body
      const {id : receiverId} = req.params
      const senderId = req.user._id

      let conversation = await Conversation.findOne({
        participants: { $all : [senderId, receiverId]}
      })

      if(!conversation){
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        })
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      })

      if(newMessage){
        conversation.messages.push(newMessage._id)
      } 

    //   await conversation.save()
    //   await newMessage.save()
        await Promise.all([conversation.save()], [newMessage.save()])   // this will run in parallel

        // socketIo funcitonality will go here
        const receiverSocketId  = getReceiverSocketId(receiverId)
         if(receiverSocketId){
          // io.to(<socket_id>).emit() used to send events to specific client
          io.to(receiverSocketId).emit("newMessage", newMessage)
         }

      res.status(201).json(newMessage)

    }catch(error){
       console.log("error in sendMessaage controller: ", error.message)
       res.status(500).json({ error: "Internal server error" })
    }
}

const getMessage = async (req, res) => {
      try{
           const {id : receiverId} = req.params
           const senderId = req.user._id

        //    const messages = await Message.find({
        //      senderId,
        //      receiverId
        //    })
        //    console.log(messages)
        //    res.status(200).json( messages )
        // or

          const conversation = await Conversation.findOne({
            participants : { $all : [senderId, receiverId]}
          }).populate("messages")

          if(!conversation){
            return res.status(200).json([])
          }

          const messages = conversation.messages

          res.status(200).json( messages )



      


      }catch(error){
        console.log("error in getMessage controller: ", error.message)
        res.status(500).json({ error: "Internal server error" })
      }
}

module.exports = {sendMessage, getMessage}