const orders = require("../routes/orders");

module.exports = db => {
  const getDishes = () => {
    const query = {
      text: `SELECT * FROM dishes`,
    };

    return db.query(query).then(result => result.rows);
  };

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

  const getOrderById = (orderId) => {
    console.log("inside get order id :", orderId);
    const query = {
      text: `SELECT order_id,name,quantity  FROM ordered_dishes JOIN dishes ON dishes.id = dish_id  WHERE order_id = $1`,
      values: [orderId]
    };
    return db.query(query).then(result => result.rows).catch(err => err);
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

  const getOrderedDishes = () => {
    const query = {
      text: `
      SELECT dishes.id, dishes.name, SUM(ordered_dishes.quantity) as sum
      FROM ordered_dishes
      JOIN dishes ON ordered_dishes.dish_id = dishes.id
      GROUP BY dishes.id, dishes.name
      ORDER BY sum;
      `,
    };

    return db.query(query).then(result => result.rows);
  };

  const getSalesByMonths = () => {
    const query = {
      text: `
      SELECT date_trunc('month', orders.submitted_at) AS month, sum(ordered_dishes.quantity)
      FROM ordered_dishes
      JOIN orders ON orders.id = ordered_dishes.order_id
      GROUP BY date_trunc('month', orders.submitted_at)
      ORDER BY month;
      `,
    };

    return db.query(query).then(result => result.rows);
  };



  const orderCompleted =(orderId) => {
    const query = {
      text: `UPDATE  orders SET completed_at = NOW() WHERE id=$1`,
      values: [orderId]
    };
    return db.query(query);

  };

  const uncompletedOrders = () => {
    const query =" SELECT id FROM orders WHERE completed_at IS NULL";
    return db.query(query).then(results => results.rows);
  };

  return {
    getDishes,
    addOrder,
    addDish,
    findNumber,
    getOrderById,
    getOrderedDishes,
    getSalesByMonths,
    orderCompleted,
    uncompletedOrders
  };
};
