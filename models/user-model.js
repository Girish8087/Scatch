const mongoose = require("mongoose");
const productModel = require("./product-model");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  }],
  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user",
  },
  orders: {
    type: Array,
    default: [],
  },
  picture: String,
  contact: Number,
});

module.exports = mongoose.model("user", userSchema);
