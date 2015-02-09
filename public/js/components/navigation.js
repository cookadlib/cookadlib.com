(function() {
  'use strict';

  // var navigations = 'navigation';
  var navigationOpenButtons = 'button[data-target^="navigation"]';
  var navigationCloseButtons = 'button[data-action^="close"]';

  // var $navigations = $(navigations);
  // var $navigationOpenButtons = $(navigationOpenButtons);
  // var $navigationCloseButtons = $(navigations).find(navigationCloseButtons);

  $('body').on('click', navigationOpenButtons, function(event) {
    var target = $(event.target).attr('data-target');
    var $navigation = $('#' + target);

    $navigation.toggleClass('open');
  });
})();
