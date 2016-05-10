'use strict';

import gulp from 'gulp';

export default tasklist;

export function tasklist() {
  return gulp.series(
    gulp.parallel(
      'framework-gulp',
      'framework-json',
      'framework-yaml'
    )
  );
}

export default function watch() {
  return gulp.series(
    gulp.parallel(
      'framework-gulp:watch',
      'framework-json:watch',
      'framework-yaml:watch'
    )
  );
}
