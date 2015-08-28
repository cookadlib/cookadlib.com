'use strict';

import gulp from 'gulp';

import {config, browserSync} from './_config.babel.js';

gulp.task('browser-sync', [
    // 'build' //no need to build every time that gulp is run; if you want to build then just type "gulp build" manually
  ], () =>
  browserSync.init(config.instance.browsersync)
);
