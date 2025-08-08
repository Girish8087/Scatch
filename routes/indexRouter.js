const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const c = require("config");


router.get("/", (req, res) => {
  let exists = req.flash("exists");
  res.render("index", { exists });
});

router.get("/login", (req, res) => {
  let error2 = req.flash("error2");
  let logout = req.flash("logout")
  res.render("LoginAccount", { error2, logout });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let created = req.flash("created");
  let loggedIn = req.flash("loggedIn");
  let addedtocart = req.flash("addedtocart")
  let products = await productModel.find()
  res.render("Shop", { created, loggedIn , products, addedtocart});
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({email : req.user.email})
  user.cart.push(req.params.productid)
  await user.save();
  req.flash("addedtocart", "item Added to cart")
  res.redirect("/shop")
});

router.get("/removefromcart/:productid", isLoggedIn, async (req, res) => {
  try {
    const productId = req.params.productid
  let user = await userModel.findOneAndUpdate({email: req.user.email}, {$pull : {cart: productId}})
  req.flash("removedfromcart", "Remove item from cart")
  res.redirect("/cart")
  }catch (err) {
    res.send(err.message)
    return res.redirect("/cart")
  }
})

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({email: req.user.email}).populate("cart")
  let removedfromcart = req.flash("removedfromcart")
  res.render("Cart", {user, removedfromcart});
  console.log(user.cart)
});

module.exports = router;
