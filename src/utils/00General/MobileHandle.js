import $ from 'jquery';

export const MobileHandle = {
    init: function () {
        $('.mobile-menu-btn').click(function () {
            if ($('.blackPlane').attr('rel') === 'active') {
                MobileHandle.menuReset();
            } else {
                $('#root').attr('rel', $(window).scrollTop());
                $('#root').css('margin-top', -$(window).scrollTop());
                $('body').css('position', 'fixed');

                $('#wrap, .wrapper-header, .sortbyFilter').addClass('active');
                $('.wrapper-mobile-menu').css('display', 'block');

                setTimeout(function () {
                    $('.blackPlane').stop(true, false).fadeIn(200).attr('rel', 'active');
                    setTimeout(function () {
                        $('.wrapper-mobile-menu > .mobile-menu > ul > li > a').click(function () {
                            MobileHandle.menuReset();
                        })
                    }, 100);
                }, 100);
            }
        });

        $('.logo, .blackPlane').click(function () {
            MobileHandle.menuReset();
        });
    },
    menuReset: function () {
        $('body').css('position', '');
        $('#root').css('margin-top', '');
        $(window).scrollTop($('#root').attr('rel'));

        $('#wrap, .wrapper-header, .sortbyFilter').removeClass('active');

        setTimeout(function () {
            $('.blackPlane').stop(true, false).fadeOut(200).attr('rel', '');
            $('.wrapper-mobile-menu').css('display', 'none');
        }, 100);
    },
    containersSize: function () {
        $('#root, .mobile-plane').css('width', $(window).width());
    }
}
