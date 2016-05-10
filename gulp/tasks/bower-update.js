'use strict';

import bower from 'gulp-bower';
import debug from 'gulp-debug';
import gulp from 'gulp';

import * as config from '../config';
import * as helper from '../helper';

export default task;

const defaultNamespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.bowerConfiguration;

export function task(namespace = defaultNamespace) {

  if (process.env.ENV === 'development') {
    return bower({
      cmd: 'update',
      verbosity: 1
    })
    .pipe(debug({
      title: namespace
    }))
    .pipe(gulp.dest(config.directory.destination.bowerComponents))
    .on('error', helper.reportError);
  }

}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}
