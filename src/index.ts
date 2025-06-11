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

// 🔧 Auto-install if Vue is found globally
export default { install };

// 🔧 Export all components and for direct import
export * from './components';
export * from './stores';
export * from './form-components';
