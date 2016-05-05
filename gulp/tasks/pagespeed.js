'use strict';

// import debug from 'gulp-debug';
import gulp from 'gulp';
import {output as pagespeed} from 'psi';

import config from '../config.js';

export default function task(callback) {
  pagespeed(config.domain, {
    strategy: 'mobile',
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    key: config.instance.pagespeed.key
  }, callback)
  .then(data => {
    console.log('Speed score: ' + data.ruleGroups.SPEED.score);
    console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
  });
}

gulp.task('pagespeed', [
  
], task);
