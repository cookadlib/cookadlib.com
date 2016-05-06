'use strict';

import del from 'del';
import gulp from 'gulp';

import * as config from '../config';

export default function task() {
  return del(config.file.destination.indexBuild);
}

// gulp.task('remove-old-build-index', [
//
// ], task);
