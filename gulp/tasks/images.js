'use strict';

import debug from 'gulp-debug';
import gifsicle from 'imagemin-gifsicle';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import jpegtran from 'imagemin-jpegtran';
import optipng from 'imagemin-optipng';
import pngquant from 'imagemin-pngquant';
import size from 'gulp-size';

import * as config from '../config';
import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.images;

export default function task(namespace = defaultNamespace) {
  return gulp.src(sourceFiles)
    .pipe(debug({
      title: namespace
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
    .pipe(gulp.dest(config.directory.destination.images))
    .pipe(size({title: namespace}))
    .on('error', helper.reportError);
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}
