'use strict';

// import babel from 'gulp-babel';
import debug from'gulp-debug';
import gulp from 'gulp';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import jsonlint from 'gulp-jsonlint';
import plumber from 'gulp-plumber';
// import typescript from 'gulp-tsc';
import yamlvalidate from 'gulp-yaml-validate';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

const sourceFiles = config.files.tasks;

gulp.task('framework', () => {
  gulp.src(sourceFiles)
    .pipe(plumber())
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

  gulp.src(config.files.configuration.json)
    .pipe(plumber())
    .pipe(debug({
      title: 'framework (configuration:json):'
    }))
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(reportError))
    .pipe(plumber.stop())
    .on('error', reportError);

  gulp.src(config.files.configuration.yaml)
    .pipe(plumber())
    .pipe(debug({
      title: 'framework (configuration:yaml):'
    }))
    .pipe(yamlvalidate())
    .pipe(plumber.stop())
    .on('error', reportError);
});

gulp.task('framework:watch', function() {
  gulp.watch(sourceFiles, ['framework']);
});
