/*global console:false, window:false, document:false, $:false, jQuery:false, speechSynthesis:false, SpeechSynthesisUtterance:false, i18n:false, Notification: false */

'use strict';

function installServiceWorkers() {

  if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('/ServiceWorker.js', {
      scope: '/'
    })
    .then(function(registration) {
      console.log('ServiceWorker registration successful with scope:', registration.scope);
    })
    .catch(function(err) {
      console.log('ServiceWorker registration failed:', err);
    });

  }

}

(installServiceWorkers)();
