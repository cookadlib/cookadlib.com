'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.fonts;

gulp.task('fonts', () => {
  return gulp.src(sourceFiles)
  .pipe(plumber({
    errorHandler: reportError
  }))
  .pipe(debug({
    title: 'fonts:'
  }))
  .pipe(plumber.stop())
  .pipe(gulp.dest(config.path.destination.fonts))
  .on('error', reportError);
});

gulp.task('fonts:watch', ['browser-sync'], () => {
  let watcher = gulp.watch(sourceFiles, ['fonts']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.fonts[event.path];
      remember.forget('fonts', event.path);
    }
  });
});
