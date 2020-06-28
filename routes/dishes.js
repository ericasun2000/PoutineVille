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
    console.log(req.body);
  //   const {dish_id, order_id, quantity, price} = req.body;
  //   addDish(dish_id, order_id, quantity, price)
  //     .then(dish => {
  //       console.log('inside ')
  //       res.json(dish);
  //     })
  //     .catch(err => console.log(err));
  });

  return router;
}
