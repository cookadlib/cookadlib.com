import {
  create as browserSyncInstance
} from 'browser-sync';

// import fs from 'fs';

import * as htmlInjectorInstance from 'bs-html-injector';

import packageJson from '../package.json';

// const bowerrc = JSON.parse(fs.readFileSync('.bowerrc'));

export const browserSync = browserSyncInstance();

export const htmlInjector = htmlInjectorInstance;

export let config = packageJson.config;
config.domain = packageJson.domain;
config.name = packageJson.name;
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

config.screenshots = {};

config.screenshots.sizes = [
  '480x320',
  '1024x768',
  'iphone 5s',
  'iphone 6',
  'iphone 6s',
];

config.path = {
  deploy: {
    base: './deploy'
  },
  destination: {
    base: 'www',
    theme: `www/${packageJson.config.path.theme}`
  },
  root: '.',
  source: {
    base: 'app',
    theme: `app/${packageJson.config.path.theme}`
  },
  temporary: '.tmp'
};

config.path.source.bowerComponents = config.path.source.base + '/bower_components';
config.path.source.nodeModules = config.path.root + '/node_modules';

config.path.source.customStyles = config.path.source.theme + '/styles';
config.path.source.documentation = config.path.source.theme + '/documentation';
config.path.source.elements = config.path.source.theme + '/elements';
config.path.source.fonts = config.path.source.theme + '/fonts';
// config.path.source.icons = config.path.source.theme + '/images/icons';
config.path.source.images = config.path.source.theme + '/images';
config.path.source.locales = config.path.source.theme + '/locales';
config.path.source.markup = config.path.source.theme;
config.path.source.scripts = config.path.source.theme + '/scripts';
config.path.source.screenshots = config.path.source.theme + '/screenshots';
config.path.source.sounds = config.path.source.theme + '/sounds';
config.path.source.styleguide = config.path.source.theme + '/styleguide';
config.path.source.styles = config.path.source.theme + '/styles';
config.path.source.stylesGenerated = config.path.source.theme + '/styles/generated';
config.path.source.templates = config.path.source.theme;
config.path.source.tests = config.path.source.theme + '/test';
config.path.source.translations = config.path.source.theme + '/translations';
config.path.source.videos = config.path.source.theme + '/videos';

config.path.destination.bowerComponents = config.path.destination.base + '/bower_components';
config.path.destination.nodeModules = config.path.destination.base + '/node_modules';

config.path.destination.customStyles = config.path.destination.theme + '/styles';
config.path.destination.documentation = config.path.destination.theme + '/documentation';
config.path.destination.elements = config.path.destination.theme + '/elements';
config.path.destination.fonts = config.path.destination.theme + '/fonts';
// config.path.destination.icons = config.path.destination.theme + '/images/icons';
config.path.destination.images = config.path.destination.theme + '/images';
config.path.destination.locales = config.path.destination.theme + '/locales';
config.path.destination.markup = config.path.destination.theme;
config.path.destination.scripts = config.path.destination.theme + '/scripts';
config.path.destination.screenshots = config.path.destination.theme + '/screenshots';
config.path.destination.sounds = config.path.destination.theme + '/sounds';
config.path.destination.sass = config.path.destination.theme + '/styles/sass';
config.path.destination.styleguide = config.path.destination.theme + '/styleguide';
// config.path.destination.styles = config.path.destination.theme + '/styles';
config.path.destination.styles = config.path.destination.theme + '/styles';
config.path.destination.templates = config.path.destination.theme;
config.path.destination.tests = config.path.destination.theme + '/test';
config.path.destination.stylesGenerated = config.path.destination.theme + '/styles/generated';
config.path.destination.translations = config.path.destination.theme + '/translations';
config.path.destination.videos = config.path.destination.theme + '/videos';

config.files = {
  source: {},
  destination: {}
};

config.files.source.all = [
  config.path.source.base + '/**/*'
];
config.files.source.bowerComponents = [
  config.path.source.bowerComponents + '/**/*.{css,html,js}'
];
config.files.source.bowerConfiguration = [
  '.bowerrc',
  'bower.json'
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
  config.path.source.elements + '/**/*.{css,html,js}'
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
  config.path.source.base + '/**/*.html'
];
config.files.source.markupIgnored = [
  config.path.source.bowerComponents + '/**/*.html',
  config.path.source.nodeModules + '/**/*.html',
  config.path.source.elements + '/**/*.html'
];
config.files.source.markupHtmlhintFilter = [
  config.path.source.styleguide + '/templates/module.html',
  config.path.source.styles + '/app-theme.html',
  config.path.source.styles + '/shared-styles.html'
];
config.files.source.miscellaneous = [
  config.path.source.base + '/*.{css,ico,json,txt}'
];
config.files.source.miscellaneousIgnored = [
  // config.path.source.nodeModules + '/**/*'
];
config.files.source.nodeConfiguration = [
  'package.json'
];
config.files.source.nodeModules = [
  config.path.nodeModules + '/**/*.{css,html,js}'
];
config.files.source.packages = [
  config.path.nodeModules + 'apache-server-configs/dist/.htaccess'
];
config.files.source.scripts = [
  // config.path.source.scripts + '/**/!(*-min).js'
  config.path.source.scripts + '/**/*.js'
];
config.files.source.scriptsIgnored = [
  // config.path.source.bowerComponents + '/**/*.js',
  // config.path.source.nodeModules + '/**/*.js',
  config.path.source.scripts + '/color-scheme-control.js',
  config.path.source.scripts + '/customizer.js',
  config.path.source.scripts + '/navigation.js',
  config.path.source.scripts + '/skip-link-focus-fix.js'
];
config.files.source.sounds = [
  config.path.source.sounds + '/**/*.{ogg,pcm,mp3,wav}'
];
config.files.source.styleguide = [
  config.path.source.styleguide + '/**/*.html',
];
config.files.source.styles = [
  // config.path.source.styles + '/**/*.css',
  config.path.source.styles + '/**/*.scss'
];
config.files.source.stylesIgnored = [
  // config.path.source.styles + '/mixins/_media-query-aspect-ratio.scss',
  // config.path.source.styles + '/mixins/_media-query-width.scss',
  config.path.source.styles + '/generated/**/*.scss',
  config.path.source.styles + '/library/**/*.scss'
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
  debugInfo: true,
  // files: [
  //   config.path.destination.base + '/**',
  //   '!' + config.path.destination.base + '/**/*.{map,scss}'
  // ],  //site-wide reload
  ghostMode: {
    clicks: true,
    forms: true,
    scroll: true
  },
  // Run as an https by uncommenting 'https: true'
  // Note: this uses an unsigned certificate which on first access will present a certificate warning in the browser.
  // https: true,
  logConnections: true,
  logFileChanges: true,
  logPrefix: 'Browsersync',
  logSnippet: true,
  notify: true,
  open: true,
  port: packageJson.config.browsersync.socket.port,
  reloadOnRestart: false,
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

if(packageJson.config.browsersync.proxy) {
  config.instance.browsersync.proxy = {
    middleware: function (req, res, next) {
      'use strict';
      // res.setHeader('Access-Control-Allow-Credentials', 'false');
      // res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Origin', 'TRUE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      next();
    },
    target: `${packageJson.config.browsersync.proxy.hostname}:${packageJson.config.browsersync.proxy.port}`
  };
} else {
  config.instance.browsersync.server = {
    baseDir: [
      config.path.temporary,
      config.path.destination.base
    ]
    // ,
    // routes: {
    //   '/bower_components': config.path.source.bowerComponents,
    //   '/node_modules': config.path.source.nodeModules,
    // }
  };
}

export default config;
