'use strict';

import gulp from 'gulp';

export function tasklist() {
  return gulp.series(
    gulp.parallel(
      'frameworkGulp',
      'frameworkJson',
      'frameworkYaml'
    )
  );
}

export function watch() {
  return gulp.series(
    gulp.parallel(
      'frameworkGulp:watch',
      'frameworkJson:watch',
      'frameworkYaml:watch'
    )
  );
}
