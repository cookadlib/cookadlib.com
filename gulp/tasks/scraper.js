'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
// import {path as phantomjsPath} from 'phantomjs-prebuilt';
import plumber from 'gulp-plumber';
// import webshot from 'gulp-webshot';
import xray from 'x-ray';

import * as config from '../config';
import * as helper from '../helper';

const x = xray();

let sourceFiles = config.files.source.markup;

export default function task() {
  x(`http://localhost:${config.instance.browsersync.port}`, 'title')
  .stream()
  .pipe(plumber({
    errorHandler: helper.reportError
  }))
  .pipe(debug({
    title: 'scraper:'
  }))
  .pipe(plumber.stop())
  .on('error', helper.reportError);
}

export function watch() {
  gulp.watch(sourceFiles, ['task']);
}

// gulp.task('scraper', [
//   'browser-sync'
// ], task);
//
// gulp.task('scraper:watch', [
//   'browser-sync'
// ], watch);
