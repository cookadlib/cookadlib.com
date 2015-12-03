'use strict';

import gulp from 'gulp';
import vulcanize from 'gulp-vulcanize';

import config from './_config.babel.js';

gulp.task('vulcanize', function () {
  return gulp.src(config.files.source.elements)
    .pipe(vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest(config.path.destination.elements));
});
