// import requireDir from 'require-dir';
import runSequence from 'run-sequence';

import * as tasks from './gulp/task';

/**
 * Look in `./gulp_tasks/` for definitions of tasks, pipes and helpers.
 *
 * Additional arguments:
 * --verbose: Various tasks will produce more output to the console.
 */

gulp.task(
  'all',
  (cb) => {
    runSequence(
      [
        'cache-clear',
        'clean'
      ],
      [
        'framework',
        'assets'
      ],
      'build',
      [
        'document',
        'test',
        'pagespeed',
        'watch'
      ],
      cb
    );
  }
);

gulp.task('assets', [
  'fonts',
  'icons',
  // 'rename-spritesheet',
  'images',
  'locales',
  'sounds',
  'videos'
]);

gulp.task('assets:watch', [
  'fonts:watch',
  'icons:watch',
  // 'rename-spritesheet:watch',
  'images:watch',
  'locales:watch',
  'sounds:watch',
  'videos:watch'
]);

gulp.task(
    // 'clean',
  'build',
  (cb) => {
    runSequence(
      'bower',
      'copy',
      [
        'markup',
        'scripts',
        'server',
        'styles',
        'templates'
      ],
      'vulcanize',
      'rename-index',
      'remove-old-build-index',
      // Uncomment 'cache-config' after 'rename-index' if you are going to use service workers.
      'cache-config',
      cb
    );
  }
);

gulp.task('default', [
  'all'
]);

gulp.task('serve', [
  'browser-sync'
]);

// gulp.task('serve', gulp.series(
//     'index',
//     task.startServer
// ));

gulp.task('watch', [
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
  'cache-config:watch',
  'browser-sync'
], () => {
  console.info('Watching');
});
