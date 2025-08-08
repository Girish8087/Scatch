const express = require("express")
const router = express.Router()
const ownerModel = require("../models/owner-model")
const bcrypt = require("bcrypt")
const productModel = require("../models/product-model")
const {generateToken} = require("../utils/generateToken")
const isLoggedIn = require("../middlewares/isLoggedIn")
let userModel = require("../models/user-model")



router.get("/admin", async (req, res) => {
    let owner =req.flash("owner")
    let products = await productModel.find()
    res.render("adminPanel",{page: "all", owner,  products})
})

router.get("/removefromcart/:productid",isLoggedIn, async (req, res) => {
    try {
        const productId = req.params.productid;
    let product = await productModel.findOneAndDelete({_id: productId})
    await userModel.updateMany(
        {cart: productId}, 
        {$pull : {cart: productId}})

    res.redirect("/owners/admin")
    }catch (err) {
        res.send(err.message)
    }
})

router.get("/product",isLoggedIn, async (req, res) => {
    let productcreated = req.flash("productcreated")
    let details = req.flash("details")
    res.render("createProduct",{page: "create",productcreated, details})
})


if(process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let {fullname, email, password} = req.body
        let owners = await ownerModel.find()
        if(owners.length > 0) {
            res.status(503).send("You can't create an owner")
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let owner = await ownerModel.create({
                    fullname,
                    email,
                    password:hash
                })
                let token = generateToken(owner)
                res.cookie = ("token", token)
                res.send(owner)
            })
        })
        
    })
}

module.exports = router;