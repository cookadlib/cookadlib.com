'use strict';

import gulp from 'gulp';
import size from 'gulp-size';
import vulcanize from 'gulp-vulcanize';

import {config, browserSync} from './_config.babel.js';

let sourceFiles = `${config.path.source.elements}/elements.html`;

gulp.task('vulcanize', () => {
  return gulp.src(sourceFiles)
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
