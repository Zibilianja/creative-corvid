import type { App, Component } from 'vue';
import * as Components from './components';
import * as FormComponents from './form-components';

// 🔧 Install function for plugin usage
function install(app: App): void {
  const allComponents = { ...Components, ...FormComponents };
  // Register all components globally
  Object.entries(allComponents).forEach(([name, component]) => {
    app.component(`CC${name}`, component as Component);
  });
}

// Name plugin for importing
const CreativeCorvid = { install };

// Auto-install if Vue is found globally or app.use(CreativeCorvid) is called
export default CreativeCorvid;
export { CreativeCorvid };

// 🔧 Export all components and for direct import
export * from './components';
export * from './form-components';
export * from './stores';
