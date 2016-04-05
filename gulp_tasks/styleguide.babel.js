'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import dss from 'gulp-dss';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
import size from 'gulp-size';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.styles;

gulp.task('styleguide', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(cache('styleguide')) // only pass through changed files
    .pipe(debug({
      title: 'styleguide:'
    }))
    .pipe(dss({
      output: 'index.html',
      templatePath: config.path.source.styleguide + '/templates'
    }))
    .pipe(gulp.dest(config.path.destination.styleguide))
    .pipe(remember('styleguide')) // add back all files to the stream
    .pipe(size({title: 'styleguide'}))
    .pipe(plumber.stop())
    .on('error', reportError);
});

gulp.task('styleguide:watch', () => {
  let watcher = gulp.watch(sourceFiles, ['styleguide']);

  watcher.on('change', (event) => {
    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.styleguide[event.path];
      remember.forget('styleguide', event.path);
    }
  });
});
