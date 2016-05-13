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

const namespace = helper.getNamespace(__filename);

let dir = config.directory.destination.base;

let settings = {
  cacheId: config.filename || path.basename(__dirname),
  disabled: false
};

let sourceFiles = config.files.source.serviceWorker;
sourceFiles = sourceFiles.concat(config.directory.source.base);
sourceFiles = sourceFiles.concat(config.file.source.index);
sourceFiles = sourceFiles.concat(config.file.source.webcomponentsjs);
sourceFiles = sourceFiles.concat(config.files.source.elements);
sourceFiles = sourceFiles.concat(config.files.source.scripts);
sourceFiles = sourceFiles.concat(config.files.source.styles);

export function task(done) {
  glob(sourceFiles, {
      cwd: dir
    }, function(error, files) {
    if (error) {
      done(error);
    } else {
      settings.precache = files;

      let md5 = crypto.createHash('md5');
      md5.update(JSON.stringify(settings.precache));
      settings.precacheFingerprint = md5.digest('hex');

      let configPath = path.join(dir, 'cache-config.json');
      fs.writeFile(configPath, JSON.stringify(settings), done);
    }
  });
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}

task.displayName = namespace;
task.description = 'Generate cache-config.json file for service worker cache';

export default task;
