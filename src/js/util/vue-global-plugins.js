import Rx from 'rxjs/Rx';
import VueRx from 'vue-rx';
import vueGa from '@/directive/vue-ga';

export default {
  install(Vue) {
    if (this.installed) return;
    this.installed = true;

    Vue.use(vueGa);
    Vue.use(VueRx, Rx);

    const devMixin = {
      created() {
        console.log(`%c created ${this.$options.name} `, 'background:darkgreen;color:white');
      },

      mounted() {
        console.log(`%c mounted ${this.$options.name} `, 'background:darkblue;color:white');
      },

      destroyed() {
        console.log(`%c destoryed ${this.$options.name} `, 'background:darkred;color:white');
      },
    };

    Vue.mixin({
      ...(process.env.NODE_ENV === 'development' ? devMixin : null),
    });
  },
};
