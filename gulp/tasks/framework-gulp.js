'use strict';

// import babel from 'gulp-babel';
import cache from 'gulp-cached';
import debug from'gulp-debug';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.gulp;

export function task(done) {
  return gulp.src(sourceFiles, {
      since: gulp.lastRun(namespace)
    })
    .pipe(cache(namespace))
    .pipe(debug({
      title: `${namespace} (gulp)`
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpIf(!browserSync.active, jshint.reporter('fail')))
    .pipe(jscs({
      fix: false
    }))
    // .pipe(typescript({
    //   allowimportmodule: true,
    //   target: 'ES6'
    // }))
    .on('error', helper.reportError);
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}

task.displayName = namespace;
task.description = 'Lint JavaScript configuration files for gulp';

export default task;
