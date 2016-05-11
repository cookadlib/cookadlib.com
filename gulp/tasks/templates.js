'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import remember from 'gulp-remember';
import size from 'gulp-size';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

export default task;

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.templates;

export function task(done) {
  return gulp.src(sourceFiles)
    .pipe(cache(namespace))
    .pipe(debug({
      title: namespace
    }))
    .pipe(gulp.dest(config.directory.destination.templates))
    .pipe(remember('templates'))
    .pipe(size({title: 'templates'}))
    .on('error', helper.reportError);
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}
