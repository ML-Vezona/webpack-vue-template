import Rx from 'rxjs/Rx';

const defaultOptions = {
  offset: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  threshold: 0,
};

const checkView = (element, options) => {
  const { top, left, right, bottom, width, height } = element.getBoundingClientRect();

  const intersection = {
    top: bottom,
    left: right,
    right: window.innerWidth - left,
    bottom: window.innerHeight - top,
  };

  const threshold = {
    x: options.threshold * width,
    y: options.threshold * height,
  };

  return intersection.top > (options.offset.top + threshold.y)
    && intersection.left > (options.offset.left + threshold.x)
    && intersection.right > (options.offset.right + threshold.x)
    && intersection.bottom > (options.offset.bottom + threshold.y);
};

const scroll = Rx.Observable.fromEvent(window, 'scroll');
const resize = Rx.Observable.fromEvent(window, 'resize');
// const loaded = Rx.Observable.fromEvent(window, 'load');
const mutate = Rx.Observable.create((observer) => {
  if (!window.MutationObserver) {
    observer.complete();
    return;
  }
  window.addEventListener('DOMContentLoaded', () => {
    new MutationObserver(observer.next)
      .observe(document.body, {
        attributes: true,
        chilkList: true,
        subtree: true,
      });
    observer.next();
  });
});

const source = Rx.Observable
  // .of(scroll, resize, loaded, mutate)
  .of(scroll, resize, mutate)
  .concatAll()
  .debounceTime(100);

export default (element, options) => {
  const customOptions = { ...defaultOptions, ...options };
  return source.map(() => checkView(element, customOptions))
    .startWith(checkView(element, customOptions))
    .distinctUntilChanged();
};
