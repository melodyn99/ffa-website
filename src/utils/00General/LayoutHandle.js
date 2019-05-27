import $ from 'jquery';

export const LayoutHandle = {
    homepage: function () {

        var outer = ($(window).width() - 1200);

        if (outer < 0) {
            outer = 0;
        }

        var two_width = $('.wrapper-homeMiddle .wrapper-two .two > div').width();
        var two_parent_width = $('.wrapper-homeMiddle .wrapper-two .two').width();

        var padding;
        var videoMargin;

        if ($(window).width() > 1263) {
            padding = 20;
            videoMargin = 0;
        } else {
            padding = 0;
            videoMargin = 40;
        }

        $('.wrapper-one').css('width', outer / 2 + two_parent_width - two_width - padding);
        $('.wrapper-homeMiddle .wrapper-one .one > div').css('width', two_parent_width - two_width);
        $('.wrapper-homeMiddle .wrapper-one .one > div .wrapper-howItWorks .howItWorks img').css('width', two_parent_width - videoMargin);
    },
    top: function () {
        $('.wrapper-three').css('top', $('.wrapper-homeMiddle .wrapper-two .two > div').height());
    }
}
