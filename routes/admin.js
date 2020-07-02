const express = require('express');
const router = express.Router();
const path = require('path');

module.exports = ({ getOrderedDishes }) => {
  router.get("/", (req, res) => {
    //if has cookie
    if (req.session.isAuthenticated) {
      res.render("admin");
      // res.sendFile(path.join(__dirname + '/../views/owner.html'));

    } else {
      res.render("adminLogin");


    }

  });

  router.post("/", (req, res) => {
    // check inputed password
    if (req.body.password === "1234") {
      req.session.isAuthenticated = true;
      res.render("admin");
    } else {
      res.render("adminlogin");
    }
  });

  router.get("/analysis/overallsales", (req, res) => {
    if (req.session.isAuthenticated) {
      getOrderedDishes()
        .then(totalOrderedDishes => res.json(totalOrderedDishes))
        .catch(err => res.status(500).json({ error: err.message })
        )
    } else {
      res.status(401).json({ error: 'You do not have permission to access this.' })
    }

  });

  router.get("/analytics", (req, res) => {
    if (req.session.isAuthenticated) {
      res.render("analytics");
    } else {
      res.redirect("/admin");

    }
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect('/admin');
  });


  return router;
};

