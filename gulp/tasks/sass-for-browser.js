'use strict';

import concat from 'gulp-concat';
import debug from 'gulp-debug';
import gulp from 'gulp';
// import order from 'gul`p-order';
import helper from '../helper';

import config from '../config.js';

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

gulp.task('sass-for-browser', [

], task);

gulp.task('sass-for-browser:watch', [
  'browser-sync'
], watch);
