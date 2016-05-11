'use strict';

import historyApiFallback from 'connect-history-api-fallback';
// import htmlInjector from 'bs-html-injector';

import * as config from '../config';
import {browserSync} from '../instances';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

function onBrowsersyncInit() {

  if(config.browserSync.server) {
    config.browserSync.server.middleware = [
      historyApiFallback()
    ];
    console.info('Browsersync server set via config.browserSync.server, not using config.browserSync.proxy');
  } else if(config.browserSync.proxy) {
    console.info('Browsersync server set via config.browserSync.proxy, not using config.browserSync.server');
  }

  // console.info(
  //   'To connect from an iOS device:\n',
  //   util.colors.magenta(
  //     'Go to Settings > Wi-Fi\n',
  //     'Tap the information icon next to the Wi-Fi network name that the device is connected to.\n',
  //     'From the Wi-Fi network settings page, set HTTP Proxy to "Auto"\n',
  //     `Enter "${config.browserSync.proxy.protocol}://${browserSync.instance.utils.devIp}" into the "URL" field\n`,
  //     `Enter ${browserSync.instance.options.get('urls').get('external')} into the browser address bar\n`
  //   )
  // );
}

export function task(done) {
  // browserSync.use(htmlInjector, {
  //   files: sourceFiles
  // });
  // may have to import a global variable in order to collate all of the htmlInjector sources

  return browserSync.init(config.browserSync, done);
}

task.displayName = namespace;
task.description = 'Run Browsersync server';

export default task;
