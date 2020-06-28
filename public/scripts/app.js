const submitOrder = function() {





  $('.order-form').on('submit', function(event) {
    event.preventDefault();


  })


  $.ajax({
    url: "/api/dishes/",
    method: "POST",
    data: order,
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  })
}

const getOrderInfo = function() {

}

$(document).ready(function() {
  loadDishes();
});

