require('dotenv').config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;

const client = require('twilio')(accountSid, authToken);

const sendSMS = (phoneNumber, msg) => {
  console.log('phoneNumber inside sendSMS -----', phoneNumber);

  client.messages
    .create({
      body: msg,
      from: process.env.TWILIO_NUMBER,
      to: phoneNumber
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err));
};

module.exports = {sendSMS};