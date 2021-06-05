let depth1 = [0,1,2,3,4];
let depth2 = [0,1,2,3,4,5,6,7,8];

// gnbmenu
let gnbSettings = {
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
        prevEl: '.swiper-button-prev',
    },
}
let topDepthMenu = new Swiper('.gnb-menus', gnbSettings);

// submenu
let subSettings = {
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
        prevEl: '.swiper-button-prev',
    },
}
let topSubMenu = new Swiper('.sub-menus', subSettings);

// content slide
let contentWrapper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    initialSlide: 0,
    spaceBetween: 15,
    loop: true,
    centeredSlidesBounds: true,
    on: {
        // 컨텐츠 슬라이드 끝났을때 호출
        slideChangeTransitionEnd: function() {
            DY.contentAliveHeight();

            console.log('slideChangeTransitionEnd');
            console.info(this.realIndex); // 활성화 slide number
        },

        // 다음 컨텐츠로 슬라이드 끝났을때 호출
        slideNextTransitionEnd: function() {
            console.log('slideNextTransitionEnd');
        },

        // 이전 컨텐츠로 슬라이드 되었을때 호출
        slidePrevTransitionEnd: function() {
            console.log('slidePrevTransitionEnd');
        },
    }
});

// main coverslide
let swiper = new Swiper('.effect-coverflow', {
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
        slideShadows: true,
    },
    pagination: {
        el: '.swiper-pagination',
    },
  });

