(function() {
  'use strict';

  // var components = 'component';
  var componentToggleButtons = 'button[data-action^="toggle"]';

  $('body').on('click', componentToggleButtons, function(event) {
    var target = $(event.target).attr('data-target');
    var $component = $(target);

    console.log('target', target);

    $component.toggleClass('open');
  });
})();
