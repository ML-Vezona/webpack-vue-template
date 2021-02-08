import Vue from 'vue';
import App from '@/container/App';
import vueGlobalPlugins from '@/util/vue-global-plugins';
import router from '@/router';
import store from '@/store';
// import './util/init';

vueGlobalPlugins.install(Vue);

const { history } = window;
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

export function createApp() {
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });
  return { app, router, store };
}
