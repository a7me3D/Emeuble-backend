var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  categoryId: {type: Schema.Types.ObjectId, ref: 'Category'},
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productDate: Date,
  productLength: { type: Number, required: true },
  productWidth: { type: Number, required: true },
  productStock: { type: Number, required: false },
  productPrice: { type: Number, required: false }
});


module.exports = mongoose.model("Product", productSchema);
