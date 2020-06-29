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
    qs += 'RETURNING *';
    return db.query(qs).then(result => result.rows);

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
    return db.query(query).then(result => result.rows[0].telephone);
  };

  return {
    getDishes,
    addOrder,
    addDish,
    findNumber,
  };
};
