module.exports = db => {
    const getUsers = () => {
        const query = {
            text: `SELECT * FROM users;`,
        };

        return db.query(query).then(result => result.rows);
    };

    const addUser = (name, email, password) => {
        const query = {
            text: "INSERT INTO users(name) VALUES ($1) RETURNING *",
            values: [name],
        };

        return db.query(query).then(result => result.rows);
    };

    const getWidgets = () => {
      const query = {
        text: `SELECT * FROM widgets`,
      };

      return db.query(query).then(result => result.rows);
    };

    const getDishes = () => {
      const query = {
        text: `SELECT * FROM dishes`,
      };

      return db.query(query).then(result => result.rows);
    };

    const addDish = (dish_id, order_id, quantity, price) => {
      const query = {
        text: `INSERT INTO ordered_dishes(dish_id, order_id, quantity, price) VALUES (dish_id, order_id, quantity, price) RETURNING *`,
      };
      return db.query(query).then(result => result.rows);
    }

    return {
        getUsers,
        addUser,
        getWidgets,
        getDishes,
        addDish
    };
};
