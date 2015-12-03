import {
  create as browserSyncCreate
} from 'browser-sync';

import fs from 'fs';

import packageJson from '../package.json';

const bowerrc = JSON.parse(fs.readFileSync('.bowerrc'));

export const browserSync = browserSyncCreate();

export let config = {};

config.name = packageJson.name;
config.domain = packageJson.domain;

config.connection = {
  staging: {
    base: '/var/www/html/tdm/site',
    host: 'staging-01',
    user: 'wednesday-admin',
    privateKey: '/Users/karl/.ssh/wednesday-admin',
    port: 22
  }
};

config.port = {
  http: process.env.PORT ? process.env.PORT : packageJson.config.http.port
};

config.instance = {
  pagespeed: {
    key: packageJson.config.pagespeed.key
  }
};

config.path = {
  deploy: {
    base: 'deploy'
  },
  destination: {
    base: 'www',
    theme: 'www' + packageJson.config.path.theme
  },
  root: '.',
  source: {
    base: 'app',
    theme: 'app' + packageJson.config.path.theme
  },
  temporary: '.tmp',
  theme: packageJson.config.path.theme
};

config.path.source.bowerComponents = config.path.root + '/' + bowerrc.directory;
config.path.source.customStyles = config.path.source.base + '/styles';
config.path.source.documentation = config.path.source.base + '/documentation';
config.path.source.elements = config.path.source.base + '/elements';
config.path.source.fonts = config.path.source.theme + '/fonts';
config.path.source.markup = config.path.source.theme;
// config.path.source.icons = config.path.source.theme + '/images/icons';
config.path.source.images = config.path.source.theme + '/images';
config.path.source.locales = config.path.source.base + '/locales';
config.path.source.nodeModules = config.path.root + '/node_modules';
config.path.source.scripts = config.path.source.theme + '/scripts';
config.path.source.screenshots = config.path.source.base + '/screenshots';
config.path.source.sounds = config.path.source.theme + '/sounds';
config.path.source.styleguide = config.path.source.base + '/styleguide';
config.path.source.styles = config.path.source.theme + '/styles';
config.path.source.stylesGenerated = config.path.source.theme + '/styles/generated';
config.path.source.tests = config.path.source.base + '/test';
config.path.source.videos = config.path.source.base + '/videos';

config.path.destination.bowerComponents = config.path.destination.base + '/' + bowerrc.directory;
config.path.destination.customStyles = config.path.destination.base + '/styles';
config.path.destination.documentation = config.path.destination.base + '/documentation';
config.path.destination.elements = config.path.destination.base + '/elements';
config.path.destination.fonts = config.path.destination.theme + '/fonts';
// config.path.destination.icons = config.path.destination.theme + '/images/icons';
config.path.destination.images = config.path.destination.theme + '/images';
config.path.destination.locales = config.path.destination.base + '/locales';
config.path.destination.markup = config.path.destination.theme;
config.path.destination.nodeModules = config.path.destination.base + '/node_modules';
config.path.destination.scripts = config.path.destination.theme + '/scripts';
config.path.destination.screenshots = config.path.destination.base + '/screenshots';
config.path.destination.sounds = config.path.destination.theme + '/sounds';
config.path.destination.sass = config.path.destination.theme + '/styles/sass';
config.path.destination.styleguide = config.path.destination.base + '/styleguide';
config.path.destination.styles = config.path.destination.theme + '/styles';
config.path.destination.tests = config.path.destination.base + '/test';
config.path.destination.stylesGenerated = config.path.destination.theme + '/styles/generated';
config.path.destination.videos = config.path.destination.base + '/videos';

config.files = {
  source: {},
  destination: {}
};

config.files.source.all = [
  config.path.source.base + '/**/*'
];
config.files.source.configuration = {
  json: config.path.root + '/{*.json,.*rc}',
  yaml: config.path.root + '/{*.yml,.*.yml}'
};
config.files.source.customStyles = [
  config.path.source.customStyles + '/*.html'
];
config.files.source.documentation = [
  config.path.source.base + '/README.md'
];
config.files.source.elements = [
  config.path.source.elements + '/*.html'
];
config.files.source.fonts = [
  config.path.source.fonts + '/**/*.{eot,svg,ttf,woff}'
];
config.files.source.icons = [
  config.path.source.base + '/**/*.svg'
];
config.files.source.images = [
  config.path.source.base + '/**/*.{gif,jpg,jpeg,png,svg}'
];
config.files.source.json = [
  config.path.source.base + '/**/*.json'
];
config.files.source.locales = [
  config.path.source.locales + '/**/*.json'
];
config.files.source.maps = [
  config.path.source.base + '/**/*.map'
];
config.files.source.markup = [
  config.path.source.base + '/**/*.html'
];
config.files.source.miscellaneous = [
  config.path.source.base + '/*.{css,ico,json,txt}'
];
config.files.source.scripts = [
  // config.path.source.base + '/**/!(*-min).js'
  config.path.source.base + '/**/*.js'
];
config.files.source.scriptsIgnored = [
  config.path.source.scripts + '/color-scheme-control.js',
  config.path.source.scripts + '/customize-preview.js',
  config.path.source.scripts + '/html5.js',
  config.path.source.scripts + '/jquery.easing.1.3.js',
  config.path.source.scripts + '/jquery.mobile.custom.js',
  config.path.source.scripts + '/jquery.mobile.custom.min.js',
  config.path.source.scripts + '/skip-link-focus-fix.js'
];
config.files.source.sounds = [
  config.path.source.base + '/**/*.{ogg,pcm,mp3,wav}'
];
config.files.source.styleguide = [
  config.path.source.styleguide + '/**/*.html',
];
config.files.source.styles = [
  config.path.source.base + '/**/*.scss'
];
config.files.source.stylesIgnored = [
  config.path.source.styles + '/mixins/_media-query-aspect-ratio.scss',
  config.path.source.styles + '/mixins/_media-query-width.scss',
  config.path.source.styles + '/generated/**/*.scss'
];
config.files.source.tasks = [
  config.path.root + '/gulpfile.js',
  config.path.root + '/gulpfile.babel.js',
  config.path.root + '/gulp_tasks/**/*.js'
];
config.files.source.templates = [
  config.path.source.base + '/**/*.{php,phtml,ejs}'
];
config.files.source.tests = [
  config.path.source.tests + '/**/*.html'
];
config.files.source.videos = [
  config.path.source.base + '/**/*.{avi,ogg,mov,mp4,mpg,mpeg}'
];

config.files.destination.all = [
  config.path.destination.base + '/**/*'
];

config.filename = {
  index: 'index.html',
  indexBuild: 'index.build.html',
  spritesheet: '_sprites.scss',
  spritesheetTemporary: '_sprites-tmp.scss'
};

config.file = {
  source: {},
  destination: {}
};

config.file.source.index = config.path.source.base + '/' + config.filename.index;
config.file.source.indexBuild = config.path.source.base + '/' + config.filename.indexBuild;
config.file.source.spritesheetTemporary = config.path.source.stylesGenerated + '/' + config.filename.spritesheetTemporary;
config.file.source.spritesheet = config.path.source.stylesGenerated + '/' + config.filename.spritesheet;

config.file.destination.index = config.path.destination.base + '/' + config.filename.index;
config.file.destination.indexBuild = config.path.destination.base + '/' + config.filename.indexBuild;
config.file.destination.spritesheetTemporary = config.path.destination.stylesGenerated + '/' + config.filename.spritesheetTemporary;
config.file.destination.spritesheet = config.path.destination.stylesGenerated + '/' + config.filename.spritesheet;

config.instance.browsersync = {
  browser: [
    'google chrome'
  ],
  files: [
    config.path.destination.base + '/**',
    '!' + config.path.destination.base + '/**/*.scss',
    '!' + config.path.destination.base + '/**/*.map'
  ],
  // Run as an https by uncommenting 'https: true'
  // Note: this uses an unsigned certificate which on first access will present a certificate warning in the browser.
  // https: true,
  logPrefix: packageJson.name,
  notify: false,
  open: false,
  port: packageJson.config.browsersync.socket.port,
  // proxy: 'http://localhost:' + config.port.http,
  server: {
    baseDir: [
      config.path.temporary,
      config.path.destination.base
    ],
    routes: {
      '/bower_components': config.path.source.bowerComponents,
      '/node_modules': config.path.source.nodeModules,
    }
  },
  snippetOptions: {
    rule: {
      match: '<span id="browser-sync-binding"></span>',
      fn: function (snippet) {
        'use strict';
  //       // temporary workaround below as browser-sync 2.7.11 tries to inject
  //       // the client with an incorrect version number appended to the filename
  //       snippet = '<script async src="/browser-sync/browser-sync-client.js"></script>';
  //       console.log('snippet', snippet);
        return snippet;
      }
    }
  },
  ui: {
    port: packageJson.config.browsersync.ui.port
  }
};

config.instance.vorlon = {
  port: packageJson.config.vorlon.ui.port
};

export default config;
