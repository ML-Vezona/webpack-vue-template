/* eslint no-underscore-dangle:0 */
import { createApp } from './app';

const { app, store } = createApp();
if (store && window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
app.$mount('#app');
