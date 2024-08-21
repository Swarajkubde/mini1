var express = require("express");
var router = express.Router();
const usermodel = require("./users");
const postmodel = require("./post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const e = require("express");

// mongoose,
// jsonwebtoken bcrypt

router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/register", async function (req, res, next) {
  let { username, name, email, password } = req.body;
  let user = await usermodel.findOne({ email });
  if (user) return res.send("user already registered \n please login  ");
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const user = await usermodel.create({
        username,
        name,
        email,
        password: hash,
      });
      let token = jwt.sign({ email: email, userid: user.id }, "secret");
      res.cookie("token", token);
      // res.send("registered");
      res.redirect("/login")
    });
  });
});

router.get("/login", function (req, res, next) {
  // res.send("mini")
  res.render("login");
});

router.get("/profile", isLoggedIn, async function (req, res, next) {
  let user = await usermodel.findOne({ email: req.user.email }).populate("posts")
  res.render("profile", { user });
});

router.get("/like/:id", isLoggedIn, async function (req, res, next) {
  let post = await usermodel.findOne({ _id:req.params.id }).populate("user")
  res.render("profile");
});


router.post("/post", isLoggedIn, async function (req, res, next) {
  let user = await usermodel.findOne({ email: req.user.email });
  let { content } = req.body;
  let post = await postmodel.create({
    user: user._id,
    content,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

router.post("/login", async function (req, res, next) {
  let { email, password } = req.body;
  let user = await usermodel.findOne({ email });
  if (!user) return res.send("something went wrong");
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user.id }, "secret");
      res.cookie("token", token);
      return res.redirect("/profile");
    } else res.send("you cannot login");
  });
});

router.get("/logout", function (req, res, next) {
  res.cookie("token", "");
  res.redirect("/login");
});

function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") {
    res.send("you must be logged in ");
  } else {
    let data = jwt.verify(req.cookies.token, "secret");
    req.user = data;
    next();
  }
}
// helllooooo
module.exports = router;
