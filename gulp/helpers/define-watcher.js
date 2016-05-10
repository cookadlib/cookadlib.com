'use strict';

import cache from 'gulp-cached';
import chalk from 'chalk';
import gulp from 'gulp';
import htmlInjector from 'bs-html-injector';
import remember from 'gulp-remember';

import * as config from '../config';
import {browserSync} from '../instances';

function reload(triggerBrowserSyncReload, useHtmlInjector) {
  if (triggerBrowserSyncReload === true) {
    if (config.browsersync.plugins.htmlinjector.enabled === true) {
      if (useHtmlInjector === true) {
        return htmlInjector();
      } else {
        return false; //Presumably browserSync.stream is being used instead
      }
    } else {
      return browserSync.reload();
    }
  }

  return false;
}

function change(task, triggerBrowserSyncReload, useHtmlInjector) {
  return gulp.series(task, () => {
    console.log('triggerBrowserSyncReload', triggerBrowserSyncReload);
    reload(triggerBrowserSyncReload, useHtmlInjector);
  });
}

export default function watch(namespace, sourceFiles, task, triggerBrowserSyncReload = false, useHtmlInjector = true) {

  if (config.browsersync.plugins.htmlinjector.enabled === true) {
    browserSync.use(htmlInjector, {
      files: sourceFiles // merge into previous definition?
    });
  }

  let watcher = gulp.watch(sourceFiles);

  watcher.on('change', (path, stats) => {
    console.log(path, stats);
    console.info(`File ${chalk.green(path)} was changed`);

    change(task, triggerBrowserSyncReload, useHtmlInjector);
  });

  watcher.on('unlink', (path, stats) => {
    console.log(path, stats);
    console.info(`File ${chalk.red(path)} was deleted`);

    change(task, triggerBrowserSyncReload, useHtmlInjector);

    delete cache.caches[namespace][path];
    remember.forget(namespace, path);
  });

}
