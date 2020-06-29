const express = require('express');
const router = express.Router();
const {sendSMS} = require('./send_sms');


module.exports = ({ findNumber }) => {

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
