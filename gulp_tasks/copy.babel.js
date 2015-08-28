'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

const sourceFiles = config.files.miscellaneous;
sourceFiles.concat(config.files.packages);

gulp.task('copy', () => {
  return gulp.src(sourceFiles, {
    dot: true
  })
  .pipe(plumber())
  .pipe(debug({
    title: 'copy:'
  }))
  .pipe(plumber.stop())
  .pipe(gulp.dest(config.path.destination.base))
  .on('error', reportError);
});

gulp.task('copy:watch', function() {
  gulp.watch(sourceFiles, ['copy']);
});
