'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', ['clean'], (cb) => {
  // Uncomment 'cache-config' after 'rename-index' if you are going to use service workers.
  runSequence(
    'framework',
    'bower-install',
    'copy',
    [
      'markup',
      'scripts',
      'vulcanize'
    ],
    // 'rename-spritesheet',
    'assets',
    [
      'styles'
    ],
    'rename-index',
    'remove-old-build-index',
    'cache-config',
    cb
  );
});

gulp.task('build:watch', [
  'framework:watch',
  'assets:watch',
  'copy:watch',
  'markup:watch',
  'scripts:watch',
  'styles:watch',
  'vulcanize:watch'
]);
