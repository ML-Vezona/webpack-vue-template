// @flow
import { gapv, gabtn } from '@/util/ga';

// https://vuejs.org/v2/guide/custom-directive.html
type DirectiveBinding = {
  name:string,
  value:string,
  oldValue:string,
  expression:any,
  modifiers:Object,
}

export default {
  install(Vue) {
    if (this.installed) return;
    this.installed = true;
    Vue.directive('ga', {
      bind(el:HTMLElement, binding:DirectiveBinding) {
        if (binding.modifiers.pv) gapv(binding.value);
        else if (binding.modifiers.btn) {
          el.gabtn = () => gabtn(binding.value);
          el.addEventListener('click', el.gabtn);
        }
      },
      unbind(el:HTMLElement) {
        if (el.gabtn) {
          el.removeEventListener('click', el.gabtn);
        }
      },
    });
  },
};
