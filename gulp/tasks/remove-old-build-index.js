'use strict';

import clean from 'gulp-clean';
import debug from 'gulp-debug';
import gulp from 'gulp';

import * as config from '../config';
import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

let sourceFiles = config.file.destination.indexBuild;

export function task(namespace = defaultNamespace) {
  return gulp.src(sourceFiles, {
    dot: true,
    read: false
  })
  .pipe(debug({
    title: namespace
  }))
  .pipe(clean())
  .on('error', helper.reportError);
}
