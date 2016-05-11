'use strict';

import bower from 'gulp-bower';
// import debug from 'gulp-debug';
import gulp from 'gulp';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.bowerConfiguration;

export function task(done) {

  if (process.env.ENV === 'development') {
    return bower({
      cmd: 'update',
      verbosity: 1
    })
    // .pipe(debug({
    //   title: namespace
    // }))
    .pipe(gulp.dest(config.directory.destination.bowerComponents))
    .on('error', helper.reportError);
  }

}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}

task.displayName = namespace;
task.description = 'Run "bower update" command';

export default task;
