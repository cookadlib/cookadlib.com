'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import flatmap from 'gulp-flatmap';
// import glob from 'glob-all';
import gulp from 'gulp';
import jsonlint  from 'gulp-jsonlint';
import remember from 'gulp-remember';
import size from 'gulp-size';
import TranslateJSONObject from 'translate-json-object';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

const TJO = TranslateJSONObject();

let sourceFiles = config.files.source.locales;

TJO.init({
  googleApiKey: config.pagespeed.key
});

function logData(data) {
  console.log('data', data);
}

export function task(done) {
  return gulp.src(sourceFiles, {
      since: gulp.lastRun(namespace)
    })
    .pipe(cache(namespace))
    .pipe(debug({
      title: namespace
    }))
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(helper.reportError))
    .pipe(flatmap(function(stream, file) {
      const contents = JSON.parse(file.contents.toString('utf8'));
      //contents.files is an array
      for (let key in config.locales) {
        //translate each file individually

        let promise = TJO.translate(contents, config.locales[key]);

        return promise.then(logData);
      }
    }))
    .pipe(gulp.dest(config.directory.destination.locales))
    .pipe(remember(namespace))
    .pipe(size({title: namespace}))
    .on('error', helper.reportError);
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}

task.displayName = namespace;
task.description = 'Process and lint JSON locale files';

export default task;
