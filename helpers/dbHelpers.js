const orders = require("../routes/orders");

module.exports = db => {
  const getDishes = () => {
    const query = {
      text: `SELECT * FROM dishes ORDER BY id`,
    };

    return db.query(query).then(result => result.rows);
  };

  const getDish = (dishId) => {
    const query = {
      text:  `SELECT * FROM dishes WHERE id = $1`,
      values: [dishId]
    }

    return db.query(query).then(result => result.rows[0]);
  }

  const addDish = (wantedDishes, orderId) => {
    let qs = 'INSERT INTO ordered_dishes(dish_id, order_id, quantity, price) VALUES ';
    for (let i = 0; i < wantedDishes.length; i++) {
      // last item
      if (i === wantedDishes.length - 1) {
        qs += `(${wantedDishes[i].id}, ${orderId}, ${wantedDishes[i].quantity}, ${wantedDishes[i].price}) `;
      } else {
        qs += `(${wantedDishes[i].id}, ${orderId}, ${wantedDishes[i].quantity}, ${wantedDishes[i].price}), `;
      }
    }
    // qs += 'RETURNING order_id';
    return db.query(qs).then(() => orderId);
  };

  const deleteDish = (dishId) => {
    const query = {
      text: `DELETE FROM dishes WHERE id = ${dishId}`
    };
    return db.query(query).then(console.log("deleted"));
  }

  const getOrderById = (orderId) => {
    console.log("inside get order id :",orderId);
    const query = {
      text:`SELECT order_id,name,quantity  FROM ordered_dishes JOIN dishes ON dishes.id = dish_id  WHERE order_id = $1`,
      values:[orderId]
    };
    return db.query(query).then(result =>  result.rows).catch(err => err);
  };

  const addOrder = (phoneNumber) => {
    const query = {
      text: `INSERT INTO orders(telephone) VALUES ($1) RETURNING id`,
      values: [phoneNumber]
    };
    return db.query(query).then(result => result.rows[0].id);
  };

  const findNumber = (orderId) => {
    const query = {
      text: `SELECT telephone FROM orders WHERE id = $1`,
      values: [orderId]
    };
    return db.query(query).then(result => result.rows[0]);
  };

  const updateDish = (dishId, updatedDish) => {
    const query = {
      text: `
      UPDATE dishes
      SET name = $1, description = $2,  price = $3, image_url = $4
      WHERE id = $5`,
      values:[updatedDish.name, updatedDish.description, updatedDish.price, updatedDish.image_url, dishId]
    };
    return db.query(query).then(console.log("updated"));
  }

  return {
    getDishes,
    getDish,
    addOrder,
    addDish,
    deleteDish,
    findNumber,
    getOrderById,
    updateDish
  };
};
