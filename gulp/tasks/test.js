'use strict';

import gulp from 'gulp';
import wct from 'web-component-tester';

// import * as config from '../config';

// Load tasks for web-component-tester
// Adds tasks for `gulp test:local` and `gulp test:remote`

export default function task() {
  wct.gulp.init(gulp);
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);

  watcher.on('change', (event) => {
    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.test[event.path];
      remember.forget('test', event.path);
    }
  });
}

// gulp.task('test', [
//
// ], task);
//
// gulp.task('test:watch', [
//   'browser-sync'
// ], watch);
