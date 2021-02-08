const { componentExists } = require('../util');

module.exports = {
  description: '新增 Vue Component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: '輸入 component 名稱',
    default: 'Button',
    validate(value) {
      if (!/^[A-Za-z][A-Za-z0-9]+$/.test(value)) return '！名稱格式錯誤！';
      return componentExists(value) ? '！重覆的組件名稱！' : true;
    },
  }],
  actions: () => [{
    type: 'add',
    path: '../../src/js/component/{{properCase name}}/index.js',
    templateFile: 'component/index.hbs',
    abortOnFail: true,
  }, {
    type: 'add',
    path: '../../src/js/component/{{properCase name}}/{{properCase name}}.vue',
    templateFile: 'component/vue.hbs',
    abortOnFail: true,
  }, {
    type: 'add',
    path: '../../src/js/component/{{properCase name}}/{{dashCase name}}.styl',
    templateFile: 'component/styl.hbs',
    abortOnFail: true,
  }, {
    type: 'add',
    path: '../../src/js/component/{{properCase name}}/stories.js',
    templateFile: 'component/stories.hbs',
    abortOnFail: true,
  }],
};
