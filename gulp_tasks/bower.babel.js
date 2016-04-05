'use strict';

import bower from 'gulp-bower';
import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import remember from 'gulp-remember';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.bowerConfiguration;

gulp.task('bower', () => {
  return bower({
    cmd: 'update'
  })
  .pipe(debug({
    title: 'bower:'
  }))
  .on('end', browserSync.reload)
  .on('error', reportError);
});

gulp.task('bower:watch', ['browser-sync'], () => {
  let watcher = gulp.watch(sourceFiles, ['bower']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.bower[event.path];
      remember.forget('bower', event.path);
    }
  });
});
