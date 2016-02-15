'use strict';

import gulp from 'gulp';
import size from 'gulp-size';
import vulcanize from 'gulp-vulcanize';

import config from './_config.babel.js';

// sourceFiles = sourceFiles.concat(config.files.source.elementsIgnored.map(function(file) {
//   return '!' + file;
// }));

gulp.task('vulcanize', function () {
  return gulp.src(`${config.path.source.elements}/elements.html`)
    .pipe(vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest(config.path.destination.elements))
    .pipe(size({title: 'vulcanize'}));
});
