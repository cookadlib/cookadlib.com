'use strict';

import debug from 'gulp-debug';
import gifsicle from 'imagemin-gifsicle';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import jpegtran from 'imagemin-jpegtran';
import optipng from 'imagemin-optipng';
import plumber from 'gulp-plumber';
import pngquant from 'imagemin-pngquant';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.images;

gulp.task('images', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(debug({
      title: 'images:'
    }))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant(), jpegtran(), optipng(), gifsicle()]
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.path.destination.base))
    .on('error', reportError);
});

gulp.task('images:watch', function() {
  gulp.watch(sourceFiles, ['images']);
});
