const fs = require('fs');
const path = require('path');

const vueComponents = fs.readdirSync(path.join(__dirname, '../../src/js/component'));
function componentExists(component) {
  return vueComponents.some(e => e.toLowerCase() === component.toLowerCase());
}

const vueContainers = fs.readdirSync(path.join(__dirname, '../../src/js/container'));
function containerExists(container) {
  return vueContainers.some(e => e.toLowerCase() === container.toLowerCase());
}

module.exports = {
  componentExists,
  containerExists,
};
