const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { route } = require("./ownersRouter");

router.get("/", (req, res) => {
  res.send("user chal raha hai");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", (req, res) => {
  res.cookie("token", "");
  req.flash("logout", "You have been logged out successfully!");
  res.redirect("/login");
});

module.exports = router;
