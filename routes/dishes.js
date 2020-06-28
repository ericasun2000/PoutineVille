const express = require('express');
const router = express.Router();

module.exports = ({ getDishes, addDish }) => {
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
    const {dish_id, order_id, quantity, price} = req.body;
    addDish(dish_id, order_id, quantity, price)
      .then(dish => {
        res.json(dish);
      })
      .catch(err => console.log(err));
  });

  return router;
}
