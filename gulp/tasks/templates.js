'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import htmlInjector from 'bs-html-injector';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
import size from 'gulp-size';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

let sourceFiles = config.files.source.templates;

export default function task() {
  return gulp.src(sourceFiles)
  .pipe(plumber({
    errorHandler: helper.reportError
  }))
  .pipe(cache('templates'))
  .pipe(debug({
    title: 'templates:'
  }))
  .pipe(gulp.dest(config.directory.destination.templates))
  .pipe(remember('templates')) // add back all files to the stream
  .pipe(size({title: 'templates'}))
  .pipe(plumber.stop())
  .on('error', helper.reportError);
}

export function watch() {
  // browserSync.use(htmlInjector, {
  //   files: sourceFiles
  // });

  let watcher = gulp.watch(sourceFiles, ['task']);
  // let watcher = gulp.watch(sourceFiles, ['templates'], htmlInjector);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.templates[event.path];
      remember.forget('templates', event.path);
    }
  });
}

// gulp.task('templates', [
//
// ], task);
//
// gulp.task('templates:watch', [
//   'browser-sync'
// ], watch);
