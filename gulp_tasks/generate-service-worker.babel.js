'use strict';

import fs from 'fs';
// import glob from 'glob';
import gulp from 'gulp';
import path from 'path';
import swPrecache from 'sw-precache';

import config from './_config.babel.js';

import manifest from '../package.json';

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task('generate-service-worker', cb => {
  const rootDir = config.path.destination.base;

  swPrecache({
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: manifest.name,
    // URLs that don't directly map to single static files can be defined here.
    // If any of the files a URL depends on changes, then the URL's cache entry
    // is invalidated and it will be refetched.
    // Generally, URLs that depend on multiple files (such as layout templates)
    // should list all the files; a change in any will invalidate the cache.
    // In this case, './' is the top-level relative URL, and its response
    // depends on the contents of the file 'dist/index.html'.
    dynamicUrlToDependencies: {
      './': [path.join(rootDir, 'index.html')]
    },
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${rootDir}/fonts/**/*.woff`,
      `${rootDir}/images/**/*`,
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/*.{html,json}`
    ],
    // Translates a static file path to the relative URL that it's served from.
    stripPrefix: path.join(rootDir, path.sep)
  }, (err, swFileContents) => {
    if (err) {
      cb(err);
      return;
    }

    const filepath = path.join(rootDir, 'service-worker.js');

    fs.writeFile(filepath, swFileContents, err => {
      if (err) {
        cb(err);
        return;
      }

      cb();
    });
  });
});
