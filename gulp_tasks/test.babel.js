'use strict';

import gulp from 'gulp';

// import config from './_config.babel.js';

// Load tasks for web-component-tester
// Adds tasks for `gulp test:local` and `gulp test:remote`
try {
  require('web-component-tester').gulp.init(gulp);
}
catch (err) {
  console.log('Error encountered when requiring web-component-tester');
}
