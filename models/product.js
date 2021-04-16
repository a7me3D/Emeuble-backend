var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  categoryId: { type: String, required: true },
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productDate: Date,
  productLength: { type: Number, required: true },
  productWidth: { type: Number, required: true },
  productStock: { type: Number, required: false },
  productPrice: { type: Number, required: false }
});

userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
