'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.directory.source.bowerComponents;
sourceFiles = sourceFiles.concat(config.directory.source.nodeModules);

export function task(done) {
  return gulp.src(sourceFiles, {
      since: gulp.lastRun(namespace)
    })
    .pipe(debug({
      title: namespace
    }))
    .pipe(gulp.symlink(config.directory.source.base))
    .pipe(gulp.symlink(config.directory.destination.base))
    .on('error', helper.reportError);
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true, false);
}

task.displayName = namespace;
task.description = 'Symlink directories into build target directory';

export default task;
