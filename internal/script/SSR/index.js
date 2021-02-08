/* eslint no-console:0, import/no-unresolved:0 */
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const { createBundleRenderer } = require('vue-server-renderer');
const chalk = require('chalk');
require('./fakeWindow');

const clientManifest = require('../../../dist/vue-ssr-client-manifest.json');
const serverBundle = require('../../../dist/vue-ssr-server-bundle.json');

const ROOT = path.resolve('');

const ROUTERS = [
  '/',
  ...[1, 2, 3, 4, 5, 6, 7, 8].map(i => [`/green/${i}`,
    `/green/${i}/myself`, `/green/${i}/friend`,
    `/green/${i}/myself/share`, `/green/${i}/friend/share`])
    .reduce((last, next) => last.concat(next), []),
  ...[1, 2, 3, 4, 5, 6, 7, 8].map(i => [`/red/${i}`,
    `/red/${i}/myself`, `/red/${i}/friend`,
    `/red/${i}/myself/share`, `/red/${i}/friend/share`])
    .reduce((last, next) => last.concat(next), []),
  ...[1, 2, 3, 4, 5, 6, 7, 8].map(i => [`/purple/${i}`,
    `/purple/${i}/myself`, `/purple/${i}/friend`,
    `/purple/${i}/myself/share`, `/purple/${i}/friend/share`])
    .reduce((last, next) => last.concat(next), []),
];


const template = fs.readFileSync(path.resolve('dist/index.html'), 'utf-8');
// const template = fs.readFileSync(path.resolve('src/html/ssr.html'), 'utf-8');

const renderer = createBundleRenderer(serverBundle, {
  // template,
  runInNewContext: false,
  clientManifest,
});

const generateHTML = url => new Promise((resolve, reject) => {
  const context = {
    // head: `<!--${url}-->`,
    // styles: '<style>body{background-color:green}</style>',
    // state: JSON.stringify({ name: `state${url}` }),
    url,
  };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      reject(err);
      return;
    }
    let toPath = `${ROOT}/dist/`;
    const fileName = '/index.html';
    if (url !== '/') {
      toPath += url.substr(1);
      if (!fs.existsSync(toPath)) {
        fs.mkdirSync(toPath);
      }
    }
    fs.writeFileSync(toPath + fileName, template.replace('<div id="app"></div>', html));
    console.log(chalk.bgCyan(`generateHTML:${url}`));
    console.log(html);
    resolve();
  });
});

const rimrafPromise = file => new Promise((resolve, reject) => rimraf(file, error => (error ? reject(error) : resolve())));

const promiseSequence = (routers, fn) => routers.reduce((promise, url) => promise.then(() => fn(url)), Promise.resolve());


promiseSequence(ROUTERS, generateHTML)
  .then(() => Promise.all([
    rimrafPromise(`${ROOT}/dist/vue-ssr-client-manifest.json`),
    rimrafPromise(`${ROOT}/dist/vue-ssr-server-bundle.json`),
  ]))
  .then(() => {
    console.log(chalk.bgCyan('vue ssr generate complete'));
    process.exit(0);
  }).catch((err) => {
    console.log(err);
    console.error(chalk.bgRed(err));
    process.exit(0);
  });
