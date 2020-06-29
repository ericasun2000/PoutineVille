
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

    $.ajax({
      url: "/orders/status",
      method: "POST",
      data: JSON.stringify({orderID,message}),
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    }).then(() => console.log('successful calling ajax POST'));


    console.log("orderID",orderID);
    console.log("message",message);
    //clear all input after submission
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

