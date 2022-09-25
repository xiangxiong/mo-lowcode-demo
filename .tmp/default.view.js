

export { default } from '/Users/user/za/lowcode/mo-lowcode-demo/src/index.tsx';

import * as componentInstances from '/Users/user/za/lowcode/mo-lowcode-demo/src/index.tsx';

import '/Users/user/za/lowcode/mo-lowcode-demo/src/index.scss'

export * from '/Users/user/za/lowcode/mo-lowcode-demo/src/index.tsx';

const coveredComponents = {};

const library = 'BizComps';
const execCompile = !!false;

if (!execCompile) {
  window[library] = Object.assign({__esModule: true}, componentInstances || {}, coveredComponents || {});
}

function getRealComponent(component, componentName) {
  if (component.default) return component.default;
  if (component[componentName]) return component[componentName];
  return component;
}