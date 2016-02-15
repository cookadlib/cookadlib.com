'use strict';

import crypto from 'crypto';
import fs from 'fs';
import glob from 'glob-all';
import gulp from 'gulp';
import path from 'path';
// import swPrecache from 'sw-precache';

import config from './_config.babel.js';

// gulp.task('cache-config', function (callback) {
gulp.task('cache-config', (callback) => {
  let dir = config.path.destination.base;
  let settings = {
    cacheId: config.name || path.basename(__dirname),
    disabled: false
  };

  glob([
      'index.html',
      './',
      'bower_components/webcomponentsjs/webcomponents-lite.min.js',
      '{elements,scripts,styles}/**/*.*'
    ],
    {
      cwd: dir
    }, function(error, files) {
    if (error) {
      callback(error);
    } else {
      settings.precache = files;

      let md5 = crypto.createHash('md5');
      md5.update(JSON.stringify(settings.precache));
      settings.precacheFingerprint = md5.digest('hex');

      let configPath = path.join(dir, 'cache-config.json');
      fs.writeFile(configPath, JSON.stringify(settings), callback);
    }
  });
});
