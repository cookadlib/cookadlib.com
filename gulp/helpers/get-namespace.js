'use strict';

import camelCase from 'camelcase';
import path from 'path';

export default function getNamespace(filename) {
  const name = path.parse(filename).name;

  return camelCase(name);
}
