
$(document).ready(function() {

  $("input[type='radio']").click(function() {
    if ($("#order-ready").is(":checked")) {
      $("#order-minutes").prop("disabled",true);
    } else {
      $("#order-minutes").prop("disabled",false);
    }

  });

  $("form").on("submit", function(event) {
    event.preventDefault();
    const orderID = Number($("#order-id").val());
    const message = createMessage();


    console.log("orderID",orderID);
    console.log("message",message);
    $("input[type='radio']").prop("checked",false);
    $("#order-id").val("");
    $("#order-minutes").val("");


  });

  const createMessage = function() {
    if ($("#order-ready").is(":checked")) {
      return  "Your order is ready";
    } else {
      const minutes = $("#order-minutes").val();
      return `Your order will be ready in ${minutes} minutes`;
    }
  };
});

