'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
import size from 'gulp-size';
import vulcanize from 'gulp-vulcanize';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = [
  `${config.path.source.elements}/elements.html`
];
sourceFiles = sourceFiles.concat(config.files.source.elements);

gulp.task('vulcanize', () => {
  return gulp.src(`${config.path.source.elements}/elements.html`)
    .pipe(plumber({
      errorHandler: reportError
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
    .pipe(gulp.dest(config.path.destination.elements))
    .pipe(remember('vulcanize')) // add back all files to the stream
    .pipe(size({title: 'vulcanize'}))
    .pipe(plumber.stop())
    .on('error', reportError);
});

gulp.task('vulcanize:watch', ['browser-sync'], () => {
  let watcher = gulp.watch(sourceFiles, ['vulcanize']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.vulcanize[event.path];
      remember.forget('vulcanize', event.path);
    }
  });
});
