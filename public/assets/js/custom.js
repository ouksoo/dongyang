'use strict';

var depth1 = [0, 1, 2, 3, 4];
var depth2 = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// gnbmenu
var gnbSettings = {
    slidesPerView: 5,
    spaceBetween: 0,
    freeMode: true,
    breakpoints: {
        320: {
            slidesPerView: 4,
            spaceBetweenSlides: 0
        },
        650: {
            slidesPerView: 7,
            spaceBetweenSlides: 0
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
};
var topDepthMenu = new Swiper('.gnb-menus', gnbSettings);

// submenu
var subSettings = {
    slidesPerView: 4,
    spaceBetween: 0,
    freeMode: true,
    breakpoints: {
        320: {
            slidesPerView: 4,
            spaceBetweenSlides: 0
        },
        650: {
            slidesPerView: 7,
            spaceBetweenSlides: 0
        },
        720: {
            slidesPerView: 8,
            spaceBetweenSlides: 0
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
};
var topSubMenu = new Swiper('.sub-menus', subSettings);

// content slide
var contentWrapper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    initialSlide: 0,
    spaceBetween: 15,
    loop: true,
    centeredSlidesBounds: true,
    on: {
        // 컨텐츠 슬라이드 끝났을때 호출
        slideChangeTransitionEnd: function slideChangeTransitionEnd() {
            DY.contentAliveHeight();

            console.log('slideChangeTransitionEnd');
            console.info(this.realIndex); // 활성화 slide number
        },

        // 다음 컨텐츠로 슬라이드 끝났을때 호출
        slideNextTransitionEnd: function slideNextTransitionEnd() {
            console.log('slideNextTransitionEnd');
        },

        // 이전 컨텐츠로 슬라이드 되었을때 호출
        slidePrevTransitionEnd: function slidePrevTransitionEnd() {
            console.log('slidePrevTransitionEnd');
        }
    }
});

// main coverslide
var swiper = new Swiper('.effect-coverflow', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 3,
    coverflowEffect: {
        rotate: 5,
        stretch: 5,
        depth: 50,
        modifier: 5,
        slideShadows: true
    },
    pagination: {
        el: '.swiper-pagination'
    }
});