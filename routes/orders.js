const express = require('express');
const router = express.Router();
const {sendSMS} = require('./send_sms');


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

  router.post("/status", (req, res) => {
    const {orderID, message} = req.body;
    addOrder(phoneNumber)
      .then(id => addDish(wantedDishes, id))
      .then(order => {
        sendSMSToOwner(order);
      })
    // .then(res => sendSMS(phoneNumber, 'Order placed'))
      .catch(err => console.log(err));
  });

  return router;
}
