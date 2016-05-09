'use strict';

import concat from 'gulp-concat';
import debug from 'gulp-debug';
import gulp from 'gulp';
// import order from 'gul`p-order';

import * as config from '../config';
import * as helper from '../helper';

// let sourceFiles = config.files.sass.library.bootstrap;
// sourceFiles.unshift(config.files.sass.custom);

let sourceFiles = config.files.sass;

export default function task() {
  return gulp.src(sourceFiles)
    .pipe(debug({
      title: 'sass-for-browser:'
    }))
    // .pipe(gulp.src(sourceFiles))
    // .pipe(order(sourceFiles))
    .pipe(concat('sass-for-browser.scss'))
    .pipe(gulp.dest(config.directory.destination.sass))
    .on('error', helper.reportError);
}

export function watch() {
  gulp.watch(sourceFiles, ['task']);
}
