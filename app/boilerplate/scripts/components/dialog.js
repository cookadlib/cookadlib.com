(function() {
  'use strict';

  // var dialogs = 'dialog';
  var dialogOpenButtons = 'button[data-target^="dialog"]';
  var dialogCloseButtons = 'button[data-action^="close"]';

  // var $dialogs = $(dialogs);
  // var $dialogOpenButtons = $(dialogOpenButtons);
  // var $dialogCloseButtons = $(dialogs).find(dialogCloseButtons);

  $('body').on('click', dialogOpenButtons, function(event) {
    var target = $(event.target).attr('data-target');
    var dialog = document.getElementById(target);

    dialog.show();
  });

  $('body').on('click', dialogCloseButtons, function(event) {
    var target = $(event.target).closest('dialog').attr('id');
    var dialog = document.getElementById(target);

    dialog.close();
  });
})();
