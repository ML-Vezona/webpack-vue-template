const path = require('path');

const DEV_MODE = process.env.NODE_ENV === 'development';
const WEINRE_MODE = DEV_MODE && process.env.WEINRE;
const config = require('../../config');

const toFilename = (pathName, ext = 'js', isHashFileName = true) => {
  const units = [pathName, '.', ext];
  if (!DEV_MODE) {
    const hashType = ext === 'js' ? '[chunkhash]' : '[contenthash]';
    if (isHashFileName) {
      units.splice(1, 0, `-${hashType}`);
    } else {
      units.push(`?${hashType}`);
    }
  }
  return units.join('');
};

const cwd = (file = '') => path.join(process.cwd(), file);

const getLocalhostIPAddress = () => {
  const ifs = require('os').networkInterfaces();
  // eslint-disable-next-line
  const host = `${Object.keys(ifs).map(x => ifs[x].filter(x => x.family === 'IPv4' && !x.internal)[0]).filter(x => x)[0].address}`;
  return host || 'localhost';
};

const createPugHtmlLoaderOptions = (stringify = false) => {
  const options = {
    data: {
      DEV_MODE,
      APP_ENV: process.env.APP_ENV,
      weinreScript: WEINRE_MODE ? `http://${getLocalhostIPAddress()}:8000/target/target-script-min.js#anonymous` : false,
      ...config,
    },
    pretty: DEV_MODE,
  };
  return stringify ? JSON.stringify(options) : options;
};

module.exports = {
  toFilename,
  cwd,
  getLocalhostIPAddress,
  createPugHtmlLoaderOptions,
};
