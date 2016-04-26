'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
// import {path as phantomjsPath} from 'phantomjs-prebuilt';
import plumber from 'gulp-plumber';
// import webshot from 'gulp-webshot';
import xray from 'x-ray';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

const x = xray();

let sourceFiles = config.files.source.markup;

gulp.task('scraper', ['browser-sync'], () => {
  x(`http://localhost:${config.instance.browsersync.port}`, 'title')
  .stream()
  .pipe(plumber({
    errorHandler: reportError
  }))
  .pipe(debug({
    title: 'scraper:'
  }))
  .pipe(plumber.stop())
  .on('error', reportError);
});

gulp.task('scraper:watch', () => {
  gulp.watch(sourceFiles, ['scraper']);
});
