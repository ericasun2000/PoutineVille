module.exports = db => {
    const getDishes = () => {
      const query = {
        text: `SELECT * FROM dishes`,
      };

      return db.query(query).then(result => result.rows);
    };

    const addDish = (wantedDishes, orderId) => {
      // const queryStr = 'INSERT INTO ordered_dishes(dish_id, order_id, quantity, price) VALUES ';
      wantedDishes.forEach(wantedDish => {
        let queryStr = `INSERT INTO ordered_dishes(dish_id, order_id, quantity, price) VALUES (${wantedDish.id}, ${orderId}, ${wantedDish.quantity}, ${wantedDishes.price}) RETURNINIG *`;
        return db.query(queryStr).then(result => result.rows);
      })
      // queryStr += 'RETURNINIG *';

    }

    const addOrder = (phoneNumber) => {
      const query = {
        text: `INSERT INTO orders(telephone) VALUES ($1) RETURNING id`,
        values: [phoneNumber]
      };
      return db.query(query).then(result => result.rows[0].id);
    }

    return {
        getDishes,
        addOrder,
        addDish,
    };
};
