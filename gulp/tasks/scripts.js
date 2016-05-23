'use strict';

import babel from 'gulp-babel';
import cache from 'gulp-cached';
// import concat from 'gulp-concat';
import debug from 'gulp-debug';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
// import modernizr from 'gulp-modernizr';
import remember from 'gulp-remember';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
// import typescript from 'gulp-tsc';
// import uglify from 'gulp-uglify';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.scripts;
// sourceFiles = sourceFiles.concat(config.files.source.markup);
sourceFiles = sourceFiles.concat(config.files.source.scriptsIgnored.map(function(file) {
  return '!' + file;
}));
// sourceFiles = sourceFiles.concat(config.files.source.tests.map(function(file) {
//   return '!' + file;
// }));
// sourceFiles = sourceFiles.concat(config.files.source.styleguide.map(function(file) {
//   return '!' + file;
// }));
// console.log('sourceFiles', sourceFiles);

export function task(done) {
  return gulp.src(sourceFiles, {
      since: gulp.lastRun(namespace)
    })
    .pipe(cache(namespace))
    .pipe(debug({
      title: namespace
    }))
    .pipe(sourcemaps.init({
      debug: true,
      loadMaps: true
    }))
    .pipe(jshint.extract()) // Extract JS from .html files
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
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel())
    // .pipe(modernizr())
    .pipe(remember(namespace))
    // .pipe(uglify())
    // .pipe(concat('app-min.js'))
    // .pipe(rename({suffix: '.min'}))
    // .pipe(sourcemaps.write('.', {
    //   sourceRoot: '/'
    // }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.directory.destination.scripts))
    .pipe(size({title: namespace}))
    .on('error', helper.reportError);
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}

task.displayName = namespace;
task.description = 'Process and lint JavaScript files';

export default task;
