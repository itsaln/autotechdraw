// Loader

$(window).on('load', function () {
    setTimeout(function () {
        $('.loader').fadeOut(400);
        $('body').css('overflow', 'visible');
        new WOW().init()
    }, 1500)
});


$(document).ready(function () {

    // Change device orientation

    window.addEventListener("orientationchange", function () {
        location.reload();
    }, false);


    // Hamburger

    function hamburgerClose() {
        $('.header__hamburger').removeClass('js-open');
        $('html, body').removeClass('js-overflow');
        $('.header-menu').removeClass('js-menu-active')
    }

    $('.header__hamburger').on('click', function (event) {
        $(this).toggleClass('js-open');
        $('html, body').toggleClass('js-overflow');
        $('.header-menu').toggleClass('js-menu-active');

        $('#overlay').click(function (event) {
            hamburgerClose()
        });

        if ($(this).hasClass('js-open')) {

            document.onkeydown = function (e) {
                if (e.keyCode === 27) {
                    hamburgerClose();

                    return false
                }
            }

        } else {
            hamburgerClose()
        }
    });


// Header

    window.addEventListener('scroll', () => {

        if ($(window).scrollTop() > 75) {
            $('.header').addClass('js-header-fixed')
        } else {
            $('.header').removeClass('js-header-fixed')
        }
    });


    // Swiper sliders

    new Swiper('.slider-about__swiper', {
        slidesPerView: 2,
        navigation: {
            nextEl: '.slider-about__swiper .swiper-button-next',
            prevEl: '.slider-about__swiper .swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            360: {
                slidesPerView: 1,
            },
            375: {
                slidesPerView: 1,
            },
            414: {
                slidesPerView: 1,
            },
            425: {
                slidesPerView: 1,
            },
            575: {
                slidesPerView: 1,
            },
            767: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            991: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 1,
            },
            1201: {
                spaceBetween: 50,
            }
        }
    })

    new Swiper('.reviews-swiper', {
        loop: true,
        pagination: {
            el: '.reviews-swiper .swiper-pagination',
        }
    })


    if ($(window).width() <= 991) {

        let getTimeout = function () {
            let e = setTimeout, b = {};
            setTimeout = function (a, c) {
                let d = e(a, c);
                b[d] = [Date.now(), c];
                return d
            };
            return function (a) {
                return (a = b[a]) ? Math.max(a[1] - Date.now() + a[0], 0) : NaN
            }
        }();

        function sanitisePercentage(i) {
            return Math.min(100, Math.max(0, i));
        }

        let percentTime;
        let tick;
        let progressBar = document.querySelector('.swiper-hero-progress-line');

        let mySwiper = new Swiper('.hero-swiper', {
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            navigation: {
                nextEl: '.hero-swiper .swiper-button-next',
                prevEl: '.hero-swiper .swiper-button-prev'
            },
            speed: 1000,
            grabCursor: true,
            watchOverflow: true,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            roundLengths: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false
            },
            on: {
                slideChange: function () {
                    let swiper = this;
                    let defaultSlideDelay = swiper.params.autoplay.delay;
                    let currentIndex = swiper.realIndex + 1;
                    let currentSlide = swiper.slides[currentIndex];
                    let currentSlideDelay = currentSlide.getAttribute('data-swiper-autoplay') || defaultSlideDelay;

                    updateSwiperProgressBar(progressBar, currentSlideDelay);
                }
            }
        });

        function updateSwiperProgressBar(bar, slideDelay) {

            function startProgressBar() {
                resetProgressBar();
                tick = setInterval(progress, 50);
            }

            function progress() {

                let timeLeft = getTimeout(mySwiper.autoplay.timeout);

                if (mySwiper.autoplay.running && !mySwiper.autoplay.paused) {
                    percentTime = sanitisePercentage(100 - Math.round(timeLeft / slideDelay * 100));
                    bar.style.width = percentTime + '%';

                    if (percentTime > 100) {
                        resetProgressBar();
                    }
                }

                if (mySwiper.autoplay.paused) {
                    percentTime = 0;
                    bar.style.width = 0;
                }

            }

            function resetProgressBar() {
                percentTime = 0;
                bar.style.width = 0;
                clearInterval(tick);
            }

            startProgressBar();

        }

    }


    // Statistics Numbers

    $('.counter').each(function () {
        let $this = $(this),
            countTo = $this.attr('data-count');

        $({countNum: $this.text()}).animate({
                countNum: countTo
            },

            {

                duration: 500,
                easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum))
                },
                complete: function () {
                    $this.text(this.countNum)
                    // alert('finished')
                }

            })

    });


    // LightGallery

    $('.lightgallery').lightGallery();


    // Blocks

    $('.hero').css('max-width', $(window).width());
    $('.work-item').parent().addClass('work-item__parent');
    $('.tariffs-item').parent().addClass('tariffs-item__parent');
    $('.advantages-item').parent().addClass('advantages-item__parent');
    $('.team-item').parent().addClass('team-item__parent');
    $('.projects-item').parent().addClass('projects-item__parent');

    if ($(window).width() <= 575) {

        $('.partners-item.empty').parent().hide()

    }


    // Input mask

    $('input[type="tel"]').inputmask("+\\9\\98(99) 999-99-99");

    // Russian mask
    // $('input[type="tel"]').inputmask('+7(999) 999-99-99');


});