require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;

const client = require('twilio')(accountSid, authToken);

const sendSMS = (phoneNumber, msg) => {
  client.messages
    .create({
      body: 'From Poutineville\n' + msg,
      from: process.env.TWILIO_NUMBER,
      to: phoneNumber
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err));
};

const sendSMSToOwner = (order) => {
  let msg = `From PoutineVille\n
    Order ID: ${order[0].order_id}

    Ordered Dishes:\n \n`;

  for (let dish of order) {
    msg += `${dish.name} x${dish.quantity}\n \n`;
  }
  msg += `\nPlease go online to specify when the order will be ready`;
  console.log(msg);
  sendSMS(process.env.TWILIO_OWNER, msg);
};


module.exports = { sendSMS, sendSMSToOwner };
