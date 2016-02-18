'use strict';

// import babel from 'gulp-babel';
import cache from 'gulp-cached';
import debug from'gulp-debug';
import gulp from 'gulp';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import jsonlint from 'gulp-jsonlint';
import plumber from 'gulp-plumber';
import yamlvalidate from 'gulp-yaml-validate';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.tasks;
sourceFiles = sourceFiles.concat(config.files.source.configuration.json);
sourceFiles = sourceFiles.concat(config.files.source.configuration.yaml);

gulp.task('framework', () => {
  gulp.src(config.files.source.tasks)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(cache('framework (tasks)')) // only pass through changed files
    .pipe(debug({
      title: 'framework (tasks):'
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
    .on('error', reportError);

  gulp.src(config.files.source.configuration.json)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(cache('framework (configuration:json)')) // only pass through changed files
    .pipe(debug({
      title: 'framework (configuration:json):'
    }))
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(reportError))
    .pipe(plumber.stop())
    .on('error', reportError);

  gulp.src(config.files.source.configuration.yaml)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(cache('framework (configuration:yaml)')) // only pass through changed files
    .pipe(debug({
      title: 'framework (configuration:yaml):'
    }))
    .pipe(yamlvalidate())
    .pipe(plumber.stop())
    .on('error', reportError);
});

gulp.task('framework:watch', () => {
  gulp.watch(sourceFiles, ['framework'], browserSync.reload);
});
