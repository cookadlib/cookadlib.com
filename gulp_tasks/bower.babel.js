'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import shell from 'gulp-shell';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = '.bowerrc';

gulp.task('bower', () => {
  shell.task([
    'bower install --loglevel=warn',
    'bower update --loglevel=warn'
  ]);

  return gulp.src(config.files.source.bowerComponents, {
    base: config.path.source.base,
    dot: true
  })
  .pipe(plumber({
    errorHandler: reportError
  }))
  .pipe(cache('bower:copy')) // add back all files to the stream
  .pipe(debug({
    title: 'bower:copy:'
  }))
  .pipe(plumber.stop())
  .pipe(gulp.dest(config.path.destination.base))
  .on('error', reportError);
});

// gulp.task('bower', shell.task([
//   'bower install --loglevel=warn',
//   'bower update --loglevel=warn'
// ]));

gulp.task('bower:watch', () => {
  gulp.watch(sourceFiles, ['bower'], browserSync.reload);
});
