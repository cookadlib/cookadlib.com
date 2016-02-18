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

gulp.task('vulcanize:watch', () => {
  gulp.watch(sourceFiles, ['vulcanize'], browserSync.reload);
});
