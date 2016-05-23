'use strict';

import directory from './directory';
import filename from './filename';

export let file = {};

file.source = {};
file.destination = {};

file.source.icon = `${directory.source.images}/branding/logos/${filename.icon}`;
file.source.index = `${directory.source.base}/${filename.index}`;
file.source.indexBuild = `${directory.source.base}/${filename.indexBuild}`;
file.source.spritesheetTemporary = `${directory.source.stylesGenerated}/${filename.spritesheetTemporary}`;
file.source.spritesheet = `${directory.source.stylesGenerated}/${filename.spritesheet}`;
file.source.webcomponentsjs = `${directory.source.bowerComponents}/${filename.webcomponentsjs}`;

file.destination.index = `${directory.destination.base}/${filename.index}`;
file.destination.indexBuild = `${directory.destination.base}/${filename.indexBuild}`;
file.destination.spritesheetTemporary = `${directory.destination.stylesGenerated}/${filename.spritesheetTemporary}`;
file.destination.spritesheet = `${directory.destination.stylesGenerated}/${filename.spritesheet}`;

export default file;
