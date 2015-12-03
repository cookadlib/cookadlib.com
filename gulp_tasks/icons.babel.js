'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import svgSprite from 'gulp-svg-sprite';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

let sourceFiles = config.files.source.icons;

let pathPrefix = config.path.source.images.replace(/^\/|\/$/g, '') + '/';

// console.log('config.path.source.images', config.path.source.images);
// console.log('pathPrefix', pathPrefix);

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
            // console.log('name', name);
            let fullPath = config.path.source.base + '/' + name;
            // console.log('fullPath', fullPath);
            let id = 'icon-' + fullPath.replace(pathPrefix, '').replace(/\//g, separator);
            // console.log('id', id);
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
          // prefix: '.icon' + separator + 'view',
          sprite: config.path.destination.images + '/sprite.view.svg'
        },
        symbol: {
          bust: false,
          dest: '.',
          example: {
            dest: config.path.destination.documentation + '/example.sprite.symbol.html'
          },
          // prefix: '.icon' + separator + 'symbol',
          sprite: config.path.destination.images + '/sprite.symbol.svg'
        }
      }
    })
    .on('error', reportError))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.path.root))
    .on('error', reportError);
});

gulp.task('icons:watch', function() {
  gulp.watch(sourceFiles, ['icons']);
});
