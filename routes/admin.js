const express = require('express');
const router = express.Router();


module.exports = () => {
  router.get("/", (req, res) => {
    const adminId = req.session["admin-id"];
    if (adminId) {
      res.redirect('/admin');
    } else {
      res.redirect('/login');
    }
  });

  router.get("/login",(req,res) => {
    const adminId = req.session["admin-id"];
    if (adminId) {
      res.redirect("/admin");
    } else {
      res.send("/login");
    }

  });

  router.post("/login",(req,res) => {
    const adminUserName = "admin";
    const adminPassword = "admin";
    if (req.body.username = adminUserName && req.body.password = adminPassword) {
      res.send("/admin");
    } else {
      res.status(403);
      res.send('Error !!! Either the username or password is wrong. Please try again');
    }
  }




  return router;
};
