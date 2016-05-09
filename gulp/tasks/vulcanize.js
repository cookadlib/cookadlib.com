'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import remember from 'gulp-remember';
import size from 'gulp-size';
import vulcanize from 'gulp-vulcanize';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

let sourceFiles = [
  `${config.directory.source.elements}/elements.html`
];
sourceFiles = sourceFiles.concat(config.files.source.elements);

export default function task() {
  return gulp.src(`${config.directory.source.elements}/elements.html`)
    .pipe(cache('vulcanize')) // only pass through changed files
    .pipe(debug({
      title: 'vulcanize:'
    }))
    .pipe(vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest(config.directory.destination.elements))
    .pipe(remember('vulcanize')) // add back all files to the stream
    .pipe(size({title: 'vulcanize'}))
    .on('error', helper.reportError);
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.vulcanize[event.path];
      remember.forget('vulcanize', event.path);
    }
  });
}
