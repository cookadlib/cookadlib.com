'use strict';

import gulp from 'gulp';

export function tasklist() {
  return gulp.series(
    gulp.parallel(
      'cacheClear',
      'clean'
    ),
    'framework',
    'assets',
    'code',
    gulp.parallel(
      'test',
      'pagespeed',
      'documentation',
      'styleguide',
      'screenshots'
    )
  );
}

export function watch() {
  return gulp.series(
    gulp.parallel(
      'cacheClear:watch',
      'clean:watch'
    ),
    'framework:watch',
    'assets:watch',
    'code:watch',
    gulp.parallel(
      'test:watch',
      'pagespeed:watch',
      'documentation:watch',
      'styleguide:watch',
      'screenshots:watch'
    )
  );
}
