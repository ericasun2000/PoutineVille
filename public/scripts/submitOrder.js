const submitOrder = function() {
    $('.order-form').on('submit', function(event) {
      event.preventDefault();
      console.log('hello');

      $.ajax({
        url: "/api/dishes",
        method: "POST",
        data: JSON.stringify(createOrderObj()),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      }).then(() => console.log('successful calling ajax POST'));

    });
  }

  const getOrderInfo = function() {
    const inputArray = $('.quantity');

    const wantedDishes = [];
    for(let input of inputArray) {
      let dish = $(input);
      if(dish.val() !== '0') {
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

    return {
      wantedDishes,
      phoneNumber
    };
  }
