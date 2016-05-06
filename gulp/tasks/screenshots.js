'use strict';

import cache from 'gulp-cached';
// import debug from 'gulp-debug';
import gulp from 'gulp';
import Pageres from 'pageres';
// import {path as phantomjsPath} from 'phantomjs-prebuilt';
// import plumber from 'gulp-plumber';
import remember from 'gulp-remember';
// import size from 'gulp-size';
// import webshot from 'gulp-webshot';

import * as config from '../config';
import {browserSync} from '../instances';

let sourceFiles = config.files.source.markup;

export default function task() {
  return new Pageres({
      delay: 2
    })
    .src(`http://localhost:${config.instance.browsersync.port}`, config.screenshots.sizes, {
      crop: true
    })
    // .src('todomvc.com', ['1280x1024', '1920x1080'])
    .dest(config.directory.destination.screenshots)
    .run();
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);
  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.screenshots[event.path];
      remember.forget('screenshots', event.path);
    }
  });
}

// gulp.task('screenshots', [
//   'browser-sync'
// ], task);
//
// gulp.task('screenshots:watch', [
//
// ], watch);
