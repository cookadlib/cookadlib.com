'use strict';

import gulp from 'gulp';

export default tasklist;

export function tasklist() {
  return gulp.series(
    gulp.parallel(
      'cacheClear',
      'clean'
    ),
    'framework',
    'assets',
    'build',
    gulp.parallel(
      'test',
      'pagespeed',
      'documentation',
      'styleguide',
      'screenshots'
    )
  );
}

export default function watch() {
  return gulp.series(
    gulp.parallel(
      'cacheClear:watch',
      'clean:watch'
    ),
    'framework:watch',
    'assets:watch',
    'build:watch',
    gulp.parallel(
      'test:watch',
      'pagespeed:watch',
      'documentation:watch',
      'styleguide:watch',
      'screenshots:watch'
    )
  );
}
