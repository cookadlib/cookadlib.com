'use strict';

import gulp from 'gulp';
import shell from 'gulp-shell';

// import config from './_config.babel.js';

gulp.task('bower-install', shell.task([
  'bower install --loglevel=warn'
]));
