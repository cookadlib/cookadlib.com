'use strict';

import gulp from 'gulp';

export function tasklist() {
  return gulp.series(
    'all'
  );
}

export default function watch() {
  return gulp.series(
    'all:watch'
  );
}
