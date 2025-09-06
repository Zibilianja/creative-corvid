/* ==========================================================================
    Creative Corvid - A Vue 3 component library for building creative applications
    - Exports for default use of components, styles and composables
    ========================================================================== */
import type { App, Plugin, Component } from 'vue';

/** Import for composables */
export * from './useDateState';
/** Import for components */
import CCButton from '@/components/Button.vue';
import CCIcon from '@/components/Icon.vue';
import CCInfoPanel from '@/components/InfoPanel.vue';
import CCLogo from '@/components/Logo.vue';
import CCModal from '@/components/Modal.vue';
import CCToastAlert from '@/components/ToastAlert.vue';

/** Import form components */
import CCCheckbox from '@/components/form/Checkbox.vue';
import CCDateInput from '@/components/form/DateInput.vue';
import CCDateDropdown from '@/components/form/DateDropdownSelect.vue';
import CCRadio from '@/components/form/Radio.vue';
import CCSelect from '@/components/form/Select.vue';
import CCTextArea from '@/components/form/TextAreaInput.vue';
import CCTextInput from '@/components/form/TextInput.vue';
import CCSearchBar from '@/components/form/SearchBar.vue';
import CCNumberInput from '@/components/form/Number.vue';
import CCFileUpload from '@/components/form/FileUpload.vue';

/** Import base styles */
import './styles.scss';

/** Global plugin registry */
const components = {
  CCButton,
  CCIcon,
  CCInfoPanel,
  CCLogo,
  CCModal,
  CCToastAlert,
  CCCheckbox,
  CCDateInput,
  CCDateDropdown,
  CCRadio,
  CCSelect,
  CCTextArea,
  CCTextInput,
  CCSearchBar,
  CCNumberInput,
  CCFileUpload,
};

/** Plugin install function */
export const CreativeCorvidLibraryPlugin: Plugin = {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component as Component);
    });
  },
};

export default CreativeCorvidLibraryPlugin;
