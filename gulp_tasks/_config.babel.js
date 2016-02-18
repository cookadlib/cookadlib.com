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
config.version = packageJson.version;

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

config.instance = {};

config.instance.pagespeed = {
  key: packageJson.config.pagespeed.key
};

config.instance.vorlon = {
  port: packageJson.config.vorlon.ui.port
};

config.instance.webshot = {
  screenSizes: [
    480,
    600,
    840,
    960,
    1024,
    1280,
    1366,
    1440,
    1600,
    1920,
    2560,
    3840
  ]
};

config.path = {
  deploy: {
    base: 'deploy'
  },
  destination: {
    base: 'www',
    bowerComponents: 'www/' + bowerrc.directory + '/',
    nodeModules: 'www/node_modules/'
  },
  root: '.',
  source: {
    base: 'app',
    bowerComponents: bowerrc.directory + '/',
    nodeModules: 'node_modules/'
  },
  temporary: '.tmp'
};

config.path.source.bowerComponents = config.path.root + '/' + bowerrc.directory;
config.path.source.customStyles = config.path.source.base + '/styles';
config.path.source.documentation = config.path.source.base + '/documentation';
config.path.source.elements = config.path.source.base + '/elements';
config.path.source.fonts = config.path.source.base + '/fonts';
config.path.source.markup = config.path.source.base;
// config.path.source.icons = config.path.source.base + '/images/icons';
config.path.source.images = config.path.source.base + '/images';
config.path.source.locales = config.path.source.base + '/locales';
config.path.source.nodeModules = config.path.root + '/node_modules';
config.path.source.scripts = config.path.source.base + '/scripts';
config.path.source.screenshots = config.path.source.base + '/screenshots';
config.path.source.sounds = config.path.source.base + '/sounds';
config.path.source.styleguide = config.path.source.base + '/styleguide';
config.path.source.styles = config.path.source.base + '/styles';
config.path.source.stylesGenerated = config.path.source.base + '/styles/generated';
config.path.source.templates = config.path.source.base;
config.path.source.tests = config.path.source.base + '/test';
config.path.source.translations = config.path.source.base + '/translations';
config.path.source.videos = config.path.source.base + '/videos';

config.path.destination.bowerComponents = config.path.destination.base + '/' + bowerrc.directory;
config.path.destination.customStyles = config.path.destination.base + '/styles';
config.path.destination.documentation = config.path.destination.base + '/documentation';
config.path.destination.elements = config.path.destination.base + '/elements';
config.path.destination.fonts = config.path.destination.base + '/fonts';
// config.path.destination.icons = config.path.destination.base + '/images/icons';
config.path.destination.images = config.path.destination.base + '/images';
config.path.destination.locales = config.path.destination.base + '/locales';
config.path.destination.markup = config.path.destination.base;
config.path.destination.nodeModules = config.path.destination.base + '/node_modules';
config.path.destination.scripts = config.path.destination.base + '/scripts';
config.path.destination.screenshots = config.path.destination.base + '/screenshots';
config.path.destination.sounds = config.path.destination.base + '/sounds';
config.path.destination.sass = config.path.destination.base + '/styles/sass';
config.path.destination.styleguide = config.path.destination.base + '/styleguide';
config.path.destination.styles = config.path.destination.base + '/styles';
config.path.destination.templates = config.path.destination.base;
config.path.destination.tests = config.path.destination.base + '/test';
config.path.destination.stylesGenerated = config.path.destination.base + '/styles/generated';
config.path.destination.translations = config.path.destination.base + '/translations';
config.path.destination.videos = config.path.destination.base + '/videos';

config.files = {
  source: {},
  destination: {}
};

config.files.source.all = [
  config.path.source.base + '/**/*'
];
config.files.source.bowerComponents = [
  config.path.source.bowerComponents + '/**/*'
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
  config.path.source.elements + '/**/*.html'
];
config.files.source.fonts = [
  config.path.source.fonts + '/**/*.{eot,svg,ttf,woff,woff2}'
];
config.files.source.icons = [
  config.path.source.base + '/**/*.svg'
];
config.files.source.images = [
  config.path.source.images + '/**/*.{gif,jpg,jpeg,png,svg}'
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
  config.path.source.base + '/**/*.html',
  !config.path.source.bowerComponents + '/**/*.html',
  !config.path.source.nodeModules + '/**/*.html'
];
config.files.source.markupIgnored = [
  config.path.source.bowerComponents + '/**/*.html',
  config.path.source.nodeModules + '/**/*.html'
  // config.path.source.elements + '/**/*.html'
];
config.files.source.miscellaneous = [
  config.path.source.base + '/*.{css,ico,json,txt}'
  // config.path.source.bowerComponents + '/{platinum-sw,polymer,promise-polyfill,sw-toolbox,webcomponentsjs}/**/*'
];
config.files.source.miscellaneousIgnored = [
  // config.path.source.nodeModules + '/**/*'
];
config.files.source.nodeModules = [
  config.path.nodeModules + '/**/*'
];
config.files.source.packages = [
  config.path.nodeModules + 'apache-server-configs/dist/.htaccess'
];
config.files.source.scripts = [
  // config.path.source.base + '/**/!(*-min).js'
  config.path.source.base + '/**/*.js'
];
config.files.source.scriptsIgnored = [
  config.path.source.bowerComponents + '/**/*.js',
  config.path.source.nodeModules + '/**/*.js',
  config.path.source.scripts + '/color-scheme-control.js',
  config.path.source.scripts + '/customize-preview.js',
  config.path.source.scripts + '/html5.js',
  config.path.source.scripts + '/jquery.easing.1.3.js',
  config.path.source.scripts + '/jquery.mobile.custom.js',
  config.path.source.scripts + '/jquery.mobile.custom.min.js',
  config.path.source.scripts + '/skip-link-focus-fix.js'
];
config.files.source.sounds = [
  config.path.source.sounds + '/**/*.{ogg,pcm,mp3,wav}'
];
config.files.source.styleguide = [
  config.path.source.styleguide + '/**/*.html',
];
config.files.source.styles = [
  config.path.source.styles + '/**/*.css',
  config.path.source.styles + '/**/*.scss'
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
  config.path.source.templates + '/**/*.{php,phtml,ejs}'
];
config.files.source.tests = [
  config.path.source.tests + '/**/*.html'
];
config.files.source.translations = [
  config.path.source.translations + '/**/*.json'
];
config.files.source.videos = [
  config.path.source.videos + '/**/*.{avi,ogg,mov,mp4,mpg,mpeg}'
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

export default config;
