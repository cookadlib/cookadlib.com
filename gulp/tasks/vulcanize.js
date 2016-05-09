'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import remember from 'gulp-remember';
import size from 'gulp-size';
import vulcanize from 'gulp-vulcanize';

import * as config from '../config';
import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

let sourceFiles = [
  `${config.directory.source.elements}/elements.html`
];
sourceFiles = sourceFiles.concat(config.files.source.elements);

export default function task(namespace = defaultNamespace) {
  return gulp.src(`${config.directory.source.elements}/elements.html`)
    .pipe(cache(namespace))
    .pipe(debug({
      title: namespace
    }))
    .pipe(vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest(config.directory.destination.elements))
    .pipe(remember(namespace))
    .pipe(size({title: namespace}))
    .on('error', helper.reportError);
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}
