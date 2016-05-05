'use strict';

import superstatic from 'superstatic';

import packageJson from '../../package.json';

import directory from './directory';

let instance = {};

instance.pagespeed = {
  key: packageJson.config.pagespeed.key
};

instance.vorlon = {
  port: packageJson.config.vorlon.ui.port
};

instance.browsersync = {};

// instance.browsersync.files = [
//   directory.destination.base + '/**',
//   '!' + directory.destination.base + '/**/*.{map,scss}'
// ],  //site-wide reload
// Run as an https by uncommenting 'https: true'
// Note: this uses an unsigned certificate which on first access will present a certificate warning in the browser.
// instance.browsersync.https = true;
instance.browsersync.logPrefix = 'Browsersync';
instance.browsersync.port = packageJson.config.browsersync.socket.port;
instance.browsersync.ui = {
    port: packageJson.config.browsersync.ui.port
};

if (process.env.ENV === 'development') {
  instance.browsersync.browser = [
    'google chrome'
  ];
  instance.browsersync.debugInfo = true;
  instance.browsersync.ghostMode = {
    clicks: true,
    forms: true,
    scroll: true
  };
  instance.browsersync.logConnections = true;
  instance.browsersync.logFileChanges = true;
  instance.browsersync.logSnippet = true;
  instance.browsersync.notify = true;
  instance.browsersync.open = true;
  instance.browsersync.reloadOnRestart = false;
  instance.browsersync.snippetOptions = {
    rule: {
      match: '<span id="browser-sync-binding"></span>',
      fn: function (snippet) {
        'use strict';
  //       // temporary workaround below as browser-sync 2.7.11 tries to inject
  //       // the client with an incorrect version number appended to the filename
  //       snippet = '<script async src="/browser-sync/browser-sync-client.js"></script>';
  //       console.log('snippet', snippet);
        return snippet;
      }
    }
  };
}

if(packageJson.config.browsersync.proxy) {
  instance.browsersync.proxy = {
    middleware: function (req, res, next) {
      'use strict';
      // res.setHeader('Access-Control-Allow-Credentials', 'false');
      // res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Origin', 'TRUE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      next();
    },
    target: `${packageJson.config.browsersync.proxy.hostname}:${packageJson.config.browsersync.proxy.port}`
  };
} else {
  instance.browsersync.server = {
    baseDir: [
      directory.temporary,
      directory.destination.base
    ],
    middleware: [
      superstatic({
        config: './superstatic.json',
        debug: true,
        // errorPage: 'error.html',
        gzip: true,
        // host: packageJson.name,
        // port: packageJson.config.http.port,
        stack: 'strict'
      })
    ]
    // ,
    // routes: {
    //   '/bower_components': directory.source.bowerComponents,
    //   '/node_modules': directory.source.nodeModules,
    // }
  };
}

export default instance;
