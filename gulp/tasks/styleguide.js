'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import dss from 'gulp-dss';
import gulp from 'gulp';
import remember from 'gulp-remember';
import size from 'gulp-size';

import * as config from '../config';
import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.styles;

export default function task(namespace = defaultNamespace) {
  return gulp.src(sourceFiles)
    .pipe(cache(namespace))
    .pipe(debug({
      title: namespace
    }))
    .pipe(dss({
      output: 'index.html',
      templatePath: config.directory.source.styleguide + '/templates'
    }))
    .pipe(gulp.dest(config.directory.destination.styleguide))
    .pipe(remember(namespace))
    .pipe(size({title: namespace}))
    .on('error', helper.reportError);
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task);
}
