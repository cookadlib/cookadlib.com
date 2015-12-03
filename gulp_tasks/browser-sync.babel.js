'use strict';

import gulp from 'gulp';
import historyApiFallback from 'connect-history-api-fallback';

import {config, browserSync} from './_config.babel.js';

config.instance.browsersync.server.middleware = [
  historyApiFallback()
];

gulp.task('browser-sync', [
    // 'build' //no need to build every time that gulp is run; if you want to build then just type "gulp build" manually
  ], () =>
  browserSync.init(config.instance.browsersync)
);
