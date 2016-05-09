'use strict';

import cache from 'gulp-cached';
import gulp from 'gulp';
import checkPages from 'check-pages';
import remember from 'gulp-remember';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

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

export default function task(namespace = defaultNamespace, callback) {
  checkPages(console, options, callback);
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}
