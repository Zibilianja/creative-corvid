<script lang="ts" setup>
import { ref } from 'vue';
import TextInput from '@/form-components/TextInput.vue';
import ToastAlert from '@/components/ToastAlert.vue';
import Button from '@/components/Button.vue';

const inputValues = ref<Record<string, any>>({
  sample1: {
    value: '',
    error: false,
  },
  sample2: {
    value: '',
    error: false,
  },
  sample3: {
    value: '',
    error: false,
  },
  sample4: {
    value: '',
    error: false,
  },
});
const toastType = ref('default');
const displayToast = ref(false);
const inputError = ref(false);
const submitLoading = ref(false);

const handleInputChange = (input: string) => {
  if (validateInput(inputValues.value[input].value)) {
    inputValues.value[input].error = false;
  } else {
    inputValues.value[input].error = true;
  }
};

const submitInput = () => {
  inputError.value = false;
  const valuesArray = [
    { key: 'sample1', value: inputValues.value.sample1.value },

    { key: 'sample3', value: inputValues.value.sample3.value },
    { key: 'sample4', value: inputValues.value.sample4.value },
  ];
  valuesArray.forEach((input) => {
    if (!validateInput(input['value'])) {
      inputValues.value[input['key']].error = true;
    } else {
      inputValues.value[input['key']].error = false;
    }
  });
  if (valuesArray.some((value) => !value.value.trim())) {
    manageToast('error');
  } else {
    manageToast('success');
  }
};

const validateInput = (value: string): boolean => {
  return value.trim() !== '';
};

const manageToast = (message: string): void => {
  submitLoading.value = true; // Disable the button while showing the toast
  if (displayToast.value) {
    displayToast.value = false; // Close the toast
    setTimeout(() => {
      displayToast.value = true;
      toastType.value = message; // Trigger the toast again after a short delay
    }, 100); // Adjust the delay as needed
  } else {
    displayToast.value = true;
    toastType.value = message;
  }
};

const handleUpdateToast = (): void => {
  submitLoading.value = false; // Re-enable the button after the toast is closed
  displayToast.value = false; // Close the toast
};
</script>
/* Template ============================================================== */
<template>
  <div class="CC__demo-container">
    <div class="demo__input-btn-container">
      <div class="CC__demo-header">
        <h2 class="demo__input-title">Text Input Demo</h2>
        <div class="demo__input-description">
          This component is used to demonstrate the input component and
          variations.
        </div>
      </div>
      <div class="CC__demo-wrapper text-inputs">
        <TextInput
          v-model="inputValues.sample1.value"
          label="Text Field"
          type="text"
          inputId="input-text-demo"
          placeholder="Type up..."
          :leadingIcon="['fas', 'pen-to-square']"
          :maxLength="50"
          clearable
          required
          :error="inputValues.sample1.error"
          @update:focus="inputValues.sample1.error = false"
          @update:blur=""
          @update:model-value="handleInputChange('sample1')"
        />

        <TextInput
          v-model="inputValues.sample2.value"
          label="Form Field"
          type="text"
          inputId="input-text-demo-form-field"
          placeholder="Type up..."
          :maxLength="50"
          clearable
          @update:model-value="handleInputChange('sample2')"
        />
      </div>
      <div class="CC__demo-wrapper section-lower text-inputs">
        <TextInput
          v-model="inputValues.sample3.value"
          label="With Trailing Icon"
          type="text"
          inputId="input-text-demo"
          placeholder="Type up..."
          :trailing-icon="['fas', 'magnifying-glass']"
          :maxLength="50"
          clearable
          required
          :error="inputValues.sample3.error"
          @update:focus="inputValues.sample3.error = false"
          @update:blur=""
          @update:model-value="handleInputChange('sample3')"
        />
        <TextInput
          v-model="inputValues.sample4.value"
          label="With Trailing Icon"
          type="text"
          inputId="input-text-demo"
          placeholder="Type up..."
          :trailing-icon="['fas', 'skull-crossbones']"
          :maxLength="50"
          clearable
          required
          :error="inputValues.sample4.error"
          @update:focus="inputValues.sample4.error = false"
          @update:blur=""
          @update:model-value="handleInputChange('sample4')"
        />
      </div>
      <Button
        class="CC__green cc-mt-4"
        :leadingIcon="['fas', 'paper-plane']"
        :loading-icon="submitLoading"
        :disabled="submitLoading"
        @click="submitInput"
        >Submit</Button
      >
    </div>
  </div>
  <ToastAlert
    v-model="displayToast"
    :type="toastType"
    @update:modelValue="handleUpdateToast"
  >
    <template #title>Toast: {{ toastType }}</template>
    <template #message>
      {{
        toastType === 'success'
          ? 'Input submitted successfully!'
          : 'Please fill all required fields.'
      }}
    </template>
  </ToastAlert>
</template>
/* Styles ============================================================== */
<style lang="postcss">
.demo__input {
  &-btn-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    border-radius: 0.5rem;

    .submit-button {
      display: flex;
      flex-wrap: nowrap;
      padding: 0.75rem 1rem;
      margin-top: 1.5rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.37);
    }
  }
}

.text-inputs {
  svg {
    path {
      fill: var(--CC-color-gray-darker);
    }
  }
}
</style>
