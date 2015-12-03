'use strict';

import gulp from 'gulp';
import wct from 'web-component-tester';

// import config from './_config.babel.js';

// Load tasks for web-component-tester
// Adds tasks for `gulp test:local` and `gulp test:remote`
wct.gulp.init(gulp);
