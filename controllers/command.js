const command = require("../models/command")
const Command = require("../models/command")


exports.addCommand = (req, res) =>{
    const command = new Command()
    command.userId = req.decoded.userId
    command.productsId = req.body.products
    command.commandPrice = req.body.price
    command.commandAdress = req.body.adress
    command.commandPhone = req.body.phone
    command.commandDate = Date.now()

    command.save((err, result) =>{
        if(err){
            return res.status(500).json({message:"Internal server error"})
        }
        else{
            return res.status(200).json({message:"Command added!"})
        }
    })
}

exports.getCommands = async (req, res) => {
    const commands = await Command.find()
                                .populate("productsId","productName")
                                .populate("userId", "firstName lastName adress phone")
                                .lean()
    console.log(req)
    return res.status(200).json(commands)
}

exports.getCommandsByUserId = async (req, res) => {
    
    const commands = await Command.find({"userId":req.decoded.userId})
                                .populate("productsId","productName")
                                .populate("userId", "firstName lastName adress phone")
                                .lean()
    return res.status(200).json(commands)
}


exports.validateCommand = (req, res) => {
    commandId = req.params.commandId
    commandStatus = req.body.validate
    
    if (commandStatus)
        Command.findByIdAndUpdate(commandId, {status:true},(err, command) => {
            if(err) return res.status(500).json({message:err})
            else return res.status(200).json({"messsage":"Command verified"})
        })
    else
        Command.findByIdAndRemove(commandId, (err, command) => {
            if(err) return res.status(500).json({message:err})
            else return res.status(200).json({"messsage":"Command deleted"})
        })
}