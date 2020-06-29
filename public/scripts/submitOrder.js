const submitOrder = function() {
  $('.order-form').on('submit', function(event) {
    event.preventDefault();
    console.log('hello');
    const orderObj = createOrderObj();

    if (!orderObj) {
      alert("empty");
    } else {
    $.ajax({
      url: "/orders",
      method: "POST",
      data: JSON.stringify(orderObj),
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    }).done(() => console.log('successful calling ajax POST'))
      .fail(err => console.log(err.message))
      .always(() => console.log("post request done"));
    }

  });
};

const getOrderInfo = function() {
  const inputArray = $('.quantity');

  const wantedDishes = [];
  for (let input of inputArray) {
    let dish = $(input);
    if (dish.val() !== '0') {
      const wantedDish = {
        id: parseInt(dish.attr('data-dish-id')),
        quantity: parseInt(dish.val()),
        price: parseInt(dish.attr('data-dish-price'))
      };
      wantedDishes.push(wantedDish);
    }
  }
  return wantedDishes;
};

const createOrderObj = function() {
  const wantedDishes = getOrderInfo();
  const phoneNumber = $('#phone-number').val();

  if (wantedDishes.length < 1) {
    return false;
  }

  return {
    wantedDishes,
    phoneNumber
  };
};
