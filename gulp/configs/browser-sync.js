'use strict';

import superstatic from 'superstatic';

import packageJson from '../../package.json';

import directory from './directory';
// import * as config from '../config';

// console.log('config', config);

export let browsersync = {};

// browsersync.files = [
//   config.directory.destination.base + '/**',
//   '!' + config.directory.destination.base + '/**/*.{map,scss}'
// ],  //site-wide reload
// Run as an https by uncommenting 'https: true'
// Note: this uses an unsigned certificate which on first access will present a certificate warning in the browser.
// browsersync.https = true;
browsersync.logPrefix = 'Browsersync';
browsersync.port = packageJson.config.browsersync.socket.port;
browsersync.ui = {
    port: packageJson.config.browsersync.ui.port
};

if (process.env.ENV === 'development') {
  browsersync.browser = [
    'google chrome'
  ];
  browsersync.debugInfo = true;
  browsersync.ghostMode = {
    clicks: true,
    forms: true,
    scroll: true
  };
  browsersync.logConnections = true;
  browsersync.logFileChanges = true;
  browsersync.logSnippet = true;
  browsersync.notify = true;
  browsersync.open = true;
  browsersync.reloadOnRestart = false;
  browsersync.snippetOptions = {
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
  browsersync.proxy = {
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
  browsersync.server = {
    baseDir: [
      directory.temporary,
      directory.destination.base
    ],
    middleware: [
      superstatic({
        config: '../../superstatic.json',
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
    //   '/bower_components': config.directory.source.bowerComponents,
    //   '/node_modules': config.directory.source.nodeModules,
    // }
  };
}

export default browsersync;
