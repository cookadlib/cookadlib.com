'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
// import symlink from 'gulp-sym';

import * as config from '../config';
import * as helper from '../helper';

export default task;

const namespace = helper.getNamespace(__filename);

export function task(done) {
  gulp.src(config.directory.source.bowerComponents)
    .pipe(debug({
      title: 'symlinks:'
    }))
    .pipe(gulp.symlink(config.directory.destination.base))
    .on('error', helper.reportError);

  gulp.src(config.directory.source.nodeModules)
    .pipe(debug({
      title: namespace
    }))
    .pipe(gulp.symlink(config.directory.destination.base))
    .on('error', helper.reportError);
}
