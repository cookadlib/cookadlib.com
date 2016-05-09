'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import rsync from 'gulp-rsync';

import * as config from '../config';
import * as helper from '../helper';

let sourceFiles = config.files.destination.all;

export default function task() {
  return gulp.src(sourceFiles, {
    dot: true
  })
  .pipe(plumber({
    errorHandler: helper.reportError
  }))
  .pipe(debug({
    title: 'rsync:'
  }))
  .pipe(rsync({
    root: config.directory.destination.base,
    hostname: '',
    username: '',
    destination: config.directory.deploy.base,
    incremental: true,
    exclude: []
  }))

  .on('error', helper.reportError);
}
