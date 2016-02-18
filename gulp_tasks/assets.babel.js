'use strict';

import gulp from 'gulp';

gulp.task('assets', [
  'fonts',
  'icons',
  'images',
  'locales',
  'sounds',
  'videos'
]);

gulp.task('assets:watch', [
  'fonts:watch',
  'icons:watch',
  'images:watch',
  'locales:watch',
  'sounds:watch',
  'videos:watch'
]);
