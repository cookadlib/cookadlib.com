'use strict';

import gulp from 'gulp';

export function tasklist() {
  return gulp.series(
    'browserSync'
  );
}
