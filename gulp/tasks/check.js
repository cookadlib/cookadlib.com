'use strict';

import checkPages from 'check-pages';
import gulp from 'gulp';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

let pageUrls = config.files.source.markup.map(function(path) {
  return `http://localhost:${config.port}/${path}`;
});

let options = {
  pageUrls,
  checkLinks: true,
  onlySameDomain: true,
  queryHashes: true,
  noRedirects: true,
  noLocalLinks: true,
  noEmptyFragments: true,
  linksToIgnore: [
    `http://localhost:${config.port}/broken.html`
  ],
  checkXhtml: true,
  checkCaching: true,
  checkCompression: true,
  maxResponseTime: 200,
  userAgent: 'custom-user-agent/1.2.3',
  summary: true
};

let sourceFiles = config.files.source.markup;
sourceFiles = sourceFiles.concat(config.files.source.markupIgnored.map(function(path) {
  return '!' + path;
}));

export function task(done) {
  return gulp.serial('browserSync', () => checkPages(console, options, done));
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}

task.displayName = namespace;
task.description = 'Run check-pages to validate page accessibility, validation, link validity, response time, caching performance and compression performance';

export default task;
