const renderDishes = function(dishesJSON) {
  for (const dish of dishesJSON.dishes) {
    console.log(dish);
    $("# row m-3").append(createDishElement(dish));
  }
};
