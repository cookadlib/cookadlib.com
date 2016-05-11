'use strict';

import cache from 'gulp-cached';
import debug from'gulp-debug';
import gulp from 'gulp';
import yamlvalidate from 'gulp-yaml-validate';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.gulp;
sourceFiles = sourceFiles.concat(config.files.source.configuration.json);
sourceFiles = sourceFiles.concat(config.files.source.configuration.yaml);

export function task(done) {
  return gulp.src(config.files.source.configuration.yaml)
    .pipe(cache(namespace))
    .pipe(debug({
      title: namespace
    }))
    .pipe(yamlvalidate())
    .on('error', helper.reportError);
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}

task.displayName = namespace;
task.description = 'Validate YAML configuration files';

export default task;
