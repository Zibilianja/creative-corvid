/* ==========================================================================
    Creative Corvid - A Vue 3 component library for building creative applications
    - Exports for default use of components, styles and composables
    ========================================================================== */
import type { App, Plugin, Component } from 'vue';

/** Import for components */
import CCButton from '@/components/Button.vue';
import CCIcon from '@/components/Icon.vue';
import CCInfoPanel from '@/components/InfoPanel.vue';
import CCLogo from '@/components/Logo.vue';
import CCModal from '@/components/Modal.vue';
import CCToastAlert from '@/components/ToastAlert.vue';

/** Import form components */
import CCCheckbox from '@/form-components/Checkbox.vue';
import CCDateInput from '@/form-components/DateInput.vue';
import CCDateDropdown from '@/form-components/DateDropdownSelect.vue';
import CCRadio from '@/form-components/Radio.vue';
import CCSelect from '@/form-components/Select.vue';
import CCTextArea from '@/form-components/TextAreaInput.vue';
import CCTextInput from '@/form-components/TextInput.vue';
import CCSearchBar from '@/form-components/SearchBar.vue';
import CCNumberInput from '@/form-components/Number.vue';
import CCFileUpload from '@/form-components/FileUpload.vue';

/** Import base styles */
import '@/styles.scss';

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
