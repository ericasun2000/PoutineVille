/* eslint-disable no-undef */
const clearOrder = function() {
  const inputArray = $('.quantity');
  for (const input of inputArray) {
    $(input).val("0");
  }
  $("#total-cost").text("$0");
  $("#phone-number").val("");
};
