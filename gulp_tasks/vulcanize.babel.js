'use strict';

import cache from 'gulp-cached';
import gulp from 'gulp';
import remember from 'gulp-remember';
import size from 'gulp-size';
import vulcanize from 'gulp-vulcanize';

import {config, browserSync} from './_config.babel.js';

let sourceFiles = `${config.path.source.elements}/elements.html`;
sourceFiles = sourceFiles.concat(config.files.source.elements);

gulp.task('vulcanize', () => {
  return gulp.src(`${config.path.source.elements}/elements.html`)
    .pipe(vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest(config.path.destination.elements))
    .pipe(size({title: 'vulcanize'}));
});

gulp.task('vulcanize:watch', ['browser-sync'], () => {
  let watcher = gulp.watch(sourceFiles, ['vulcanize']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.vulcanize[event.path];
      remember.forget('vulcanize', event.path);
    }
  });
});
