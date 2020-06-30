$(() => {
    const backToTopBtn = $('#back-to-top-btn');

    backToTopBtn.click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: 0
        }, 1500);
    });
});