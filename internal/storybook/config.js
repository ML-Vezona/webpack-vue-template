import { configure } from '@storybook/vue';
import Vue from 'vue';
import Vuex from 'vuex';
import vueGlobalPlugins from '../../src/js/util/vue-global-plugins';

import { setOptions } from '@storybook/addon-options';

import './FakeComponent';


vueGlobalPlugins.install(Vue);

// Register custom components.
Vue.use(Vuex);

setOptions({
  name: 'milkmidi',
  url: 'https://github.com/MedialandDev/anteater/',
  addonPanelInRight: true,
});

if (typeof window !== 'undefined') {
  window.regeneratorRuntime = require('babel-runtime/regenerator');
}
if (process.env.NODE_ENV === 'development') {
  document.body.classList.add('debug');
}

/* eslint-disable */
// copy src/asset/copy
require('!!style-loader!css-loader!stylus-loader!../../src/css/app.styl');
/* eslint-enabled */

const req = require.context('../../src', true, /stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
