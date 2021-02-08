import { createApp } from './app';

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp();
  router.push(context.url);
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
      reject({ code: 404, message: `not find router-path:${context.url}` });
      return;
    }
    context.state = store.state;
    resolve(app);
  }, reject);
});

