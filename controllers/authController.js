const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  let { fullname, email, password } = req.body;
  let findUser = await userModel.findOne({ email });
  if (findUser) {
    req.flash("exists", "User already exists");
    return res.redirect("/");
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        fullname,
        email,
        password: hash,
      });
      let token = generateToken(user);
      res.cookie("token", token);
      req.flash("created", "Account Created Successfully");
      res.redirect("/shop");
    });
  });
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let owner = await ownerModel.findOne({ email });
  if (owner) {
     const match =  bcrypt.compare(password, owner.password)
      if (match) {
        let token = generateToken(owner)
        res.cookie("token", token)
        req.flash("owner", "👍 Owner Loggedin successfully");
        return res.redirect("/owners/admin");
      } else {
        req.flash("error2", "Email or Password incorrect !");
        return res.redirect("/login");
      }
    }

    let user = await userModel.findOne({ email });
  if (!user) {
    req.flash("error2", "Email or Password incorrect !");
    return res.redirect("/login");
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      req.flash("loggedIn", "Successfully Logged in");
      res.redirect("/shop");
    } else {
      req.flash("error2", "Email or Password incorrect !");
      return res.redirect("/login");
    }
  });

  } 

  


