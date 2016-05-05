'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';

import {config, browserSync} from '../config.js';
import helper from '../helper';

let sourceFiles = config.files.source.fonts;

export default function task() {
  return gulp.src(sourceFiles)
  .pipe(plumber({
    errorHandler: helper.reportError
  }))
  .pipe(debug({
    title: 'fonts:'
  }))
  .pipe(plumber.stop())
  .pipe(gulp.dest(config.directory.destination.fonts))
  .on('error', helper.reportError);
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.fonts[event.path];
      remember.forget('fonts', event.path);
    }
  });
}

gulp.task('fonts', [

], task);

gulp.task('fonts:watch', [
  'browser-sync'
], watch);
