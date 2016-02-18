'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.fonts;

gulp.task('fonts', () => {
  return gulp.src(sourceFiles, {
    base: config.path.source.base,
    dot: true
  })
  .pipe(plumber({
    errorHandler: reportError
  }))
  .pipe(debug({
    title: 'fonts:'
  }))
  .pipe(plumber.stop())
  .pipe(gulp.dest(config.path.destination.fonts))
  .on('error', reportError);
});

gulp.task('fonts:watch', () => {
  gulp.watch(sourceFiles, ['fonts']);
});
