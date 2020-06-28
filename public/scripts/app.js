$(document).ready(function() {

  const loadDishes = function() {
    $.ajax({
      method:"GET",
      url:"/api/dishes",
      dataType:"json"
    })
      .then((data)=>renderDishes(data));


  };

  loadDishes();

});
