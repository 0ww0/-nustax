(function($, window, document, undefined) {
    'use strict';

    $(function() {
        /*-----------------------------------------------------------------------------
             Global
        -----------------------------------------------------------------------------*/
        /*
         * All codes that are global are meant to be left in an open scope
         * so that the rest of the codes in this JS file can reuse these
         * variables and functions.
         */

        var $win = $(window);


        //Navigation Bar Mobile Trigger
        (function() {

            var $hamburgerTriger = $('.js-hamburger-menu'),
                $menuNav = $('.js-menu-navigation'),
                $body = $('body');

            $hamburgerTriger.each(function(){

                var $this = $(this);

                $this.on('click', function(e){


                    if($this.is('.mobile-nav')){
                        $this.toggleClass('open');
                        $menuNav.toggleClass('open');
                        $body.toggleClass('noscroll');

                    }
                    e.preventDefault();

                });

            });

            $('ul.menu li a.nav-menu').on('click', function(e){
                $('.js-hamburger-menu').removeClass('open');
                $('.js-menu-navigation').removeClass('open');
                $body.removeClass('noscroll');
            });

        })();



        //Smooth Scrooling

        (function() {

            var $backTop = $('.js-back-to-top-head'),
                $backFixed = $('.js-back-to-top-fixed'),
                scrollDuration = 700;
                if ($backTop.length) {
                    var scrollTrigger = 200,
                    scrollEnd = 1400,
                    scrollAdd = 1420, // px
                    backToTop = function () {
                        var scrollTop = $(window).scrollTop();
                        if (  scrollTop > scrollTrigger ) {
                            $backTop.addClass('show');
                        } else {
                            $backTop.removeClass('show');
                        }
                    };
                    backToTop();
                    $(window).on('scroll', function () {
                        backToTop();
                    });
                }
                $backTop.on('click', function(e){
                    e.preventDefault();
                    $('body, html').animate({
                        scrollTop: 0,
                    }, scrollDuration

                    );

                });

            var $anchor = $('.js-anchor');

            $anchor.on('click', function(e){
                e.preventDefault();
                $('body, html').animate({
                    scrollTop:$("#contact").offset().top
                }, scrollDuration

                );
            });

        })();




        (function() {

            $("#js-contact-form").validate({
                rules: {
                    name: { required: true },
                    email: { required: true , email: true },
                    phone: { required: true, digits: true, minlength: 8, maxlength: 12 },
                },
                messages: {
                    name: "Please enter your Name",
                    email: "Please enter a valid Email",
                    phone: "Please enter your Phone Number",
                },
                errorPlacement: function (error, element) {
                    error.addClass("help-block");


                    // if (element.hasClass('multiselect')) {
                    //     error.insertAfter(element.parent());
                    // } else {
                    //     error.insertAfter(element);
                    // }
                },
                highlight: function(element, errorClass, validClass) {
                    $(element).parents(".show-error-wrapper").addClass("has-error").removeClass("has-success");
                },
                unhighlight: function(element, errorClass, validClass) {
                    $(element).parents(".show-error-wrapper").addClass("has-success").removeClass("has-error");
                }
            });
            $.validator.methods.email = function( value, element ) {
                return this.optional( element ) || /[a-z]+@[a-z]+\.[a-z]+/.test( value );
            }
            $("#js-contact-form").on('submit', function(e){
                e.preventDefault();


                var $form = $(this);
                if(!$form.valid()){
                    return;
                }
                $('button.submit').addClass('preload');

                $.ajax({
                    type: 'POST',
                    url: 'mailme.aspx',
                    data: $('#js-contact-form').serialize(),
                    success: function() {
                        $('.form-group').removeClass('has-success');
                        $('#js-contact-form')[0].reset();
                        $('button.submit').removeClass('preload');
                        $('.form-success').css('opacity','1');
                        setTimeout(function(){
                            $('.form-success').css('opacity','0');
                        },6000);
                    },
                    error: function(d) {
                        $('.form-group').addClass('has-error');
                        $('button.submit span').text('Submit');
                    }
                });
            });



        })();

        (function() {

            var c, currentScrollTop = 0,
            navbar = $('.brand-hero');

            $(window).scroll(function () {
                var a = $(window).scrollTop();
                var b = navbar.height() + 50;

                currentScrollTop = a;

                if (c < currentScrollTop && a > b + b) {
                        navbar.addClass("scrollUp");
                    } else if (c > currentScrollTop && !(a <= b)) {
                        navbar.removeClass("scrollUp");
                    }
                c = currentScrollTop;
            });

        })();

        (function() {
            window.sr = ScrollReveal({ distance: '40px', opacity: 0, scale: 1, easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)' , duration: 1000});
            if($(window).width() >= 550){
                sr.reveal('.js-img-delay-01',{ delay: 300 });
                sr.reveal('.js-img-delay-02',{ delay: 400 });
                sr.reveal('.js-img-delay-03',{ delay: 500 });
                sr.reveal('.js-img-delay-04',{ delay: 600 });
                sr.reveal('.js-img-delay-05',{ delay: 700 });
                sr.reveal('.js-txt-delay-01',{ delay: 350 });
                sr.reveal('.js-txt-delay-02',{ delay: 450 });
                sr.reveal('.js-txt-delay-03',{ delay: 550 });
                sr.reveal('.js-txt-delay-04',{ delay: 650 });
                sr.reveal('.js-txt-delay-05',{ delay: 750 });
            }
            if($(window).width() <= 999){
                sr.reveal('.js-reveal-up',{ origin: 'top' });
                sr.reveal('.js-reveal-left',{ origin: 'top' });
                sr.reveal('.js-reveal-right',{ origin: 'top' });
            } else{
                sr.reveal('.js-reveal-up',{ origin: 'top' });
                sr.reveal('.js-reveal-left',{ origin: 'left' });
                sr.reveal('.js-reveal-right',{ origin: 'right' });
            }
        })();

        (function() {
            function scroll_if_anchor(href) {
                href = typeof(href) == "string" ? href : $(this).attr("href");
                var fromTop = 114;
                if(href.indexOf("#about-us") == 0) {
                    var $target = $(href);
                    if($target.length) {
                        $('html, body').animate({ scrollTop: $target.offset().top - fromTop });
                        if(history && "pushState" in history) {
                            history.pushState({}, document.title, window.location.pathname + href);
                            return false;
                        }
                    }
                }
                if(href.indexOf("#") == 0) {
                    var $target = $(href);
                    if($target.length) {
                        $('html, body').animate({ scrollTop: $target.offset().top - 0 });
                        if(history && "pushState" in history) {
                            history.pushState({}, document.title, window.location.pathname + href);
                            return false;
                        }
                    }
                }
            }
            scroll_if_anchor(window.location.hash);
            $("body").on("click", "a",scroll_if_anchor);

            $(function() {
                $('.nav-menu').on('click', function(e){
                    e.preventDefault();
                });
            });
        })();
        (function() {
            lines();
            function lines(){
                $('.line').each(function(index, e){
                    var elm = $(e);
                    var elmInside = $(e).find('>div');
                    var direction = elm.data('direction');
                    var duration = elm.data('duration');
                    var delay = elm.data('delay');
                    var start = elm.data('start');
                    var top = elm.data('top');
                    var mov = elm.data('mov');
                    var width = elm.data('width');
                    var height = elm.data('height');


                    if (direction == 'left'){
                        var origin = 'right top 0px';
                        var to = 'left top 0px';
                        elm.css({
                            'right': start+'px',
                        });
                    }else{
                        var origin = 'left top 0px';
                        var to = 'right top 0px';
                        elm.css({
                            'left': start+'px',
                        });
                    }

                    elm.css({
                        'top': top+'px',
                    });

                    elmInside.css({
                        'width': width+'px',
                        'height': height+'px',
                        'background': elm.data('color'),
                        '-webkit-transform-origin': origin,
                        '-moz-transform-origin': origin,
                        '-ms-transform-origin': origin,
                        'transform-origin': origin,
                        'transform': 'scaleX(0)'
                        /*
                        '-webkit-transition': '-webkit-transform '+duration+'ms ease-in-out',
                        '-moz-transition': '-moz-transform '+duration+'ms ease-in-out',
                        '-ms-transition': '-ms-transform '+duration+'ms ease-in-out',
                        'transition': 'transform '+duration+'ms ease-in-out'
                        */

                    });

                    // Initial scale from 0 to 1
                    var scale = [1, 0];

                    function loop(){
                        // ANIM LINE
                        if (direction == 'left'){
                            elm.velocity({
                                'right': mov+'px',
                            },{
                                duration: (duration*2),
                                easing: "ease",
                                delay: delay,
                                complete: function(){
                                    elm.css({
                                        'right': start+'px',
                                    });
                                }
                            });
                        }else{
                            elm.velocity({
                                'left': mov+'px'
                            },{
                                duration: (duration*2),
                                easing: "ease",
                                delay: delay,
                                complete: function(){
                                    elm.css({
                                        'left': start+'px',
                                    });
                                }
                            });
                        }

                        // ANIM INSIDE LINE
                        elmInside.velocity({
                             scaleX:scale,
                        },{
                            duration: duration,
                            easing: "ease",
                            delay: delay,
                            complete: function() {
                                elmInside.css({
                                    'transform-origin': to,
                                    'transition':''
                                });
                                elmInside.velocity({
                                    scaleX: 0
                                },{
                                    duration: duration,
                                    easing: "ease",
                                    delay: 0,
                                    complete: function(){
                                        elmInside.css({
                                            'transform-origin': origin
                                        });
                                        scale = 1;
                                        loop();
                                    }
                                });
                            }
                        });
                    }
                    loop();

                });
            }

        })();

    });
})(jQuery, this, this.document);
