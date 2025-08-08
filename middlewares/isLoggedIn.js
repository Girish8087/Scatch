const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");
const { JWT_KEY } = require("../config/keys");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "You need to login first");
    return res.redirect("/login");
  }
  try {
    let decoded = await jwt.verify(req.cookies.token, JWT_KEY);

    let owner = await ownerModel.findOne({email: decoded.email}).select("-password")

    if (owner) {
      req.owner = owner;
      return next();
    }
    let user = await userModel.findOne({email : decoded.email}).select("-password")
    if (user) {
      req.user = user;
      return next();
    }
    req.flash("error", "Something went wrong")
    return res.redirect("/")
  } catch (err) {
    res.flash("error", "something went wrong");
    return res.redirect("/");
  }
};
