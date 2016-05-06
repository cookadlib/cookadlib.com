'use strict';

import gulp from 'gulp';
import checkPages from 'check-pages';

import * as config from '../config';

let options = {
  pageUrls: [
    `http://localhost:${config.port}/`,
    `http://localhost:${config.port}/blog`,
    `http://localhost:${config.port}/about.html`
  ],
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

export default function task(callback) {
  checkPages(console, options, callback);
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.check[event.path];
      remember.forget('check', event.path);
    }
  });
}

// gulp.task('check', [
//   'browser-sync'
// ], task);
