import { type App } from 'vue';
import Button from '@/components/Button.vue';

function install(app: App) {
  app.component('CreativeCorvidButton', Button);
}

export default { install };
export * from '@/components';
