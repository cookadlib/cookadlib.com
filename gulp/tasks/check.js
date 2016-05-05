'use strict';

import gulp from 'gulp';
import checkPages from 'check-pages';

import config from '../config.js';

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

export function task(callback) {
  checkPages(console, options, callback);
}

gulp.task('check', [
  'browser-sync'
], task);
