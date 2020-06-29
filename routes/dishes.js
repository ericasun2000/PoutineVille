const express = require('express');
const router = express.Router();


module.exports = ({ getDishes}) => {
  router.get("/", (req, res) => {
    getDishes()
      .then(dishes => {
        res.json(dishes);
      })
      .catch(err => {
        res.status(500).json({error: err.message});
      });
  });

  return router;
};


