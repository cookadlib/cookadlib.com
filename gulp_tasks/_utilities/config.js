'use strict';

var directory = require(__dirname + '/directory');

module.exports = {
  images: {
    src: directory.source + '/images/**',
    dest: directory.destination + '/images'
  },
  scripts: {
    src: directory.source + '/js/**/*.js',
    dest: directory.destination + '/scripts'
  },
  styles: {
    src: directory.source + '/sass/*.scss',
    dest: directory.destination + '/styles'
  },
  markup: {
    src: directory.source + '/**/*.html',
    dest: directory.destination
  }
};
