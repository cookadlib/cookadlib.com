'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
import size from 'gulp-size';
import vulcanize from 'gulp-vulcanize';

import {config, browserSync} from '../config.js';
import helper from '../helper';

let sourceFiles = [
  `${config.directory.source.elements}/elements.html`
];
sourceFiles = sourceFiles.concat(config.files.source.elements);

export default funciton task() {
  return gulp.src(`${config.directory.source.elements}/elements.html`)
    .pipe(plumber({
      errorHandler: helper.reportError
    }))
    .pipe(cache('vulcanize')) // only pass through changed files
    .pipe(debug({
      title: 'vulcanize:'
    }))
    .pipe(vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest(config.directory.destination.elements))
    .pipe(remember('vulcanize')) // add back all files to the stream
    .pipe(size({title: 'vulcanize'}))
    .pipe(plumber.stop())
    .on('error', helper.reportError);
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.vulcanize[event.path];
      remember.forget('vulcanize', event.path);
    }
  });
}

gulp.task('vulcanize', [

], task);

gulp.task('vulcanize:watch', [
  'browser-sync'
], watch);
