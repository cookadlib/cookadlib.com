'use strict';

import bower from 'gulp-bower';
import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import remember from 'gulp-remember';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

let sourceFiles = config.files.source.bowerConfiguration;

export default function task() {

  if (process.env.ENV === 'development') {
    bower({
      cmd: 'install'
    })
    .pipe(debug({
      title: 'bower install:'
    }))
    .pipe(gulp.dest(config.directory.destination.bowerComponents))
    .on('end', browserSync.reload)
    .on('error', helper.reportError);

    bower({
      cmd: 'update'
    })
    .pipe(debug({
      title: 'bower update:'
    }))
    .pipe(gulp.dest(config.directory.destination.bowerComponents))
    .on('end', browserSync.reload)
    .on('error', helper.reportError);
  }

}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.bower[event.path];
      remember.forget('bower', event.path);
    }
  });
}

// gulp.task('bower', task);
//
// gulp.task('bower:watch', [
//   'browser-sync'
// ], watch);
