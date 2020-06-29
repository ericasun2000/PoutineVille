const loadDishes = function() {
  $.ajax({
    method:"GET",
    url:"/dishes",
    dataType:"json"
  })
    .then((dishes)=>renderDishes(dishes));
};

const renderDishes = function(dishes) {
  for (const dish of dishes) {
    $(".row").append(createDishElement(dish));
  }
};

const createDishElement = function(dishElement) {
  const dish = `
    <div class='col-12 col-sm-6 col-md-4 col-lg-3 mb-5 align-item-center'>
                  <div class="card m-2" style="width: 18rem;">
                      <img src=${dishElement.image_url} class="card-img-top dish__image-url" alt=${dishElement.name}>
                      <div class="card-body text-center">
                          <h5 class="card-title dish__title">${dishElement.name}</h5>
                          <p class="card-text dish__description">${dishElement.description}</p>
                          <p class="dish__price">$ ${dishElement.price}</p>
                          <div class="def-number-input number-input safari_only mx-auto">
                              <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                                  class="minus"></button>
                              <input class="quantity" min="0" name="quantity" value="0" type="number" data-dish-id=${dishElement.id} data-dish-price=${dishElement.price}>
                              <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                              class="plus"></button>
                          </div>
                      </div>
                  </div>
              </div>`;
  return dish;
};
