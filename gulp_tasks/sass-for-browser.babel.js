'use strict';

import concat from 'gulp-concat';
import debug from 'gulp-debug';
import gulp from 'gulp';
// import order from 'gul`p-order';
import reportError from './_report-error.babel.js';

import config from './_config.babel.js';

// let sourceFiles = config.files.sass.library.bootstrap;
// sourceFiles.unshift(config.files.sass.custom);

let sourceFiles = config.files.sass;

gulp.task('sass-for-browser', () => {
  return gulp.src(sourceFiles)
    .pipe(debug({
      title: 'sass-for-browser:'
    }))
    // .pipe(gulp.src(sourceFiles))
    // .pipe(order(sourceFiles))
    .pipe(concat('sass-for-browser.scss'))
    .pipe(gulp.dest(config.path.destination.sass))
    .on('error', reportError);
});

gulp.task('sass-for-browser:watch', () => {
  gulp.watch(sourceFiles, ['sass-for-browser']);
});
