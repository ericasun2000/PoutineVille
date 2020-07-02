const express = require('express');
const router = express.Router();
const {sendSMS, sendSMSToOwner} = require('../helpers/sendSMS');

module.exports = ({ findNumber,addOrder,addDish,getOrderById,orderCompleted,uncompletedOrders }) => {

  router.post("/", (req, res) => {
    const {wantedDishes, phoneNumber} = req.body;
    addOrder(phoneNumber)
      .then(id => addDish(wantedDishes, id))
      .then(id =>  {
        res.send({message:"ok"});
        return getOrderById(id);
      })
      .then(order => sendSMSToOwner(order))
      .catch(() => res.status(500).send("An error occured"));
  });

  router.post("/status", (req, res) => {
    const {orderID, message,status} = req.body;
    if (status) {
      orderCompleted(orderID)
        .catch(() => res.status(500).send("An error occured"));
    }
    console.log(message);
    findNumber(orderID)
      .then(customer => {
        console.log('customer',customer);
        console.log('telephone ------' , customer.telephone);
        res.send({message:"ok"});
        sendSMS(customer.telephone, message);
      })
      .catch(() => res.status(500).send("An error occured"));
  });

  router.get("/uncompleted",(req,res) => {
    uncompletedOrders()
      .then(orders => res.json(orders));

  });

  return router;
};
