'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import svgSprite from 'gulp-svg-sprite';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

const sourceFiles = config.files.icons;

gulp.task('icons', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(debug({
      title: 'icons:'
    }))
    .pipe(svgSprite({
      shape: {
        dimension: { // Set maximum dimensions
          maxWidth: 32,
          maxHeight: 32
        },
        spacing: { // Add padding
          padding: 10
        },
        dest: 'out/intermediate-svg' // Keep the intermediate files
      },
      mode: {
        view: { // Activate the «view» mode
          bust: false,
          render: {
            scss: true // Activate Sass output (with default options)
          }
        },
        symbol: true // Activate the «symbol» mode
      }
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.path.destination.icons))
    .on('error', reportError);
});

gulp.task('icons:watch', function() {
  gulp.watch(sourceFiles, ['icons']);
});
