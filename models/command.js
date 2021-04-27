var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commandSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  productsId: [{ type : Schema.Types.ObjectId, ref: 'Product' }],
  status: { type: Boolean, required: true, default:false },
  commandAdress: { type: String, required: true},
  commandPhone: { type: String, required: true},
  commandPrice: { type: Number, required: true },
  commandDate: Date,
  
});


module.exports = mongoose.model("Command", commandSchema);
