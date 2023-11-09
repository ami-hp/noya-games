//------------------------statics----------------------------//
var baseUrl = location.origin + "/";
$(document).ready(function () {

    setTimeout(function (){
        $('#loader-opening').fadeOut(1500);
    },1500);

    $('#loader-paging').fadeOut(500);

    var pageHeight = $(window).height();
    var pageWidth = $(window).width();
    var ajax;
    var interval;
    ////////////////////////////////////Functions//////////////////////////////////
    function countdown() {
        clearInterval(interval);
        interval = setInterval( function() {
            var timer = $('.js-timeout').html();
            timer = timer.split(':');
            var minutes = timer[0];
            var seconds = timer[1];
            seconds -= 1;
            if (minutes < 0) return;
            else if (seconds < 0 && minutes != 0) {
                minutes -= 1;
                seconds = 59;
            }
            else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

            $('.js-timeout').html(minutes + ':' + seconds);

            if (minutes == 0 && seconds == 0){
                clearInterval(interval);
                // alert("2 min over");
                $('#try').css('display' , 'none');
                $('#try_verify').css('display' , 'unset');
                // $('.kh_btn').attr('id' , 'try_verify');
            }
        }, 1000);
    }
    function getMaxHeight(selector, height) {
        $(selector).css({"max-height": pageHeight - height + "px"});
    }
    function getMinHeight(selector, height) {
        $(selector).css({"min-height": pageHeight - height + "px"});
    }
    function getMaxWidth(selector, width) {
        $(selector).css({"max-width": pageWidth - width + "px"});
    }
    function getMinWidth(selector, width) {
        $(selector).css({"min-width": pageWidth - width + "px"});
    }
    function replaceClass(selector , currentClass , newClass) {
        $(selector).toggleClass(currentClass).toggleClass(newClass);
    }
    function loaderToggle(selector){
        $(selector).fadeToggle();
    }
    function targetClass(value , myClass){
        $('body').on("click" , '[data-target="' + value + '"]' , function (){
            $('[data-toggle="' + value + '"]').toggleClass(myClass);
        });
    }


    function isset(selector){
        if ($(selector)[0]){
            return true;
        } else {
            return false;
        }
    }
    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    function trimWords(selector){//change number of words depending on width in the category blog page
        var maxLength;
        if(pageWidth > 1000 || pageWidth >= 400 && pageWidth < 768){
            maxLength = 90 // maximum number of characters to extract
        }
        else if (pageWidth >= 768 && pageWidth < 1000){
            maxLength = 50
        }
        else if (pageWidth < 400){
            maxLength = 30
        }
        /*else if (pageWidth >= 1279){
            maxLength = 400
        }*/
        $(selector).each(function () {
            var trimmedStringOriginal = $(this).html().trim();

            //trim the string to the maximum length
            var trimmedString = trimmedStringOriginal.substr(0, maxLength);
            //re-trim if we are in the middle of a word
            trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

            $(this).html(trimmedString + "...");
        });
    }

    (function (){//lightbox
        $(".-ami-gal-thumb , .-ami-gal-big").on("click" , function (){
            $(".-ami-gal-big").toggleClass("visible");
            var src = $(this).attr("src");
            if(src){
                $(".-ami-gal-big img").attr("src" , src);
            }
        });
    })();

    function trimLongWords(selector){//change number of words depending on width in the category blog page
        var maxLength;
        if(pageWidth < 768){
            maxLength = 150; // maximum number of characters to extract
        }
        else if(pageWidth >= 768 && pageWidth < 992){
            maxLength = 257;
        }
        else{
            maxLength = 395;
        }

        $(selector).each(function () {
            var trimmedStringOriginal = $(this).html().trim();

            //trim the string to the maximum length
            var trimmedString = trimmedStringOriginal.substr(0, maxLength);
            //re-trim if we are in the middle of a word
            trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

            $(this).html(trimmedString + "...");
        });
    }
    function loadAddress(){
        $.ajax({
            url: baseUrl + 'shop/addBasket.php',
            type: 'GET',
            data: {"loadAdrress": "temp"},
            success: function (data) {
                $('#loadaddress').html(data);
                $('#loadaddress').find('label').remove();
                $('#loadaddress').find('[data-type="1"]').remove();
                $('#loadStoreAddress').html(data);
                $('#loadStoreAddress').find('label').remove();
                $('#loadStoreAddress').find('[data-type="0"]').remove();
                $('#checkAddress').html(data);
                $('#checkAddress').find('.editadd,.deladd').remove();
                $('#checkAddress').find('.list-style-fake').remove();
            }
        });
    }


    ////////////////////////////////////Events////////////////////////////////////////

    $(".window").height($(window).height());
    $(".min-window").css("min-height" , $(window).height());
    trimLongWords(".trimBig");

    $(window).resize(function (){
        pageHeight = $(window).height();
        pageWidth = $(window).width();

        $(".window").height($(window).height());
        $(".min-window").css("min-height" , $(window).height());
    });

    $("#phoneNumber").on("input", function() {
        if (/^0/.test(this.value)) {
            this.value = this.value.replace(/^0/, "");
        }
    });
    var x = window.matchMedia("(max-width: 700px)");
    if (x.matches) { // If media query matches
        if (isset('.setOffer')){
            $('.setOffer').closest('.fourBox').find('.prPrice').css('bottom','20px');
        }
    }

    $("[data-abort='spinner']").click(function () {
        ajax.abort();
        $("#loader").fadeToggle();
    });

    ////////////////////////////////////AJAX////////////////////////////////////////
    function loadBasket() {
        var load = 'start';
        $.ajax({
            url: baseUrl + 'shop/addBasket.php',
            type: 'POST',
            data: {'load': load},
            success: function (data) {
                $('.basketItems').html(data);
            }
        });
    }
    $('#updateUserForm').on('submit',function (event) {
        event.preventDefault();
        var form = $('#updateUserForm');
        var url = baseUrl + 'shop/addBasket.php';
        $("#loader").fadeToggle();
        ajax = $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(),
            success: function (data) {
                alert(data);
                $("#loader").fadeToggle();
            }
        });
    });

    $('[data-target="rand"]').click(function(){
        $('[data-toggle="mobile"]').fadeOut(500);
        setTimeout(function () {
            $('[data-toggle="rand"]').fadeIn();
        },500);
    });
    $('[data-target="mobile"]').click(function(){
        $('[data-toggle="rand"]').fadeOut(500);
        setTimeout(function () {
            $('[data-toggle="mobile"]').fadeIn();
        },500);
    });

    /*$('.sendCode').click(function () {
        var mobile =$('#phoneNumber').val();
        for(var i=0;i<=mobile.length;i++){
            mobile = mobile.replace("-","");
            mobile = mobile.replace("_","");
        }
        if(mobile.length === 10){
            $("#loader").fadeToggle();
            ajax = $.ajax({
                url: baseUrl + 'shop/addBasket.php',
                type: 'POST',
                data: {'mobile': mobile},
                success: function (data) {
                    $('span#codeTarget').html(data);
                    loadBasket();
                    $('.sendBox').fadeOut(500);
                    setTimeout(function () {
                        $('.getBox').fadeIn(500);
                    },500);
                    $("#loader").fadeToggle();
                    $('.js-timeout').text("2:00");
                    countdown();
                }
            });
        }else{
            alert("شماره ی وارد شده باید 10 رقمی باشد.");
        }
    });
    $('#try_verify').on('click', function () {
        var mobile = $("input[name='mobile']").val();
        //$("#loader").fadeToggle();
        ajax = $.ajax({
            url: baseUrl + 'shop/addBasket.php',
            type: 'POST',
            data: {"mobile": mobile},
            success: function (data) {
                //$("#loader").fadeToggle();
                $('#codeTarget').html(data);
                //counter
                $('#try_verify').css('display' , 'none');
                $('#try').css('display' , 'unset');
                $('.js-timeout').text("2:00");
                clearInterval(interval);
                countdown();
            }
        });
    });
    $('#tryLog').click(function () {
        var rand =  $('#validate').val();
        $("#loader").fadeToggle();
        ajax = $.ajax({
            url: baseUrl + 'shop/addBasket.php',
            type: 'POST',
            data: {'rand': rand},
            success: function (data) {
                var result = $.trim(data);
                if(result === '2'){
                    alert('خوش آمدید.');
                    location.reload();
                }else if(result === '1'){
                    $("#loader").fadeToggle();
                    //alert(data);
                    $("div.timer").html('<div class="alert alert-warning text-center" role="alert" dir=\'rtl\'>امکان ورود به شما داده نشده است.</div>');
                }
                else if(result === '3'){
                    $("#loader").fadeToggle();
                    //alert(data);
                    $("div.timer").html('<div class="alert alert-warning text-center" role="alert" dir=\'rtl\'>کد شما منقضی شده است مجدد سعی کنید.</div>');
                }
                else{
                    alert('کد وارد شده اشتباه است.');
                    $("#loader").fadeToggle();
                    var counter = 0;
                    var interval = setInterval(function() {
                        counter++;
                        // Display 'counter' wherever you want to display it.
                        if (counter == 120) {
                            // Display a login box
                            $("div.timer").html('<span class="text-danger">وقت شما به پایان رسیده است.</span>');
                            clearInterval(interval);
                        }
                    }, 1000);
                }

            }
        });
    });*/

    /////////////////////////////////////ACTIVE/////////////////////////////////////

    //checkout
    // check out step form start
    $('#email').change(function () {
        var valEmail = $(this).val();
        var valid = isEmail(valEmail);
        if (valid || valEmail == "") {
            $('button.nextStep').prop("disabled", false);
        } else {
            $('button.nextStep').attr("disabled", "disabled");
            alert('فرمت ایمیل نامعتبر');
        }
    });
    $('button.nextStep').click(function () {
        var zero = 0;
        var valid = $(this).closest('.box').find('.req:invalid').val();

        if (valid === "" || valid === 'on') {
            zero = 1;
        }
        if (zero === 0) {
            $(this).closest('.box').toggleClass('hide');
            $(this).closest('.box').next().toggleClass('hide');
        } else {
            alert('Please fill the required field');
        }
    });
    $('button.prevStep').click(function () {
        $(this).closest('.box').toggleClass('hide');
        $(this).closest('.box').prev().toggleClass('hide');
    });


    $('[data-target="search"]').click(function () {
        $("section[class*='active']:not('.searchThat'):not('.searchThat'),div[class*='active']").removeClass(function (index, css) {
            return (css.match(/(^|\s)active\S+/g) || []).join(' ');
        });
        $('.searchThat').toggleClass('activeFade');
    });
    $('#search').click(function () {
        $('.searchInput').toggleClass('activeSearch');
    });
    $('#search .searchInput').click(function (event) {
        event.stopPropagation();
    });


    $(document).on("click" , '[data-target="menu"]' , function (){

        $('[data-toggle="menu"]').toggleClass("active--aside");
    });

    $('[data-collapse-next]').click(function (){
        $(this).next().slideToggle();
    });


    //data-close //data-bait //data-hunt //data-gun //data-shot
    $('[data-close]').click(function (){
        var attr = $(this).data("close");
        $(this).closest("[data-bait='" + attr + "']").removeClass(function (index, css) {
            return (css.match(/(^|\s)active\S+/g) || []).join(' ');
        });
    });

    $('[data-hunt]').click(function (){
        var hunt = $(this).data("hunt");
        var gun = $(this).data("gun");

        $(document).find("[class*='active']:not([data-bait='" + hunt + "'])").removeClass(function (index, css) {
            return (css.match(/(^|\s)active\S+/g) || []).join(' ');
        });

        $(document).find("[data-bait='" + hunt + "']").toggleClass("active-" + gun);
    });

    $('[data-close] [data-prevent]').click(function (event) {
        event.stopPropagation();
    });

    /*$('[data-bait]').click(function () {
        $('.searchInput').toggleClass('activeSearch');
    });*/


//------------------------dynamics---------------------------//
});