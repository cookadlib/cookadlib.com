'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import flatmap from 'gulp-flatmap';
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

export function task(done) {
  return gulp.src(sourceFiles)
    .pipe(cache(namespace))
    .pipe(debug({
      title: namespace
    }))
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(helper.reportError))
    .pipe(flatmap(function(stream, file) {
      const contents = JSON.parse(file.contents.toString('utf8'));
      //contents.files is an array
      console.log('contents', contents);
      for (let key in config.locales) {
        //translate each file individually
        // return gulp.src(contents)
          // .pipe(TJO.translate(contents.files, config.locales[key]));
        return TJO.translate(contents, config.locales[key]);
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
