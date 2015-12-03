'use strict';

import gulp from 'gulp';
import rename from 'gulp-rename';

import config from './_config.babel.js';

gulp.task('rename-index', () => {
  return gulp.src(config.file.destination.indexBuild)
    .pipe(rename(config.file.destination.index))
    .pipe(gulp.dest(config.path.destination.base));
});
