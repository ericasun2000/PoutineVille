const express = require('express');
const router = express.Router();
const {sendSMS} = require('./send_sms');


module.exports = ({ findNumber }) => {

  router.post("/status", (req, res) => {
    const {orderID, message} = req.body;
    findNumber(orderID)
      .then(telephone => sendSMS(telephone,message))
      .catch(err => console.log(err));
  });

  return router;
};
