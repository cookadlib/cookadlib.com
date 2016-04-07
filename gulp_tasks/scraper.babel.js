'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import Pageres from 'pageres';
// import {path as phantomjsPath} from 'phantomjs-prebuilt';
import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
import size from 'gulp-size';
// import webshot from 'gulp-webshot';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.markup;

gulp.task('scraper', ['browser-sync'], () => {
  // `http://localhost:${config.instance.browsersync.port}`
});

gulp.task('scraper:watch', () => {
  let watcher = gulp.watch(sourceFiles, ['scraper']);
  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.scraper[event.path];
      remember.forget('scraper', event.path);
    }
  });
});
