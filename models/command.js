var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commandSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  productsId: [{ type : Schema.Types.ObjectId, ref: 'Product' }],
  status: { type: Boolean, required: true, default:false },
  commandPrice: { type: Number, required: true },
  commandDate: Date,
  
});


module.exports = mongoose.model("Command", commandSchema);
