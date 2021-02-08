const { containerExists } = require('../util');

module.exports = {
  description: '新增 Vue Container',
  prompts: [{
    type: 'input',
    name: 'name',
    message: '輸入 container 名稱',
    default: 'App',
    validate(value) {
      if (!/^[A-Za-z][A-Za-z0-9]+$/.test(value)) return '！名稱格式錯誤！';
      return containerExists(value) ? '！重覆的組件名稱！' : true;
    },
  }],
  actions: () => [{
    type: 'add',
    path: '../../src/js/container/{{properCase name}}/index.js',
    templateFile: 'container/index.hbs',
    abortOnFail: true,
  }, {
    type: 'add',
    path: '../../src/js/container/{{properCase name}}/{{properCase name}}.vue',
    templateFile: 'container/vue.hbs',
    abortOnFail: true,
  }, {
    type: 'add',
    path: '../../src/js/container/{{properCase name}}/{{dashCase name}}.styl',
    templateFile: 'container/styl.hbs',
    abortOnFail: true,
  }],
};
