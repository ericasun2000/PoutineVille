/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = ({ getWidgets }) => {        // see users.js to do this
  router.get("/", (req, res) => {
    getWidgets()
      .then(widgets => {
        res.json({ widgets });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
