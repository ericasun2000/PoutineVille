/* eslint-disable no-undef */

$(document).ready(function() {
  // postion notification top center of page
  toastr.options.positionClass = "toast-top-center";

  $("input[type='radio']").click(function() {
    if ($("#order-ready").is(":checked")) {
      $("#order-minutes").prop("disabled",true);
    } else {
      $("#order-minutes").prop("disabled",false);
    }

  });

  $(".owner-form").on("submit", function(event) {
    console.log('inside ajax post order---- hello');
    event.preventDefault();
    const orderID = Number($("#order-id").val());
    const message = createMessage();
    const status = $("#order-ready").is(":checked");
    console.log("status",status);

    $.ajax({
      url: "/orders/status",
      method: "POST",
      data: JSON.stringify({orderID,message,status}),
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    }).then(() => {
      toastr.success('Success');
      //clear all input after submission
      $("input[type='radio']").prop("checked",false);
      $("#order-id").val("");
      $("#order-minutes").val("");

    })
      .catch(() => toastr.error("An error occurred. Please submit again"));


    console.log("orderID",orderID);
    console.log("message",message);


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

