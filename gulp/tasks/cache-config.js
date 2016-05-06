'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import crypto from 'crypto';
import fs from 'fs';
import glob from 'glob-all';
import gulp from 'gulp';
import path from 'path';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
// import swPrecache from 'sw-precache';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

let sourceFiles = config.files.source.serviceWorker;
sourceFiles = sourceFiles.concat(config.directory.source.base);
sourceFiles = sourceFiles.concat(config.file.source.index);
sourceFiles = sourceFiles.concat(config.file.source.webcomponentsjs);
sourceFiles = sourceFiles.concat(config.files.source.elements);
sourceFiles = sourceFiles.concat(config.files.source.scripts);
sourceFiles = sourceFiles.concat(config.files.source.styles);

// [
//   'index.html',
//   './',
//   'bower_components/webcomponentsjs/webcomponents-lite.min.js',
//   '{elements,scripts,styles}/**/*.*'
// ];

export default function task(callback) {
  let dir = config.directory.destination.base;
  let settings = {
    cacheId: config.name || directory.basename(__dirname),
    disabled: false
  };

  gulp.src(config.files.source.serviceWorker, {
    // base: config.directory.source.base,
    dot: true
  })
  .pipe(plumber({
    errorHandler: helper.reportError
  }))
  .pipe(cache('cache-config')) // add back all files to the stream
  .pipe(debug({
    title: 'cache-config:'
  }))
  .pipe(plumber.stop())
  .pipe(gulp.dest(config.directory.destination.base))
  .on('error', helper.reportError);

  glob(sourceFiles, {
      cwd: dir
    }, function(error, files) {
    if (error) {
      callback(error);
    } else {
      settings.precache = files;

      let md5 = crypto.createHash('md5');
      md5.update(JSON.stringify(settings.precache));
      settings.precacheFingerprint = md5.digest('hex');

      let configPath = directory.join(dir, 'cache-configon');
      fs.writeFile(configPath, JSON.stringify(settings), callback);
    }
  });
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['cache-config']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.cacheConfig[event.path];
      remember.forget('cacheConfig', event.path);
    }
  });
}

// gulp.task('cache-config', [
//
// ], task);
//
// gulp.task('cache-config:watch', [
//   'browser-sync'
// ], watch);
