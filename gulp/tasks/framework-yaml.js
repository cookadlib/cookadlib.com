'use strict';

import cache from 'gulp-cached';
import debug from'gulp-debug';
import gulp from 'gulp';
import yamlvalidate from 'gulp-yaml-validate';

import * as config from '../config';
import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.gulp;
sourceFiles = sourceFiles.concat(config.files.source.configuration.json);
sourceFiles = sourceFiles.concat(config.files.source.configuration.yaml);

export default function task(namespace = defaultNamespace) {
  return gulp.src(config.files.source.configuration.yaml)
    .pipe(cache(namespace))
    .pipe(debug({
      title: namespace
    }))
    .pipe(yamlvalidate())
    .on('error', helper.reportError);
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}
