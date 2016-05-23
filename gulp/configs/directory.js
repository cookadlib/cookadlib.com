'use strict';

import packageJson from '../../package.json';

export let directory = {};

directory.destination = {};

// directory.root = `.`;

directory.source = {};

directory.bowerComponents = `/bower_components`;

directory.nodeModules = `/node_modules`;

directory.temporary = `.tmp`;

directory.source.base = `app`;
directory.source.theme = `${directory.source.base}/${packageJson.config.directory.theme}`;

directory.source.bowerComponents = `${directory.source.base}/bower_components`;
directory.source.customStyles = `${directory.source.theme}/styles`;
directory.source.documentation = `${directory.source.base}/documentation`;
directory.source.elements = `${directory.source.base}/elements`;
directory.source.fonts = `${directory.source.theme}/fonts`;
// directory.source.icons = `${directory.source.theme}/images/icons`;
directory.source.images = `${directory.source.theme}/images`;
directory.source.locales = `${directory.source.base}/locales`;
directory.source.markup = directory.source.theme;
directory.source.nodeModules = `${directory.source.base}/node_modules`;
directory.source.scripts = `${directory.source.theme}/scripts`;
directory.source.screenshots = `${directory.source.base}/screenshots`;
directory.source.server = directory.source.base;
directory.source.sounds = `${directory.source.theme}/sounds`;
directory.source.styleguide = `${directory.source.theme}/styleguide`;
directory.source.styles = `${directory.source.theme}/styles`;
directory.source.stylesGenerated = `${directory.source.theme}/styles/generated`;
directory.source.templates = directory.source.theme;
directory.source.tests = `${directory.source.base}/test`;
// directory.source.translations = `${directory.source.base}/translations`;
directory.source.videos = `${directory.source.theme}/videos`;

directory.destination.base = `www`;
directory.destination.theme = `${directory.destination.base}/${packageJson.config.directory.theme}`;

directory.destination.bowerComponents = `${directory.destination.base}/bower_components`;
directory.destination.customStyles = `${directory.destination.theme}/styles`;
directory.destination.documentation = `${directory.destination.theme}/documentation`;
directory.destination.elements = `${directory.destination.theme}/elements`;
directory.destination.fonts = `${directory.destination.theme}/fonts`;
// directory.destination.icons = `${directory.destination.theme}/images/icons`;
directory.destination.images = `${directory.destination.theme}/images`;
directory.destination.locales = `${directory.destination.theme}/locales`;
directory.destination.markup = directory.destination.theme;
directory.destination.nodeModules = `${directory.destination.base}/node_modules`;
directory.destination.scripts = `${directory.destination.theme}/scripts`;
directory.destination.screenshots = `${directory.destination.theme}/screenshots`;
directory.destination.server = directory.destination.base;
directory.destination.sounds = `${directory.destination.theme}/sounds`;
directory.destination.sass = `${directory.destination.theme}/styles/sass`;
directory.destination.styleguide = `${directory.destination.theme}/styleguide`;
directory.destination.styles = `${directory.destination.theme}/styles`;
directory.destination.templates = directory.destination.theme;
directory.destination.tests = `${directory.destination.theme}/test`;
directory.destination.stylesGenerated = `${directory.destination.theme}/styles/generated`;
// directory.destination.translations = `${directory.destination.theme}/translations`;
directory.destination.videos = `${directory.destination.theme}/videos`;

export default directory;
