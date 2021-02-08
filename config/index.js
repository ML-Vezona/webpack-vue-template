
/* if (!process.env.NODE_ENV || !process.env.APP_ENV) {
  throw new Error('The NODE_ENV and APP_ENV environment variable is required.');
} */
if (typeof window !== 'undefined') {
  throw new Error('config should not be included in frontend scope');
}
const { version } = require('../package.json');

console.log('config', process.env.APP_ENV);

const config = {
  base: {
    VERSION: version,
    baseURL: 'http://52.175.149.244/',
    apiPath: '/API/FATHERSDAY/',
    imgPath: '/',
    APP_ENV: process.env.APP_ENV,
  },
  dev: {
  },
  stage: {
    baseURL: '',
  },
  release: {
    baseURL: '',
  },
};

module.exports = Object.assign(
  {},
  config.base,
  config[process.env.APP_ENV],
);
