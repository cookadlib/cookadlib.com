'use strict';

import del from 'del';
import gulp from 'gulp';

import config from './_config.babel.js';

gulp.task('remove-old-build-index', () => {
  return del(config.file.destination.indexBuild);
});
