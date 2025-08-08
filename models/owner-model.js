const mongoose = require("mongoose")

const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    products: {
        type: Array,
        default: []
    },
    role: {
    type: String,
    enum: ["owner"],
    default: "owner"
  },
    contact: Number,
    gstin: String,
    picture: String,
})

module.exports = mongoose.model("owner", ownerSchema)