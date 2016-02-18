'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import jsonlint  from 'gulp-jsonlint';
import plumber from 'gulp-plumber';
import size from 'gulp-size';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.locales;

gulp.task('locales', () => {
  return gulp.src(sourceFiles, {
    dot: true
  })
  .pipe(plumber({
    errorHandler: reportError
  }))
  .pipe(debug({
    title: 'locales:'
  }))
  .pipe(jsonlint())
  .pipe(jsonlint.reporter(reportError))
  .pipe(plumber.stop())
  .pipe(gulp.dest(config.path.destination.locales))
  .pipe(size({title: 'locales'}))
  .on('error', reportError);
});

gulp.task('locales:watch', () => {
  gulp.watch(sourceFiles, ['locales'], browserSync.reload);
});
