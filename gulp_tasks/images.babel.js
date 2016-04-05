'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gifsicle from 'imagemin-gifsicle';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import jpegtran from 'imagemin-jpegtran';
import optipng from 'imagemin-optipng';
import plumber from 'gulp-plumber';
import pngquant from 'imagemin-pngquant';
import remember from 'gulp-remember';
import size from 'gulp-size';

import {config, browserSync} from './_config.babel.js';
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
      interlaced: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [
        pngquant(),
        jpegtran(),
        optipng(),
        gifsicle()
      ]
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.path.destination.images))
    .pipe(size({title: 'images'}))
    .on('error', reportError);
});

gulp.task('images:watch', ['browser-sync'], () => {
  let watcher = gulp.watch(sourceFiles, ['images']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.images[event.path];
      remember.forget('images', event.path);
    }
  });
});
