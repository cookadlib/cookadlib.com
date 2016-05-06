'use strict';

import gulp from 'gulp';
// import runSequence from 'run-sequence';

// export default function tasklist(callback) {
//   runSequence(
//     'browser-sync',
//     callback
//   );
// }

export default function tasklist() {
  return gulp.series(
    'browserSync'
  );
}
