'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';

import * as config from '../config';
import * as helper from '../helper';

export default task;

const defaultNamespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.fonts;

export function task(namespace = defaultNamespace) {
  return gulp.src(sourceFiles)
  .pipe(debug({
    title: namespace
  }))
  .pipe(gulp.dest(config.directory.destination.fonts))
  .on('error', helper.reportError);
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}
