'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
// import filter from 'gulp-filter';
import gulp from 'gulp';
// import htmlhint from 'gulp-htmlhint';
// import htmltidy from 'gulp-htmltidy';
// import minifyHTML from 'gulp-minify-html';
import polylint from 'gulp-polylint';
// import remember from 'gulp-remember';
import size from 'gulp-size';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.markup;
sourceFiles = sourceFiles.concat(config.files.source.markupIgnored.map(function(path) {
  return '!' + path;
}));

// let markupHtmlhintFilter = sourceFiles.concat(config.files.source.markupHtmlhintFilter.map(function(path) {
//   return '!' + path;
// }));

// const htmlhintFilter = filter(markupHtmlhintFilter, {
//   restore: true,
//   passthrough: false
// });

export function task(done) {
  return gulp.src(sourceFiles, {
      since: gulp.lastRun(namespace)
    })
    .pipe(cache(namespace))
    .pipe(debug({
      title: namespace
    }))
    // .pipe(htmlhintFilter)
    // .pipe(htmlhint('.htmlhintrc'))
    // .pipe(htmlhint.reporter('htmlhint-stylish'))
    // .pipe(htmlhint.failReporter({
    //   suppress: true
    // }))
    // .pipe(htmlhintFilter.restore)
    // .pipe(htmltidy())
    // .pipe(minifyHTML())
    .pipe(polylint())
    .pipe(polylint.reporter(polylint.reporter.stylishlike))
    // .pipe(remember(namespace))
    .pipe(gulp.dest(config.directory.destination.markup))
    .pipe(size({title: namespace}))
    .on('error', helper.reportError);
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}

task.displayName = namespace;
task.description = 'Process and lint markup files';

export default task;
