(function(document) {
  'use strict';

  function initializeApplication() {
    // Grab a reference to our auto-binding template
    // and give it some initial binding values
    // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
    let app = document.querySelector('#app');

    // Sets app default base URL
    app.baseUrl = '/';
    if (window.location.port === '') {  // if production
      // Uncomment app.baseURL below and
      // set app.baseURL to '/your-pathname/' if running from folder in production
      // app.baseUrl = '/polymer-starter-kit/';
    }

    app.displayInstalledToast = function() {
      // Check to make sure caching is actually enabled—it won't be in the dev environment.
      if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
        Polymer.dom(document).querySelector('#caching-complete').show();
      }
    };

    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('dom-change', function() {
      console.log('Our app is ready to rock!');
    });

    // See https://github.com/Polymer/polymer/issues/1381
    window.addEventListener('WebComponentsReady', function() {
      // imports are loaded and elements have been registered
    });

    // Main area's paper-scroll-header-panel custom condensing transformation of
    // the appName in the middle-container and the bottom title in the bottom-container.
    // The appName is moved to top and shrunk on condensing. The bottom sub title
    // is shrunk to nothing on condensing.
    window.addEventListener('paper-header-transform', function(e) {
      let appName = Polymer.dom(document).querySelector('#mainToolbar .app-name');
      let middleContainer = Polymer.dom(document).querySelector('#mainToolbar .middle-container');
      let bottomContainer = Polymer.dom(document).querySelector('#mainToolbar .bottom-container');
      let detail = e.detail;
      let heightDiff = detail.height - detail.condensedHeight;
      let yRatio = Math.min(1, detail.y / heightDiff);
      // appName max size when condensed. The smaller the number the smaller the condensed size.
      let maxMiddleScale = 0.50;
      let auxHeight = heightDiff - detail.y;
      let auxScale = heightDiff / (1 - maxMiddleScale);
      let scaleMiddle = Math.max(maxMiddleScale, auxHeight / auxScale + maxMiddleScale);
      let scaleBottom = 1 - yRatio;

      // Move/translate middleContainer
      Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

      // Scale bottomContainer and bottom sub title to nothing and back
      Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

      // Scale middleContainer appName
      Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
    });

    // Scroll page to top and expand header
    app.scrollPageToTop = function() {
      app.$.headerPanelMain.scrollToTop(true);
    };

    app.closeDrawer = function() {
      app.$.paperDrawerPanel.closeDrawer();
    };

  }

  function finishLazyLoading() {
    // (Optional) Use native Shadow DOM if it's available in the browser.
    window.Polymer = window.Polymer || {dom: 'shadow'};

    let onImportLoaded = function() {
      console.log('Elements are upgraded!');

      // let style = document.createElement('style');
      // style.setAttribute('is', 'custom-style');
      // style.setAttribute('include', 'shared-styles');
      // document.head.appendChild(style);
      // Polymer.dom(document.head).appendChild(style);
      window.Polymer.updateStyles();

      let splash = document.getElementById('splash');
      splash.addEventListener('transitionend', splash.remove);
      document.body.classList.remove('loading');

      // Kickoff your app logic here!
      initializeApplication();
    };

    let link = document.querySelector('#bundle');

    if (link.import && link.import.readyState === 'complete') {
      onImportLoaded();
    } else {
      link.addEventListener('load', onImportLoaded);
    }
  }

  const webComponentsSupported = ('registerElement' in document && 'import' in document.createElement('link') && 'content' in document.createElement('template'));

  if (!webComponentsSupported) {
    let script = document.createElement('script');
    script.onload = finishLazyLoading;
    script.src = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
    document.head.appendChild(script);
  } else {
    finishLazyLoading();
  }

})(document);
