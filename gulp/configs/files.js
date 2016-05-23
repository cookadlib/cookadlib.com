'use strict';

import directory from './directory';

export let files = {};

files.source = {};
files.destination = {};

files.source.all = [
  `${directory.source.base}/**/*`
];
files.source.bowerComponents = [
  `${directory.source.bowerComponents}/**/*.{css,html,js}`
];
files.source.bowerConfiguration = [
  `.bowerrc`,
  `bower.json`
];
files.source.configuration = {
  json: `/{*.json,.*rc}`,
  yaml: `/{*.yml,.*.yml}`
};
files.source.customStyles = [
  `${directory.source.customStyles}/*.html`
];
files.source.documentation = [
  `${directory.source.base}/README.md`
];
files.source.elements = [
  `${directory.source.elements}/**/*.{css,html,js}`
];
files.source.fonts = [
  `${directory.source.fonts}/**/*.{eot,svg,ttf,woff,woff2}`
];
files.source.gulp = [
  `/gulpfile{js,.babel.js}`,
  `/gulp/**/*.js`
];
files.source.icons = [
  `${directory.source.base}/**/*.svg`
];
files.source.images = [
  `${directory.source.images}/**/*.{gif,jpg,jpeg,png,svg}`
];
files.source.json = [
  `${directory.source.base}/**/*.json`
];
files.source.locales = [
  `${directory.source.locales}/**/*.json`
];
files.source.maps = [
  `${directory.source.base}/**/*.map`
];
files.source.markup = [
  `${directory.source.base}/**/*.html`
];
files.source.markupIgnored = [
  `${directory.source.bowerComponents}/**/*.html`,
  `${directory.source.nodeModules}/**/*.html`,
  `${directory.source.elements}/**/*.html`,
  `${directory.source.styleguide}/**/*.html`,
  `${directory.source.tests}/**/*.html`
];
files.source.markupHtmlhintFilter = [
  `${directory.source.styleguide}/templates/module.html`,
  `${directory.source.styles}/app-theme.html`,
  `${directory.source.styles}/shared-styles.html`
];
files.source.miscellaneous = [
  `${directory.source.base}/*.{css,ico,json,txt}`
];
files.source.miscellaneousIgnored = [
  // `${directory.source.nodeModules}/**/*`
];
files.source.nodeConfiguration = [
  `package.json`
];
files.source.nodeModules = [
  `${directory.nodeModules}/**/*.{css,html,js}`
];
files.source.packages = [
  `${directory.nodeModules}apache-server-configs/dist/.htaccess`
];
files.source.scripts = [
  // `${directory.source.scripts}/**/!(*-min).js`
  `${directory.source.scripts}/**/*.js`
];
files.source.scriptsIgnored = [
  `${directory.source.bowerComponents}`,
  // `${directory.source.nodeModules}/**/*.js`,
  `${directory.source.scripts}/color-scheme-control.js`,
  `${directory.source.scripts}/customizer.js`,
  `${directory.source.scripts}/navigation.js`,
  `${directory.source.scripts}/skip-link-focus-fix.js`
];
files.source.server = [
  `${directory.source.base}/*.js`
];
files.source.serviceWorker = [
  `${directory.source.base}/sw-import.js`
];
files.source.sounds = [
  `${directory.source.sounds}/**/*.{ogg,pcm,mp3,wav}`
];
files.source.styleguide = [
  `${directory.source.styleguide}/**/*.html`,
];
files.source.styles = [
  // `${directory.source.styles}/**/*.css`,
  `${directory.source.styles}/**/*.scss`
];
files.source.stylesIgnored = [
  // `${directory.source.styles}/mixins/_media-query-aspect-ratio.scss`,
  // `${directory.source.styles}/mixins/_media-query-width.scss`,
  `${directory.source.styles}/generated/**/*.scss`,
  `${directory.source.styles}/library/**/*.scss`
];
files.source.templates = [
  `${directory.source.templates}/**/*.{php,phtml,ejs}`
];
files.source.tests = [
  `${directory.source.tests}/**/*.html`
];
// files.source.translations = [
//   `${directory.source.translations}/**/*.json`
// ];
files.source.videos = [
  `${directory.source.videos}/**/*.{avi,ogg,mov,mp4,mpg,mpeg}`
];

files.destination.all = [
  `${directory.destination.base}/**/*`
];

export default files;
