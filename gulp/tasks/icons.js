'use strict';

import cache from 'gulp-cached';
import debug from 'gulp-debug';
import gulp from 'gulp';
import remember from 'gulp-remember';
import size from 'gulp-size';
import svgSprite from 'gulp-svg-sprite';

import * as config from '../config';
import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

let pathPrefix = config.directory.source.images.replace(/^\/|\/$/g, '') + '/';

let sourceFiles = config.files.source.icons;

let separator = '-';

export function task(namespace = defaultNamespace) {
  return gulp.src(sourceFiles, {
      base: config.directory.source.base
    })
    .pipe(cache(namespace))
    .pipe(debug({
      title: namespace
    }))
    .pipe(svgSprite({
      shape: {
        id: {
          generator: function(name) {
            let fullPath = config.directory.source.base + '/' + name;
            let id = 'icon-' + fullPath.replace(pathPrefix, '').replace(/\//g, separator);
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
    .pipe(remember(namespace))
    .pipe(size({title: namespace}))
    .on('error', helper.reportError);
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}
