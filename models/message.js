var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  messageName:{type:String, required:true},
  messageEmail:{type:String, required:true},
  messageSubject:{type:String, required:true},
  messageContent:{type:String, required:true},
  messageDate:Date
});


module.exports = mongoose.model("Message", messageSchema);

