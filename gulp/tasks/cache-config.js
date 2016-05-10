'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import crypto from 'crypto';
import fs from 'fs';
import glob from 'glob-all';
import gulp from 'gulp';
import path from 'path';
import remember from 'gulp-remember';

import * as config from '../config';
import * as helper from '../helper';

export default task;

const defaultNamespace = helper.getNamespace(__filename);

let dir = config.directory.destination.base;

let settings = {
  cacheId: config.name || path.basename(__dirname),
  disabled: false
};

let sourceFiles = config.files.source.serviceWorker;
sourceFiles = sourceFiles.concat(config.directory.source.base);
sourceFiles = sourceFiles.concat(config.file.source.index);
sourceFiles = sourceFiles.concat(config.file.source.webcomponentsjs);
sourceFiles = sourceFiles.concat(config.files.source.elements);
sourceFiles = sourceFiles.concat(config.files.source.scripts);
sourceFiles = sourceFiles.concat(config.files.source.styles);

export function task(namespace = defaultNamespace, callback) {
  gulp.src(config.files.source.serviceWorker, {
    // base: config.directory.source.base,
    dot: true
  })
  .pipe(cache(namespace))
  .pipe(debug({
    title: namespace
  }))
  .pipe(gulp.dest(config.directory.destination.base))
  .on('error', helper.reportError);

  glob(sourceFiles, {
      cwd: dir
    }, function(error, files) {
    if (error) {
      callback(error);
    } else {
      settings.precache = files;

      let md5 = crypto.createHash('md5');
      md5.update(JSON.stringify(settings.precache));
      settings.precacheFingerprint = md5.digest('hex');

      let configPath = path.join(dir, 'cache-config.json');
      fs.writeFile(configPath, JSON.stringify(settings), callback);
    }
  });
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}
