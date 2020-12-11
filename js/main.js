(function($) {
    $.fn.isOnScreen = function(){
        var win = $(window);
        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();
    
        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
    
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };
    
    function howDoesAnimation(){
        $('.hw-explain.reasons-animation').each(function(){
            $(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
            function(e) {
            $(this).addClass('animation-done');
                if($(this).hasClass('first')){
                $("<style type='text/css'> .how-work .hw-number.animate.second:before{ opacity:1;} </style>").appendTo("head");
                }
                if($(this).hasClass('fourth')){
                $("<style type='text/css'> .how-work .hw-number.third:after{ opacity:1;} </style>").appendTo("head");
                }
            });
        });
        $('.hw-number.reasons-animation p').each(function(){
        $(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
            function(e) {
            $(this).closest('.hw-number').addClass('animation-done');
                if($(this).closest('.hw-number').hasClass('second')){
                $("<style type='text/css'> .how-work .hw-number.second:after{ opacity:1;} </style>").appendTo("head");
                }
                if($(this).closest('.hw-number').hasClass('third')){
                $("<style type='text/css'> .how-work .hw-number.third:before{ opacity:1;} </style>").appendTo("head");
                }
                if($(this).closest('.hw-number').hasClass('fifth')){
                $("<style type='text/css'> .how-work .hw-number.fifth:before{ opacity:1;} </style>").appendTo("head");
                }
            });
        });
        $('.reasons-animation').addClass('animate'); 
    }
    
    $(document).ready(function() {
        $('.how-work .explain-row > div').hover(function(){
            $('.how-work .explain-row.active').removeClass('active');
            $($(this)).closest('.explain-row').addClass('active');
        });
        $(window).scroll(function(){
            if ($('.features-columns').isOnScreen() && $('.features-columns .count-done').length < 1) { 
                $('.counter').each(function() {
                    var $this = $(this);
                    var countTo = $this.attr('data-total');
                    $({ countNum: $this.text()}).animate({
                        countNum: countTo
                    },
                    {
                        duration: 1000,
                        easing:'linear',
                        step: function() {
                                $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                                $this.text(this.countNum);
                                $this.addClass('count-done');
                        }
                    });  
                });
            }
            if ($('.why-use > .container .content-row').isOnScreen() && $('.why-use > .container .content-row .reason-item.show-reason').length < 1){
                $('.why-use > .container .content-row .reason-item').each(function(index){
                    var that = this;
                    var t = setTimeout(function() { 
                            $(that).addClass("show-reason"); 
                    }, 500 * index);   
                });
            }
            if ($('.how-work .container .row:nth-child(2)').isOnScreen() && $('.how-work.animated').length < 1) {
                howDoesAnimation();
            }
        });  
    }); //End of jQuery UI-specific functions
})(jQuery);
    