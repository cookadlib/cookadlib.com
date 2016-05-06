'use strict';

import packageJson from '../../package.json';

export let vorlon = {
  port: packageJson.config.vorlon.ui.port
};

export default vorlon;
