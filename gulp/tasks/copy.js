'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

let sourceFiles = config.files.source.miscellaneous;
// sourceFiles = sourceFiles.concat(config.files.source.bowerComponents);
// sourceFiles = sourceFiles.concat(config.files.source.customStyles);
// sourceFiles = sourceFiles.concat(config.files.source.elements); // remove when using Vulcanize
sourceFiles = sourceFiles.concat(config.files.source.locales);
// sourceFiles = sourceFiles.concat(config.files.source.scriptsIgnored);
// sourceFiles = sourceFiles.concat(config.files.source.templates);
sourceFiles = sourceFiles.concat(config.files.source.translations);

// sourceFiles = sourceFiles.concat(config.files.source.miscellaneousIgnored.map(function(file) {
//   return '!' + file;
// }));

export default function task() {
  return gulp.src(sourceFiles, {
    // base: config.directory.source.base,
    dot: true
  })
  .pipe(plumber({
    errorHandler: helper.reportError
  }))
  .pipe(cache('copy')) // add back all files to the stream
  .pipe(debug({
    title: 'copy:'
  }))
  .pipe(gulp.dest(config.directory.destination.base))
  .pipe(plumber.stop())
  .on('error', helper.reportError);
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.copy[event.path];
      remember.forget('copy', event.path);
    }
  });
}

// gulp.task('copy', [
//
// ], task);
//
// gulp.task('copy:watch', [
//   'browser-sync'
// ], watch);
