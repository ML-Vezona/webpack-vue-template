/* eslint no-bitwise: 0, func-names: 0, no-console:0 */
if (typeof (window) !== 'undefined' && typeof (document) !== 'undefined') {
  const reduce = (p, c) => p + String.fromCharCode(c >> 1);
  const emptyFun = () => { };
  const fakeConsole = { log: emptyFun, warn: emptyFun, error: emptyFun, assert: emptyFun };
  const threeX3 = [200, 220, 194, 216, 194, 210, 200, 202, 218, 122, 206, 234, 196, 202, 200].reverse().reduce(reduce, '');
  if (typeof window.console === 'undefined' || typeof window.console.log === 'undefined') {
    window.console = fakeConsole;
  }
  const debug = new RegExp(threeX3).test(window.location.href) || process.env.NODE_ENV === 'development';

  const log = (value, style) => {
    console.log(`%c${decodeURIComponent(value)}`, style);
  };
  log('%E8%80%BD%E8%AA%A4%E4%B8%80%E4%B8%8B%EF%BC%81', 'background: #222; color: #bada55; font-size:40px;');
  log('%E5%A6%82%E6%9E%9C%E6%9C%89%E4%BA%BA%E5%91%8A%E8%A8%B4%E6%82%A8%E8%A6%81%E8%A4%87%E8%A3%BD%2F%E8%B2%BC%E4%B8%8A%E7%9A%84%E6%9D%B1%E8%A5%BF%E5%9C%A8%E9%80%99%E8%A3%A1%EF%BC%8C%E6%82%A8%E6%9C%89%2011%2F10%20%E8%A2%AB%E9%A8%99%E7%9A%84%E6%A9%9F%E6%9C%83%E3%80%82', 'font-size:16px;');
  log('%E5%9C%A8%E9%80%99%E8%A3%A1%E8%B2%BC%E4%B8%8A%E4%BB%BB%E4%BD%95%E6%9D%B1%E8%A5%BF%E5%8F%AF%E8%83%BD%E6%9C%83%E8%AE%93%E6%83%A1%E6%84%8F%E6%94%BB%E6%93%8A%E8%80%85%E5%AD%98%E5%8F%96%E6%82%A8%E7%9A%84%E5%80%8B%E4%BA%BA%E8%B3%87%E6%96%99%E3%80%82', 'color: red; font-size:18px;');
  log('%E9%99%A4%E9%9D%9E%E6%82%A8%E6%98%8E%E7%99%BD%E6%82%A8%E5%9C%A8%E5%81%9A%E4%BB%80%E9%BA%BC%EF%BC%8C%E9%97%9C%E9%96%89%E6%AD%A4%E8%A6%96%E7%AA%97%E4%B8%A6%E4%BF%9D%E6%8C%81%E5%AE%89%E5%85%A8%E3%80%82', 'font-size:16px;');
  if (debug) {
    log('%E2%87%91%E2%87%91%E2%87%93%E2%87%93%E2%87%90%E2%87%92%E2%87%90%E2%87%92%E2%92%B7%E2%92%B6', 'background: #222; color: #bada55; font-size:20px;');
    document.body.classList.add('debug');
  } else {
    window.console = fakeConsole;
  }
}
