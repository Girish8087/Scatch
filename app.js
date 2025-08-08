const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/indexRouter");
const db = require("./config/mongoose-connection");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(flash());

const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/product", productsRouter)
app.use("/", indexRouter);

app.listen(port, (err) => {
  err ? console.log(err) : console.log(`it's runnning on port ${port}`);
});
