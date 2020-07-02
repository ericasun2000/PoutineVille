const calculateTotalCost = function() {
  const total = function() {
    const InputArray = $(".quantity");
    let total = 0;
    for (const input of InputArray) {
      const price = Number($(input).attr("data-dish-price"));
      const quantity = Number($(input).val());
      total += price * quantity;
    }
    $("#total-cost").text(`$ ${total}`);

  };

  $(".plus").on("click",total);

  $(".minus").on("click",total);
};
