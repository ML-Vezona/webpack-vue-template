import VueRouter from 'vue-router';
import Vue from 'vue';

const Index = () => import(/* webpackChunkName: "index" */ '@/container/Index');

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    component: Index,
  },
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

// router.beforeEach((to, from, next) => {
//   next();
// });

export default router;
