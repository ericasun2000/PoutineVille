$(() => {
    const headerBtn = $('.header-btn');

    headerBtn.click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#order-section").offset().top
        }, 2000);
    })
});