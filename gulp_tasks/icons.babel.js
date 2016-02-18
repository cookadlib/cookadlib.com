'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import size from 'gulp-size';
import svgSprite from 'gulp-svg-sprite';

import {config, browserSync} from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.icons;

let pathPrefix = config.path.source.images.replace(/^\/|\/$/g, '') + '/';

let separator = '-';

gulp.task('icons', () => {
  return gulp.src(sourceFiles, {
      base: config.path.source.base
    })
    .pipe(plumber({
      errorHandler: reportError
    }))
    .pipe(debug({
      title: 'icons:'
    }))
    .pipe(svgSprite({
      shape: {
        id: {
          generator: function(name) {
            let fullPath = config.path.source.base + '/' + name;
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
            dest: config.path.destination.documentation + '/example.sprite.view.html'
          },
          render: {
            scss: {
              dest: config.file.source.spritesheetTemporary
            }
          },
          sprite: config.path.destination.images + '/sprite.view.svg'
        },
        symbol: {
          bust: false,
          dest: '.',
          example: {
            dest: config.path.destination.documentation + '/example.sprite.symbol.html'
          },
          sprite: config.path.destination.images + '/sprite.symbol.svg'
        }
      }
    })
    .on('error', reportError))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.path.root))
    .pipe(size({title: 'icons'}))
    .on('error', reportError);
});

gulp.task('icons:watch', () => {
  gulp.watch(sourceFiles, ['icons'], browserSync.reload);
});
