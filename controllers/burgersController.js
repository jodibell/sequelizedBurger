var express = require("express");

var router = express.Router();
var db = require("../models");
var burger = db.Burger;

// get route -> index
router.get("/", function (req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function (req, res) {
  // express callback response by calling burger.selectAllBurger
  burger.findAll().then(burgerData => {
    res.render("index", { burger_data: burgerData });
  });
  // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
});

// post route -> back to index
router.post("/burgers/create", function (req, res) {
  // takes the request object using it as input for burger.addBurger
  burger.create(req.body).then(function (result) {
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle
    res.redirect("/");
  });
});

// put route -> back to index
router.put("/burgers/:id", function (req, res) {
  burger.update({devoured:1}, { where: { id: req.params.id } }, function (result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.send(result);
  });
});

module.exports = router;
