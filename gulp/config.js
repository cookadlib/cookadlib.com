'use strict';

import {
  create as browserSyncInstance
} from 'browser-sync';

// import fs from 'fs';
import * as htmlInjectorInstance from 'bs-html-injector';
import superstatic from 'superstatic';

// export const packageJson from '../package.json';

// export const bowerrc from '../.bowerrc';
// export const bowerrc = JSON.parse(fs.readFileSync('.bowerrc'));

export const browserSync = browserSyncInstance();

export const htmlInjector = htmlInjectorInstance;

export {default as directory} from './configs/directory';
export {default as file} from './configs/file';
export {default as files} from './configs/files';
export {default as instance} from './configs/instance';
export {default as name} from './configs/name';
export {default as screenshots} from './configs/screenshots';
