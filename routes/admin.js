const express = require('express');
const router = express.Router();
const path = require('path');

module.exports = () => {
  router.get("/", (req, res) => {
    //if has cookie
    if (req.session.isAuthenticated) {
      res.render("admin");
      res.sendFile(path.join(__dirname + '/../views/owner.html'));

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

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect('/admin');
  });


  return router;
};

