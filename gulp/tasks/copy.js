'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.miscellaneous;
// sourceFiles = sourceFiles.concat(config.files.source.customStyles);
// sourceFiles = sourceFiles.concat(config.files.source.elements); // remove when using Vulcanize
sourceFiles = sourceFiles.concat(config.files.source.locales);
// sourceFiles = sourceFiles.concat(config.files.source.scriptsIgnored);
sourceFiles = sourceFiles.concat(config.files.source.serviceWorker);
// sourceFiles = sourceFiles.concat(config.files.source.templates);
// sourceFiles = sourceFiles.concat(config.files.source.translations);
// sourceFiles = sourceFiles.concat(config.files.source.miscellaneousIgnored.map(function(file) {
//   return '!' + file;
// }));

export function task(done) {
  return gulp.src(sourceFiles, {
      dot: true,
      since: gulp.lastRun(namespace)
    })
    .pipe(cache(namespace))
    .pipe(debug({
      title: namespace
    }))
    .pipe(gulp.dest(config.directory.destination.base))
    .on('error', helper.reportError);
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}

task.displayName = namespace;
task.description = 'Copy files that do not require any processing';

export default task;
