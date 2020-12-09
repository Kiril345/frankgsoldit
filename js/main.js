wow = new WOW(
    {
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       0,          // default
    mobile:       true,       // default
    live:         true        // default
}
)



$('.explain-row').hover(function() {
    $('.explain-row').toggleClass('active');
});
$('.explain-row-2').hover(function() {
    $('.explain-row-2').toggleClass('active');
});
$('.explain-row-3').hover(function() {
    $('.explain-row-3').toggleClass('active');
});




new WOW().init();