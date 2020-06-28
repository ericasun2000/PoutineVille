const { sendSMS } = require("./send_sms");

const sendSMSToOwner = (order) => {
    let msg = `From PoutineVille\n
    Order ID: ${order[0].order_id}

    Ordered Dishes:\n`;

    for(let dish of order) {
        msg += `Dish Id: ${dish.dish_id} --> Quantity: ${dish.quantity}\n`;
    }

    msg += `\nPlease reply with how long this order will take.`

    console.log(msg);


  sendSMS(process.env.TWILIO_OWNER, msg);

}

module.exports = { sendSMSToOwner };

