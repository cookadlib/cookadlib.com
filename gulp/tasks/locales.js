'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import jsonlint  from 'gulp-jsonlint';
import remember from 'gulp-remember';
import size from 'gulp-size';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.locales;

export function task(namespace = defaultNamespace) {
  return gulp.src(sourceFiles)
    .pipe(cache(namespace))
    .pipe(debug({
      title: namespace
    }))
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(helper.reportError))
    .pipe(gulp.dest(config.directory.destination.locales))
    .pipe(remember(namespace))
    .pipe(size({title: namespace}))
    .on('error', helper.reportError);
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}
