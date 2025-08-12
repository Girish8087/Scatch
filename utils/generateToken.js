const jwt = require("jsonwebtoken")
const {JWT_KEY} = require("../config/keys")

const generateToken = (user) => {
    return jwt.sign({email: user.email, id: user._id}, JWT_KEY)
}

module.exports = {generateToken}