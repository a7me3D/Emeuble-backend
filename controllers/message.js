const Message = require("../models/message")

exports.addMessage = (req, res) => {
    const message = new Message()
    message.messageName = req.body.message.name
    message.messageEmail = req.body.message.email
    message.messageSubject = req.body.message.subject
    message.messageContent = req.body.message.content
    message.messageDate = Date.now()

    message.save((err, msg)=>{
        if(err)return res.status(500).json({message:"Internal server error"})
        else return res.status(200).json({message:"Message sent"})
    })
}

exports.getMessages = async  (req, res) => {
    try{
        const messages = await Message.find().lean()
        return res.status(200).json(messages)
    }catch{
        return res.status(500).json({message:"Internal server error"})
    }
}

exports.getMessagesByEmail = async (req, res) => {
    try{
        const messages = Message.find({email:req.decoded.email})
        return res.status(200).json(messages)
    }catch{
        return res.status(500).json({message:"Internal server error"})
    }
}

exports.deleteMessage = async (req,res) => {
    const messageId = req.params.id
    Message.findByIdAndDelete(messageId, (err, message) => {
        if(err) return res.status(500).json({message:err})
        else return res.status(200).json({message:"Message deleted"})

    })
}