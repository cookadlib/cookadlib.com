'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import remember from 'gulp-remember';
import size from 'gulp-size';
import svgSprite from 'gulp-svg-sprite';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

let sourceFiles = config.files.source.icons;

let pathPrefix = config.directory.source.images.replace(/^\/|\/$/g, '') + '/';

let separator = '-';

export default function task() {
  return gulp.src(sourceFiles, {
      base: config.directory.source.base
    })
    .pipe(cache('icons')) // only pass through changed files
    .pipe(debug({
      title: 'icons:'
    }))
    .pipe(svgSprite({
      shape: {
        id: {
          generator: function(name) {
            let fullPath = config.directory.source.base + '/' + name;
            let id = 'icon-' + fulldirectory.replace(pathPrefix, '').replace(/\//g, separator);
            return id;
          },
        },
        dimension: {
          maxWidth: 32,
          maxHeight: 32
        },
        spacing: {
          padding: 10
        }
      },
      mode: {
        view: {
          bust: false,
          dest: '.',
          example: {
            dest: config.directory.destination.documentation + '/example.sprite.view.html'
          },
          render: {
            scss: {
              dest: config.file.source.spritesheetTemporary
            }
          },
          sprite: config.directory.destination.images + '/sprite.view.svg'
        },
        symbol: {
          bust: false,
          dest: '.',
          example: {
            dest: config.directory.destination.documentation + '/example.sprite.symbol.html'
          },
          sprite: config.directory.destination.images + '/sprite.symbol.svg'
        }
      }
    })
    .on('error', helper.reportError))
    .pipe(gulp.dest(config.directory.root))
    .pipe(remember('icons')) // add back all files to the stream
    .pipe(size({title: 'icons'}))
    .on('error', helper.reportError);
}

export function watch() {
  let watcher = gulp.watch(sourceFiles, ['task']);

  watcher.on('change', (event) => {
    browserSync.reload();

    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches.icons[event.path];
      remember.forget('icons', event.path);
    }
  });
}
