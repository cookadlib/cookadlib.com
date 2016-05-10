'use strict';

import gulp from 'gulp';

export function tasklist() {
  return gulp.series(
    'build:watch'
  );
}
