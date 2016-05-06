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

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

let sourceFiles = config.files.source.images;

export default function task() {
  return gulp.src(sourceFiles)
    .pipe(plumber({
      errorHandler: helper.reportError
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
    .pipe(gulp.dest(config.directory.destination.images))
    .pipe(size({title: 'images'}))
    .on('error', helper.reportError);
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.images[event.path];
      remember.forget('images', event.path);
    }
  });
}

// gulp.task('images', [
//
// ], task);
//
// gulp.task('images:watch', [
//   'browser-sync'
// ], watch);
