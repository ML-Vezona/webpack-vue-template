// https://github.com/reyramos/disable-shake-undo/blob/master/disableShakeUndo.js

const keyCodes = [
  { code: 49, identifier: 'U+0031', value: '1' },
  { code: 50, identifier: 'U+0032', value: '2' },
  { code: 51, identifier: 'U+0033', value: '3' },
  { code: 52, identifier: 'U+0034', value: '4' },
  { code: 53, identifier: 'U+0035', value: '5' },
  { code: 54, identifier: 'U+0036', value: '6' },
  { code: 55, identifier: 'U+0037', value: '7' },
  { code: 56, identifier: 'U+0038', value: '8' },
  { code: 57, identifier: 'U+0039', value: '9' },
  { code: 48, identifier: 'U+0030', value: '0' },
];

function getKeyCodeValue(code) {
  let val = false;
  keyCodes.forEach((k) => {
    if (k.code === code) {
      val = k.value;
    }
  });
  return val;
}


export default class DisableShakeUndo {
  constructor(el, cb) {
    this.value = el.value || '';
    this.el = el;
    this.cb = cb;
    this.inputHelper = this.inputHelper.bind(this);
    this.keydownHelper = this.keydownHelper.bind(this);
    el.addEventListener('input', this.inputHelper);
    window.addEventListener('keydown', this.keydownHelper);
  }
  inputHelper(e) {
    e.preventDefault();
    window.removeEventListener('keydown', this.keydownHelper);
  }
  keydownHelper(e) {
    e.preventDefault();
    // eslint-disable-next-line
    element.removeEventListener('input', this.inputHelper);

    const keyCode = getKeyCodeValue(e.keyCode, e.keyIdentifier);
    if (!keyCode) {
      return;
    }

    let { value } = this;
    // Delete
    if (keyCode === 'backspace' && value.length) {
      value = value.slice(0, value.length - 1);
    } else if (keyCode !== 'backspace' && keyCode !== 'shift' && keyCode !== 'GO') { // do not append the following
      value += keyCode === 'space' ? ' ' : keyCode;
    }
    this.cb(value);
  }


  destroy() {
    this.el.removeEventListener('input', this.inputHelper);
    window.removeEventListener('keydown', this.keydownHelper);
  }
}
