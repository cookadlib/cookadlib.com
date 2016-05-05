'use strict';

import name from './name';
import directory from './directory';

let file = {};

file.source = {};
file.destination = {};

file.source.index = directory.source.base + '/' + name.index;
file.source.indexBuild = directory.source.base + '/' + name.indexBuild;
file.source.spritesheetTemporary = directory.source.stylesGenerated + '/' + name.spritesheetTemporary;
file.source.spritesheet = directory.source.stylesGenerated + '/' + name.spritesheet;
file.source.webcomponentsjs = directory.source.bowerComponents + '/' + name.webcomponentsjs;

file.destination.index = directory.destination.base + '/' + name.index;
file.destination.indexBuild = directory.destination.base + '/' + name.indexBuild;
file.destination.spritesheetTemporary = directory.destination.stylesGenerated + '/' + name.spritesheetTemporary;
file.destination.spritesheet = directory.destination.stylesGenerated + '/' + name.spritesheet;

export default file;
