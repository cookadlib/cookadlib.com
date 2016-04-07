'use strict';

import bower from 'gulp-bower';
import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import remember from 'gulp-remember';
// import rsync from 'gulp-rsync';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.bowerConfiguration;

gulp.task('bower', () => {
  bower({
    cmd: 'install'
  })
  .pipe(debug({
    title: 'bower install:'
  }))
  // .pipe(rsync({
  //   root: config.path.root,
  //   destination: config.path.destination.bowerComponents
  // }))
  .pipe(gulp.dest(config.path.destination.bowerComponents))
  .on('end', browserSync.reload)
  .on('error', reportError);

  bower({
    cmd: 'update'
  })
  .pipe(debug({
    title: 'bower update:'
  }))
  // .pipe(rsync({
  //   root: config.path.root,
  //   destination: config.path.destination.bowerComponents
  // }))
  .pipe(gulp.dest(config.path.destination.bowerComponents))
  .on('end', browserSync.reload)
  .on('error', reportError);
});

gulp.task('bower:watch', ['browser-sync'], () => {
  let watcher = gulp.watch(sourceFiles, ['bower']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.bower[event.path];
      remember.forget('bower', event.path);
    }
  });
});
