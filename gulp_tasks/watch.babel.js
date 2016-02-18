'use strict';

import gulp from 'gulp';

// import {config, browserSync} from './_config.babel.js';

gulp.task('watch', [
  'browser-sync',
  'framework:watch',
  'bower:watch',
  'assets:watch',
  'copy:watch',
  'locales:watch',
  'markup:watch',
  'scripts:watch',
  'styles:watch'
  // 'vulcanize:watch'
], () => {
  // gulp.watch(config.files.source.locales, ['locales'], browserSync.reload);
  // gulp.watch(config.files.source.markup, ['markup'], browserSync.reload);
  // gulp.watch(config.files.source.scripts, ['scripts'], browserSync.reload);
  // gulp.watch(config.files.source.styles, ['styles']);
  console.info('Watching');
});
