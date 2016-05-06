'use strict';

import gulp from 'gulp';
import rename from 'gulp-rename';

import * as config from '../config';

export default function task() {
  return gulp.src(config.file.destination.indexBuild)
    .pipe(rename(config.file.destination.index))
    .pipe(gulp.dest(config.directory.destination.base));
}

// gulp.task('rename-index', [
//
// ], task);
