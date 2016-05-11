'use strict';

// import babel from 'gulp-babel';
import cache from 'gulp-cached';
import debug from'gulp-debug';
import gulp from 'gulp';
import jsonlint from 'gulp-jsonlint';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.gulp;
sourceFiles = sourceFiles.concat(config.files.source.configuration.json);
sourceFiles = sourceFiles.concat(config.files.source.configuration.yaml);

export function task(done) {
  return gulp.src(config.files.source.configuration.json)
    .pipe(cache(namespace))
    .pipe(debug({
      title: `${namespace} (configuration:json)`
    }))
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(helper.reportError))
    .on('error', helper.reportError);
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}

task.displayName = namespace;
task.description = 'Lint JSON configuration files';

export default task;
