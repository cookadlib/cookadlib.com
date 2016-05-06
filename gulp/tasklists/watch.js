'use strict';

import gulp from 'gulp';
// import runSequence from 'run-sequence';

// export default function tasklist(callback) {
//   runSequence(
//     'framework:watch',
//     'server:watch',
//     'bower:watch',
//     'assets:watch',
//     'copy:watch',
//     'locales:watch',
//     'markup:watch',
//     'scripts:watch',
//     'styles:watch',
//     'templates:watch',
//     'vulcanize:watch',
//     'cache-config:watch',
//     'browser-sync',
//     callback
//   );
// }

export default function tasklist() {
  return gulp.series(
    gulp.parallel(
      'framework:watch',
      'server:watch',
      'bower:watch',
      'assets:watch',
      'copy:watch',
      'locales:watch',
      'markup:watch',
      'scripts:watch',
      'styles:watch',
      'templates:watch',
      'vulcanize:watch',
      'cacheConfig:watch',
      'browserSync'
    )
  );
}
