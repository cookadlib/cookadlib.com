'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
// import htmlInjector from 'bs-html-injector';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
import size from 'gulp-size';

import {
  config,
  browserSync
} from './_config.babel.js';

import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.templates;

gulp.task('templates', () => {
  return gulp.src(sourceFiles)
  .pipe(plumber({
    errorHandler: reportError
  }))
  .pipe(cache('templates'))
  .pipe(debug({
    title: 'templates:'
  }))
  .pipe(gulp.dest(config.path.destination.templates))
  .pipe(remember('templates')) // add back all files to the stream
  .pipe(size({title: 'templates'}))
  .pipe(plumber.stop())
  .on('error', reportError);
});

gulp.task('templates:watch', ['browser-sync'], () => {
  // browserSync.use(htmlInjector, {
  //   files: sourceFiles
  // });

  let watcher = gulp.watch(sourceFiles, ['templates']);
  // let watcher = gulp.watch(sourceFiles, ['templates'], htmlInjector);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.templates[event.path];
      remember.forget('templates', event.path);
    }
  });
});
