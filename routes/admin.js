const express = require('express');
const router = express.Router();
const path = require('path');

module.exports = ({ getOrderedDishes, getSalesByMonths }) => {
  router.get("/", (req, res) => {
    //if has cookie
    if (req.session.isAuthenticated) {
      res.render("admin-order-status");


    } else {
      res.render("adminLogin");


    }

  });

  router.post("/", (req, res) => {
    // check inputed password
    if (req.body.password === "1234") {
      req.session.isAuthenticated = true;
      res.render("admin-order-status");
    } else {
      res.render("adminlogin");
    }
  });

  router.get("/analytics", (req, res) => {
    if (req.session.isAuthenticated) {
      res.render("analytics");
    } else {
      res.redirect("/admin");

    }
  });

  router.get("/analytics/overall_sales", (req, res) => {
    if (req.session.isAuthenticated) {
      getOrderedDishes()
        .then(totalOrderedDishes => res.json(totalOrderedDishes))
        .catch(err => res.status(500).json({ error: err.message })
        )
    } else {
      res.status(401).json({ error: 'You do not have permission to access this.' })
    }

  });

  router.get("/analytics/sales_by_months", (req, res) => {
    if (req.session.isAuthenticated) {
      getSalesByMonths()
        .then(totalOrderedDishes => res.json(totalOrderedDishes))
        .catch(err => res.status(500).json({ error: err.message })
        )
    } else {
      res.status(401).json({ error: 'You do not have permission to access this.' })
    }

  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect('/admin');
  });


  return router;
};

