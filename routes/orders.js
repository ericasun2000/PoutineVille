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
        sendSMS(customer.telephone, message);
      }).then(()=> {
        console.log('after sendSMS');
        res.send('ok');
      })
      .catch(err => console.log(err));
  });

  return router;
};
