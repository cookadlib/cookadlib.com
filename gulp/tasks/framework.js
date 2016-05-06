'use strict';

// import babel from 'gulp-babel';
import cache from 'gulp-cached';
import debug from'gulp-debug';
import gulp from 'gulp';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import jsonlint from 'gulp-jsonlint';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
import yamlvalidate from 'gulp-yaml-validate';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

let sourceFiles = config.files.source.gulp;
sourceFiles = sourceFiles.concat(config.files.source.configuration.json);
sourceFiles = sourceFiles.concat(config.files.source.configuration.yaml);

export default function task() {
  gulp.src(config.files.source.gulp)
    .pipe(plumber({
      errorHandler: helper.reportError
    }))
    .pipe(cache('framework')) // only pass through changed files
    .pipe(debug({
      title: 'framework (gulp):'
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jscs({
      fix: false
    }))
    // .pipe(typescript({
    //   allowimportmodule: true,
    //   target: 'ES6'
    // }))
    .pipe(plumber.stop())
    .on('error', helper.reportError);

  gulp.src(config.files.source.configuration.json)
    .pipe(plumber({
      errorHandler: helper.reportError
    }))
    .pipe(cache('framework')) // only pass through changed files
    .pipe(debug({
      title: 'framework (configuration:json):'
    }))
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(helper.reportError))
    .pipe(plumber.stop())
    .on('error', helper.reportError);

  gulp.src(config.files.source.configuration.yaml)
    .pipe(plumber({
      errorHandler: helper.reportError
    }))
    .pipe(cache('framework')) // only pass through changed files
    .pipe(debug({
      title: 'framework (configuration:yaml):'
    }))
    .pipe(yamlvalidate())
    .pipe(plumber.stop())
    .on('error', helper.reportError);
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.framework[event.path];
      remember.forget('framework', event.path);
    }
  });
}

// gulp.task('framework', [
//
// ], task);
//
// gulp.task('framework:watch', [
//   'browser-sync'
// ], watch);
