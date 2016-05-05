'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import symlink from 'gulp-sym';
import helper from '../helper';

import config from '../config.js';

export default function task() {
  // gulp.src(config.directory.source.bowerComponents)
  //   .pipe(debug({
  //     title: 'symlinks:'
  //   }))
  //   .pipe(symlink(config.directory.destination.bowerComponents))
  //   .on('error', helper.reportError);

  gulp.src(config.directory.source.nodeModules)
    .pipe(debug({
      title: 'symlinks:'
    }))
    .pipe(symlink(config.directory.destination.nodeModules))
    .on('error', helper.reportError);
}

gulp.task('symlinks', [

], task);
