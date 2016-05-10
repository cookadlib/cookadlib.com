'use strict';

import historyApiFallback from 'connect-history-api-fallback';
import htmlInjector from 'bs-html-injector';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

const defaultNamespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.markup;
sourceFiles = sourceFiles.concat(config.files.source.markupIgnored.map(function(path) {
  return '!' + path;
}));

function onBrowsersyncInit() {

  if(config.browsersync.server) {
    config.browsersync.server.middleware = [
      historyApiFallback()
    ];
    console.info('Browsersync server set via config.browsersync.server, not using config.browsersync.proxy');
  } else if(config.browsersync.proxy) {
    console.info('Browsersync server set via config.browsersync.proxy, not using config.browsersync.server');
  }

  // console.info(
  //   'To connect from an iOS device:\n',
  //   util.colors.magenta(
  //     'Go to Settings > Wi-Fi\n',
  //     'Tap the information icon next to the Wi-Fi network name that the device is connected to.\n',
  //     'From the Wi-Fi network settings page, set HTTP Proxy to "Auto"\n',
  //     `Enter "${config.browsersync.proxy.protocol}://${browserSync.instance.utils.devIp}" into the "URL" field\n`,
  //     `Enter ${browserSync.instance.options.get('urls').get('external')} into the browser address bar\n`
  //   )
  // );
}

export function task(namespace = defaultNamespace) {
  // browserSync.use(htmlInjector, {
  //   files: sourceFiles
  // });

  browserSync.init(config.browsersync, onBrowsersyncInit);
}

export function watch(namespace = defaultNamespace) {
  return helper.defineWatcher(namespace, sourceFiles, task);
}
