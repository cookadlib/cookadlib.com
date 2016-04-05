'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import jsonlint  from 'gulp-jsonlint';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
import size from 'gulp-size';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.locales;

gulp.task('locales', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(cache('locales')) // only pass through changed files
    .pipe(debug({
      title: 'locales:'
    }))
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(reportError))
    .pipe(gulp.dest(config.path.destination.locales))
    .pipe(remember('locales')) // add back all files to the stream
    .pipe(size({title: 'locales'}))
    .pipe(plumber.stop())
    .on('error', reportError);
});

gulp.task('locales:watch', ['browser-sync'], () => {
  let watcher = gulp.watch(sourceFiles, ['locales']);

  watcher.on('change', (event) => {
    browserSync.reload();
    
    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.locales[event.path];
      remember.forget('locales', event.path);
    }
  });
});
