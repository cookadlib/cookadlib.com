'use strict';

import gulp from 'gulp';
// import runSequence from 'run-sequence';

// export default function tasklist(callback) {
//   runSequence(
//     'bower',
//     'copy',
//     [
//       'markup',
//       'scripts',
//       'server',
//       'styles',
//       'templates'
//     ],
//     'vulcanize',
//     'rename-index',
//     'remove-old-build-index',
//     // Uncomment 'cache-config' after 'rename-index' if you are going to use service workers.
//     'cache-config',
//     callback
//   );
// }

export default function tasklist() {
  return gulp.series(
    gulp.parallel(
      'bower',
      'copy'
    ),
    gulp.parallel(
      'markup',
      'scripts',
      'server',
      'styles',
      'templates'
    ),
    'vulcanize',
    'renameIndex',
    'removeOldBuildIndex',
    // Uncomment 'cache-config' after 'rename-index' if you are going to use service workers.
    'cacheConfig'
  );
}
