const express = require('express');
const router = express.Router();

module.exports = ({ getDishes, addDish, addOrder }) => {
  router.get("/", (req, res) => {
    getDishes()
      .then(dishes => {
        res.json(dishes);
      })
      .catch(err => {
        res.status(500).json({error: err.message});
      });
  });

  router.post("/", (req, res) => {
    const {wantedDishes, phoneNumber} = req.body;
    addOrder(phoneNumber)
    .then(id => addDish(wantedDishes, id))
    .then(res => console.log('hereee', res))
    .catch(err => console.log(err));
  });

  return router;
}
