'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import dss from 'gulp-dss';
import gulp from 'gulp';
import remember from 'gulp-remember';
import size from 'gulp-size';
import * as config from '../config';
import * as helper from '../helper';

let sourceFiles = config.files.source.styles;

export default function task() {
  return gulp.src(sourceFiles)
    .pipe(cache('styleguide')) // only pass through changed files
    .pipe(debug({
      title: 'styleguide:'
    }))
    .pipe(dss({
      output: 'index.html',
      templatePath: config.directory.source.styleguide + '/templates'
    }))
    .pipe(gulp.dest(config.directory.destination.styleguide))
    .pipe(remember('styleguide')) // add back all files to the stream
    .pipe(size({title: 'styleguide'}))
    .on('error', helper.reportError);
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);

  watcher.on('change', (event) => {
    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.styleguide[event.path];
      remember.forget('styleguide', event.path);
    }
  });
}
