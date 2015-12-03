'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
// import phantom from 'phantomjs2';
import phantom from 'phantomjs';
import plumber from 'gulp-plumber';
import webshot from 'gulp-webshot';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.markup;

gulp.task('screenshots', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(debug({
      title: 'screenshots:'
    }))
    .pipe(webshot({
      phantomPath: phantom.path,
      dest: config.path.destination.screenshots,
      root: config.path.source.base
    }))
    .pipe(plumber.stop())
    .on('error', reportError);
});

gulp.task('screenshots:watch', function() {
  gulp.watch(sourceFiles, ['screenshots']);
});
