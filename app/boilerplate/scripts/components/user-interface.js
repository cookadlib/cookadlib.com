'use strict';

function removeLoader() {
  $('body.loading-indicator').removeClass('loading-indicator--loading').addClass('loading-indicator--loaded');
}

(removeLoader)();
