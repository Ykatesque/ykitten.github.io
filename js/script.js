//preloading images for use as bg on 'Ykat' h1 text

function preload(arrayOfImages) {
    console.log("(pre)loading " + arrayOfImages.length + " images");
    $(arrayOfImages).each(function () {
        $('<img/>')[0].src = this;
        console.log("loaded: " + this);
    });
}


preload([
    '1.png',
    '2.png',
    '3.png'
]);


//fade in different texture bgs on Ykat logotype
var scrollSpeed = 2000;
var currentImage = 1;
var stickyNavTop = $('.nav').offset().top;
var debounceTimer = null;
var imageLoopTimer = null;

function nextImage(currentImage) {
    currentImage = (currentImage + 1);
    if (currentImage == 4) currentImage = 1;
    console.log(currentImage);
    $('.display-sweet-image-behind').fadeTo(90, 0.65, function () {
        $(this).css("background-image", "url(" + currentImage + ".png)", "opacity", "0.95").fadeTo(90, 1.0);
    });

    return currentImage;

}

var stickyNav = function () {
    if ($(window).scrollTop() > stickyNavTop) {
        $('#menu').css("text-align", "right");
        $('.nav').addClass('sticky');
    } else {
        $('.nav').removeClass('sticky');
        $('#menu').css("text-align", "right");
    }
};

var startImageLooping = function() {
    console.log("starting image loop timer...");
    imageLoopTimer = setInterval(function () {
      currentImage = nextImage(currentImage);
    }, scrollSpeed);
}


var endImageLooping = function() {
    console.log("stopping image loop timer...");
    clearInterval(imageLoopTimer);
    imageLoopTimer = null;
}

$(document).ready(function () {

    stickyNav();

    $(window).scroll(function(){
        if(debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(function(){

            // set up the sticky nav class...
            stickyNav();

            // turn off the interval timer if it's not visible...
            var $myElt = $('.fancy_title'); // whatever element you want to check
            var $window = $(window); // the window jQuery element
            var myTop = $myElt.offset().top; // the top (y) location of your element
            var windowTop = $window.scrollTop(); // the top of the window
            var windowBottom = windowTop + $window.height(); // the bottom of the window
                startImageLooping();
            if (myTop > windowTop && myTop < windowBottom) {
            } else {
                endImageLooping();
            }
       }, 200);
    });


    $('#about').on('click', function scrollAbout(event) {
        console.log("scrolling to about");
        event.preventDefault();
        $('body, html').animate({ scrollTop: ($('#intro').height()) },
          'slow');
    });

    $('#portfolio').on('click', function scrollPort(event) {
        console.log("scrolling to portfolio");
        event.preventDefault();
        $('body, html').animate({ scrollTop: ($('#intro').height() + $('#aboutc').height() + 120) }, 'slow');
    });


    $('#contact').on('click', function scrollContact(event) {
        console.log("scrolling to contact");
        event.preventDefault();
        $('body, html').animate({ scrollTop: ($('#intro').height() + $('#aboutc').height() + $('#portfolioc').height() + 200) }, 'slow');
    });


    $(".link").on("click", function (event) {
        event.preventDefault();
        // hide all elements under crate
        $('#wrapper').children().hide();

        // now show the element clicked...
        child_element_name = $(this).data("target");
        console.log($(this).data("target"));
        $(child_element_name).fadeToggle();
    });

    $(".item a").hover(function () {
        $(this).next().fadeToggle();
    });



    // do this at the end, don't start the interval until everyting is set up
    startImageLooping();



});