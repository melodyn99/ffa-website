import $ from 'jquery';

export const Popup = {
    init: function () {

        $('.popup').click(function (e) {
            e.preventDefault();

            // var target = $(this).attr('rel');
            // $('.popup-plane .holder').html($('.' + target).html());

            $('#root').attr('rel', $(window).scrollTop());
            $('#root').css('margin-top', -$(window).scrollTop());
            $('body').css('position', 'fixed');
            $('.popup-plane').css('display', 'table').stop(true, false).animate({ 'opacity': 1 }, 300);

            $('.popup-plane .back').click(function (e) {
                e.preventDefault();

                $('.popup-plane').stop(true, false).animate({ 'opacity': '' }, 300, "linear", function () {
                    $(this).hide();
                });
                $('body').css('position', '');
                $('#root').css('margin-top', '');
                $(window).scrollTop($('#root').attr('rel'));
            })
            // .children().click(function (e) {
            //     return false;
            // });

            //setTimeout(function () {
            Popup.containersSize();
            //}, 200);
        });
    },
    containersSize: function () {
        if ($(window).height() > 780) {
            $('.popup-plane > .inner > .wrap').css('max-height', '');
        } else {
            $('.popup-plane > .inner > .wrap').css('max-height', $(window).height());
        }
    }
}

