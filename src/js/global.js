let DY = {
    state: {
        filter: false,
        mainNotice: false,
    },
    init: function() {

        // input type file
        var fileTarget = $('.filebox .upload-hidden'); 
        fileTarget.on('change', function(){ 
            if(window.FileReader){
                var filename = $(this)[0].files[0].name; 
            } else {
                var filename = $(this).val().split('/').pop().split('\\').pop();
            }
            $(this).siblings('.upload-name').val(filename); 
        });

        // PC 환경d에서는 컨텐츠 슬라이드 off 
        var filter = "win16|win32|win64|mac|macintel";
        if (navigator.platform) {
            if ( filter.indexOf( navigator.platform.toLowerCase() ) > 0 ) { 
                // contentWrapper.params.touchRatio = 0;
            }
        }

        // 컨텐츠 당기면 reload
        PullToRefresh.init({
            mainElement: 'div.swiper-container',
            onRefresh: function() { 
                console.log('reload');   
            }
        });
    },
    utilsAliveLinks: function() {
        //qr code
        $('.qr-code').on('click', function() {
            $('div.film-dark, .modal-qr').fadeIn();
        });
        $('a.modal-close-qr').on('click', function() {
            $('div.film-dark').fadeOut();
            $(this).parent().hide();
        });

        //memo
        $('.box-favorite').on('click', function() {
            $('div.film-dark, .memo-view-pop').fadeIn();
        });

        //calendar
        $('div.calender td').on('click', function() {
            
            console.info($(this));
            if($(this).hasClass('h-schedule')) {
                $('.has-schedule').css('display', 'block');
                $('.no-board-list').css('display', 'none');
            }
            else {
                $('.no-board-list').css('display', 'block');
                $('.has-schedule').css('display', 'none');
            }

            $('div.calender td').each(function() {
                $(this).removeClass('on');
            })
            $('div.calendar td').removeClass('on');
            $(this).addClass('on');
        });

        //공유, 글쓰기
        $('div.functions a.share').on('click', function() {
            $('div.film-dark, div.modal-share').fadeIn();
        });
        $('div.functions a.write').on('click', function() {
            $('div.film-dark, div.modal-write').fadeIn();
        });

        //modal 공통 닫기
        $('a.modal-close').on('click', function() {
            $('div.film-dark').fadeOut();
            $(this).parent().hide();
        });

        //ON AIR show-hide
        $('div.top-logo a.btn-live').on('click', function() {
            $('div.onair-card').css('display', 'block');
        });
        $('a.close-onair').on('click', function() {
            $('div.onair-card').css('display', 'none');
        });
    },
    gnbMenuShowHide: function() { // GNB 메뉴
        $('header a.menu-btn').on('click', function() {
            $('div.film-dark').fadeIn();
            $('aside.navigation').addClass('on');

            $('div.film-dark, aside a.close-nav').on('click', function() {
                $('div.film-dark').fadeOut();
                $('aside.navigation').removeClass('on');
            });
        });
        
    },
    gnbSearchShowHide: function() { // 검색버튼
        $('header a.search-btn').on('click', function() {
            $('div.film-dark, div.total-search').fadeIn();
            $('div.total-search div.search-area div.search-input input').focus();

            $('div.film-dark, div.total-search a.close-search').on('click', function() {
                $('div.film-dark, div.total-search').fadeOut();
            });
        });
    },
    mainPersonalInfoShowHide: function() { // 메인 개인정보 영역
        $('div.personal-info a.open-personal').on('click', function() {
            $('.personal-info div.info-wrap').addClass('on');
            $('.open-personal').addClass('off');
            $('.close-personal').addClass('on');
        });
        $('div.personal-info a.close-personal').on('click', function() {
            $('.personal-info div.info-wrap').removeClass('on');
            $('.open-personal').removeClass('off');
            $('.close-personal').removeClass('on');
        });
    },
    mainNoticeInfoShowHide: function() { // 메인 하단 공지
        $('a.open-essential').on('click', function() {
            if(DY.state.mainNotice) {
                $('div.main-footer-info').removeClass('on');
                $('a.open-essential span').removeClass('on');
                $('div.film-dark').fadeOut();
                DY.state.mainNotice = false;
            }
            else {
                $('div.main-footer-info').addClass('on');
                $('a.open-essential span').addClass('on');
                $('div.film-dark').fadeIn();
                $('div.film-dark').on('click', function() {
                    $('div.main-footer-info').removeClass('on');
                    $('a.open-essential span').removeClass('on');
                    $('div.film-dark').fadeOut();
                    DY.state.mainNotice = false;
                });
                DY.state.mainNotice = true;
            }
        });
        $('div.footer-tabs a').on('click', function() {
            $('div.main-footer-info').addClass('on');
            $('a.open-essential span').addClass('on');
            $('div.film-dark').fadeIn();
            DY.state.mainNotice = true;
        });
    },
    tabFunction: function() {
        $('.footer-tabs a').on('click', function() {
            $('.footer-tabs a').removeClass('on');
            $(this).addClass('on');
            let thisId = $(this).data('id');

            $('.main-footer-info .tabs').css('display', 'none');
            $('.main-footer-info .tabid-'+thisId).css('display', 'block');
        });
    },
    submenuInit: function() {
        $('.sub-menus a').each(function(i) {
            $(this).attr('data-num', i+1);
            $(this).on('click', function(){
                let thisNum = $(this).data('num');
                $('.sub-menus a').removeClass('active');
                contentWrapper.slideTo(thisNum, 1, false); 
                topSubMenu.slideTo(thisNum-1, 500, false);
                DY.contentAliveHeight();
            });
        });
    },
    contentAliveHeight: function() {
        // 컨텐츠 이동 후 navigation indicator
        let nowsection = $('#sectionSliderWrapper .swiper-slide-active');
        let value = nowsection.data('id');
        let gnbNum = nowsection.data('gnb');
        let subNum = nowsection.data('sub');
        $('.gnb-menus a').each(function(i) {
            $(this).removeClass('active');
            if(i === gnbNum) {
                $(this).addClass('active');
            }
        });
        $('.sub-menus a').each(function(i) {
            $(this).removeClass('active');
            let thisid = $(this).data('id');
            if(i === subNum) {
                //section height
                let nowsectionHeight = $('#sectionSliderWrapper .swiper-slide-active > div.section-inner').height();
                $(this).addClass('active');
                //section move top
                $('html, body').scrollTop(0);
                $('section').css('height', nowsectionHeight+148);  // 148 = div.section-inner padding top
            }
        });

        // sub navigation change
        topSubMenu.slideTo(subNum, 500, false);
    },
    // selectBox option show (셀렉트 박스가 변경된다면 필요 없음)
    selectOptionsForm: function() {
        $('.select_data-options').on('click', function(e) {
            $(this).next().fadeIn(function() {
                const thisOptions = $(e.target).next('.options');
                let thisValue = $(thisOptions).children().children();
                thisValue.each(function() {
                    $(this).children().on('click', function(evt) {
                        let thisV = $(this).data('value');
                        $(this).parents('.options').siblings('.select_data-options').val(thisV);
                        $(this).parents('.options').fadeOut('fast');
                        evt.preventDefault();
                    });
                }); 
            });
        });

        // grid options
        $('a.grid_select-options').on('click', function(e) {
            $('.grid_select-option').fadeOut();            
            $(this).next().fadeIn();
            e.stopPropagation();
            return false;
        });
        $('.grid_select-option').on('click', function(e) {
            e.stopPropagation();
        });
    },
    
    /**
     * global
     */
    // 브라우져 리사이즈 시 영역확보 및 조정
    siteResizeResponse: function() {
        let winWidth = $(window).width();
        let winHeight = $(window).height();

        $(window).on('resize', function() {
            let winWidth = $(window).width();
            let winHeight = $(window).height();          
        });
    },
}

// 바탕화면 클릭 시, 열려있는 팝업등에 대한 닫기 처리 (팝업을 열때마다 호출)
function openPopCloseEvent() {
    $(document).on('click', function() {
        $('.lnb-content_popup, .select-wrap div.options, .grid_select-option').fadeOut('fast');
        $('.device-list div.device-inner').removeClass('on');
    });
    $('.lnb-wrap li, .lnb-content_popup, .select-wrap, .select-wrap div.options, .device-wrap a.device-remove, .device-wrap a.remove').on('click', function(e) {
        e.stopPropagation();
    });
}

/* init */
(function($){
    $(window).on("load",function(){
        DY.init();
        DY.gnbMenuShowHide();
        DY.gnbSearchShowHide();
        DY.mainPersonalInfoShowHide();
        DY.mainNoticeInfoShowHide();
        DY.tabFunction();
        DY.submenuInit();
        DY.utilsAliveLinks();
    });
})(jQuery);
