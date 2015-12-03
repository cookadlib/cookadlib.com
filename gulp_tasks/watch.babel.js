'use strict';

import gulp from 'gulp';

import {config, browserSync} from './_config.babel.js';

gulp.task('watch', [
  'browser-sync'
], () => {
  gulp.watch(config.files.source.markup, ['markup'], browserSync.reload);
  gulp.watch(config.files.source.scripts, ['scripts'], browserSync.reload);
  gulp.watch(config.files.source.styles, ['styles']);
});
