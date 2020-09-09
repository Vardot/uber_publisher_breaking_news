/**
 * @file
 * Behaviors for the iplus theme.
 */

/* global Plyr,SimpleBar */
(function($, _, Drupal) {
  Drupal.behaviors.breakingNews = {
    attach: function(context) {

      if ($('.breaking-news-id').length > 0) {
        const id = [];
        const arr = [];
        let cookies = [],
          index;

        if (typeof $.cookie('bn') !== 'undefined') {
          cookies = $.cookie('bn').split(',');
          cookies = jQuery.unique(cookies);
        }

        $('.breaking-news-id', context).each(function() {
          arr.push(
            $(this)
              .text()
              .trim()
          );
          if (
            $.inArray(
              $(this)
                .text()
                .trim(),
              cookies
            ) === 0
          ) {
            index = arr.indexOf(
              $(this)
                .text()
                .trim()
            );
            arr.splice(index, 1);
            cookies.splice(index, 1);
          }
        });

        if (typeof $.cookie('bn') === 'undefined' || arr.length > 0) {
          $('.view-post-breaking-news').addClass('d-block');
        }

        $('.close-breaking-news', context).on('click', function() {
          $('.breaking-news-id', context).each(function() {
            id.push(
              $(this)
                .text()
                .trim()
            );
            $('.view-post-breaking-news').fadeOut(500);
            $.removeCookie('bn');
            $.cookie('bn', id, { expires: 30, path: '/'});
            setTimeout(function() {
              $('.view-post-breaking-news').removeClass('d-block');
            }, 500);
          });
        });
      }
    }
  };

})(window.jQuery, window._, window.Drupal);
