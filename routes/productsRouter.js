const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

  let product = await productModel.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
  });
  req.flash("productcreated", "Product Created Successfully")
  res.redirect("/owners/product")
  }
  catch(err) {
    req.flash("details", "Please Fill the details Correctly")
    res.redirect("/owners/product")
  }
});

module.exports = router;

