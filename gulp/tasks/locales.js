'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import jsonlint  from 'gulp-jsonlint';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
import size from 'gulp-size';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

let sourceFiles = config.files.source.locales;

export default function task() {
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: helper.reportError
    }))
    .pipe(cache('locales')) // only pass through changed files
    .pipe(debug({
      title: 'locales:'
    }))
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(helper.reportError))
    .pipe(gulp.dest(config.directory.destination.locales))
    .pipe(remember('locales')) // add back all files to the stream
    .pipe(size({title: 'locales'}))
    .pipe(plumber.stop())
    .on('error', helper.reportError);
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.locales[event.path];
      remember.forget('locales', event.path);
    }
  });
}

// gulp.task('locales', [
//
// ], task);
//
// gulp.task('locales:watch', [
//   'browser-sync'
// ], watch);
