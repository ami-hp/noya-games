$(document).ready(function() {
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    //PLUS & MINUS START
    $('body').on('change', '.input-pinus', function () {
        let countValue = $(this).val();
        if (countValue === "") {
            $(this).val('1');
        }
    });
    //PLUS & MINUS END
    //change count and total price of product in basket modal start
    $('body').on('change','input.input-pinus',function (event) {
        var count = event.target.value;
        var id = $(this).attr('data-bask-id');
        $("#loader").fadeToggle();
        $.ajax({
            url: baseUrl + 'shop/updateBasket.php',
            type: 'POST',
            data: {'count': count, 'id': id},
            success: function (data) {
                loadBasket();
                $('span#totalPrice').html(data + 'تومان');
                $("#loader").fadeToggle();
            }
        });
    });

    //change count and total price of product in basket modal end
    // search engine
    $('#gsearchsimple').on("keyup change",function () {
        var query = $('#gsearchsimple').val();

        $('#detail').html('');

        if (query.length == 2) {
            $.ajax({
                url: baseUrl + 'shop/addBasket.php',
                method: 'POST',
                data: {query: query},
                success: function (data) {
                    $('.list-group').css('display', 'block');
                    $('.search-trash').css('display', 'block');
                    $('.list-group').html(data);
                }
            });
        }
        if (query.length == 0) {
            $('.search-trash').css('display', 'none');
            $('.list-group').css('display', 'none');
        }
    });
    $('#localSearchSimple').jsLocalSearch({
        "mark_text": "si"
    });
    $('.search-trash').click(function () {
        $(this).css('display', 'none');
        $('.list-group').css('display', 'none');
        $('#gsearchsimple').val("");
    });

    //video.js START
    if($("#my-video").length > 0){
        var player = videojs('my-video', {
            controls: true,
            autoplay: false,
            preload: 'auto',
            userActions: {
                hotkeys: function(event) {
                    // `this` is the player in this context

                    // `x` key = pause
                    if (event.which === 88) {
                        this.pause();
                    }
                    // `y` key = play
                    if (event.which === 89) {
                        this.play();
                    }
                }
            }
        });
    }
    //video.js END

    //swiper.js START
    var swiper = new Swiper('.swiper-container', {
        slidesPerView:1,
        autoplay: {
            delay: 2500,
        },
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
        },
    });
    var swiperGameGallery = new Swiper('.swiper-game', {
        slidesPerView: 'auto',
        spaceBetween:10,
        centeredSlides: true,
        autoplay: {
            delay:1500,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false,
                autoplay: {
                    delay: 1500,
                },
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 30,
                centeredSlides: false,
                autoplay: {
                    delay: 1500,
                },
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    //swiper.js END
});


$(document).ready(function(){
    $("[data-english]").on("keypress",function (event) {
        // if ((event.charCode >= 48 && event.charCode <= 57) || // 0-9
        //     (event.charCode >= 65 && event.charCode <= 90) || // A-Z
        //     (event.charCode >= 97 && event.charCode <= 122)){  // a-z
        if ((event.charCode >= 1575 && event.charCode <= 1785)) { // persian char
            return false;
        } else {
            return true;
        }
    });


    var wowIndex = new WOW(
        {
            boxClass:     'wow',      // default
            animateClass: 'animated', // default
            offset:       0,          // default
            mobile:       true,       // default
            live:         true        // default
        });
    wowIndex.init();


    /*$('[data-target="mega"]').on("click", function (){

    });*/
    /*$("body").on("click", function (){
        $('.wowMega').attr("style","").css({"visibility": "hidden"}).removeClass("wowMega fadeInDown animated");
    });
    $("body [data-prevent]").on("click", function (event){
        event.stopPropagation();
    });*/
    /*$("a").click(function(e){
        var href = $(this).attr("href");
        if(href){
            e.preventDefault();
            $('#loader-paging').fadeIn(100);
            Turbolinks.visit(href , "change");
        }
    });*/
});
