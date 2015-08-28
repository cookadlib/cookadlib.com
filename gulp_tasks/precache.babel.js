'use strict';

import fs from 'fs';
import glob from 'glob';
import gulp from 'gulp';
import path from 'path';

import config from './_config.babel.js';
// import reportError from './_report-error.babel.js';

// Generate a list of files that should be precached when serving from 'dist'.
// The list will be consumed by the <platinum-sw-cache> element.
gulp.task('precache', cb => {
  var filePath = path.join(config.path.destination.base, 'precache.json');

  glob('{elements, scripts, styles}/**/*.*',
    {
      cwd: config.path.source.base
    }, function(error, files) {
    if (error) {
      cb(error);
    } else {
      files.push(
        'index.html',
        './',
        'bower_components/webcomponentsjs/webcomponents-lite.min.js'
      );
      fs.writeFile(filePath, JSON.stringify(files), cb);
    }
  });
});
