const express = require("express");
const router = express.Router();


// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

// var User = require("../models/users.js");

// module.exports = function() {
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function (req, res) {
  res.json(req.user);
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function (req, res) {
  console.log(req.body);
  db.User.create({
    id: req.body.id,
    email: req.body.email,
    password: req.body.password,
  })
    .then(function (dbUser) {
      // res.redirect(307, "/api/login");
      res.json(dbUser);
      alert("You Have Signed Up!");
    })
    .catch(function (err) {
      // res.status(401).json(err);
      res.json(err);
    });
});

router.post("/api/artist-dash", function (req, res) {
  console.log(req.body);
  db.Artists.create({
    id: req.body.id,
    name: req.body.name,
    bio: req.body.bio,
    works: req.body.works
  })
    .then(function (dbUser) {
      // res.redirect(307, "/api/login");
      res.json(dbUser);
    })
    .catch(function (err) {
      // res.status(401).json(err);
      res.json(err);
    });
});

//Artist posts
router.post("/api/posts", function (req, res) {
  console.log(req.body);
  db.Post.create({
    title: req.body.title,
    body: req.body.body,
  })
    .then(function (dbUser) {
      // res.redirect(307, "/api/login");
      res.json(dbUser);
    })
    .catch(function (err) {
      // res.status(401).json(err);
      res.json(err);
    });
});

// Route for logging user out
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/login");
  alert("You Have Logged Out!");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function (req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  }
});
// };

module.exports = router;
