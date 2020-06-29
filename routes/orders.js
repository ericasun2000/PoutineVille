const express = require('express');
const router = express.Router();
const {sendSMS} = require('./send_sms');
const {sendSMSToOwner} = require('./sendSMSToOwner');


module.exports = ({ findNumber,addOrder,addDish }) => {

  router.post("/", (req, res) => {
    const {wantedDishes, phoneNumber} = req.body;
    addOrder(phoneNumber)
      .then(id => addDish(wantedDishes, id))
      .then(order => {
        sendSMSToOwner(order);
        console.log("adding order");
        res.send({message:"ok"});
      })
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
