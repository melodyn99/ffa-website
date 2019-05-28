import $ from 'jquery';

export const DesktopHandle = {
    init: function () {
        $('.wrapper-header .header > div .desktop-menu-btn').click(function () {
            if (!$(this).hasClass('active')) {
                DesktopHandle.maxHeightDesktopMenu();

                $('.wrapper-header .header .move').slideDown(100);
                $(this).addClass('active');
            } else {

                $('.wrapper-header .header .move').slideUp(100);
                $(this).removeClass('active');
            }
        });

        $('.wrapper-header .header .wrapper-move .move > div ul li a').click(function () {
            DesktopHandle.resetDesktopMenu();
        });
    },
    resetDesktopMenu: function () {
        $('.wrapper-header .header .move').slideUp(100);
        $('.wrapper-header .header > div .desktop-menu-btn').removeClass('active');
    },
    maxHeightDesktopMenu: function () {
        $('.wrapper-move').css('max-height', $(window).height() - 95);
    }
}
