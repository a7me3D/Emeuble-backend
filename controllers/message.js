const Message = require("../models/message")

exports.addMessage = (req, res) => {
    const message = new Message()
    message.messageName = req.body.name
    message.messageEmail = req.body.email
    message.messageSubject = req.body.subject
    message.messageContent = req.body.content
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

