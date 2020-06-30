const express = require('express');
const router = express.Router();
const {sendSMS, sendSMSToOwner} = require('../helpers/sendSMS');

module.exports = ({ findNumber,addOrder,addDish,getOrderById }) => {

  router.post("/", (req, res) => {
    const {wantedDishes, phoneNumber} = req.body;
    addOrder(phoneNumber)
      .then(id => addDish(wantedDishes, id))
      .then(order => {
        res.send({message:"ok"});
        sendSMSToOwner(order);
        return order[0].order_id;
      })
      .then(id => getOrderById(id))
      .then(order => console.log(order))
      .catch(err => console.log(err));
  });

  router.post("/status", (req, res) => {
    const {orderID, message} = req.body;
    console.log(message);
    findNumber(orderID)
      .then(customer => {
        console.log('customer',customer);
        console.log('telephone ------' , customer.telephone);
        res.send({message:"ok"});
        sendSMS(customer.telephone, message);
      })
      .catch(err => console.log(err));
  });

  return router;
};
