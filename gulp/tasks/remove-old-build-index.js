'use strict';

import clean from 'gulp-clean';
import debug from 'gulp-debug';
import gulp from 'gulp';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.file.destination.indexBuild;

export function task(done) {
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

task.displayName = namespace;
task.description = 'Remove temporary index.html build file';

export default task;
