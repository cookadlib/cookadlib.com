'use strict';

import cache from 'gulp-cached';
import chalk from 'chalk';
import gulp from 'gulp';
import htmlInjector from 'bs-html-injector';
import remember from 'gulp-remember';

import * as config from '../config';
import {browserSync} from '../instances';

function reload(triggerBrowserSyncReload = false, useHtmlInjector = true) {
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

export default function watch(namespace, sourceFiles, task, triggerBrowserSyncReload, useHtmlInjector) {

  if (config.browsersync.plugins.htmlinjector.enabled === true) {
    browserSync.use(htmlInjector, {
      files: sourceFiles
    });
  }

  let watcher = gulp.watch(sourceFiles, gulp.series(task, () => {
    console.log('triggerBrowserSyncReload', triggerBrowserSyncReload);
    reload(triggerBrowserSyncReload, useHtmlInjector);
  }));

  watcher.on('change', (event) => {

    // if (triggerBrowserSyncReload === true) {
    //   if (config.browsersync.plugins.htmlinjector.enabled === true) {
    //     htmlInjector();
    //   } else {
    //     browserSync.reload();
    //   }
    // }

    console.info(`File ${chalk.green(event.path)} was ${chalk.blue(event.type)}`);

    if (event.type === 'deleted') {
      delete cache.caches[namespace][event.path];
      remember.forget(namespace, event.path);
    }

  });

}
