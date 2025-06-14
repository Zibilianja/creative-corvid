<script lang="ts" setup>
import { ref } from 'vue';
import TextInput from '@/form-components/TextInput.vue';
import ToastAlert from '@/components/ToastAlert.vue';
import Button from '@/components/Button.vue';
import type { InputValuesDemo } from '@/types';

const inputValues = ref<InputValuesDemo>({
  text: {
    value: '',
    error: false,
  },
  search: {
    value: '',
    error: false,
  },
  formField: {
    value: '',
    error: false,
  },
});
const toastValue = ref('default');
const valueToast = ref(false);
const inputError = ref(false);

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
    { key: 'text', value: inputValues.value.text.value },
    { key: 'search', value: inputValues.value.search.value },
    { key: 'formField', value: inputValues.value.formField.value },
  ];
  valuesArray.forEach((input) => {
    if (!validateInput(input['value'])) {
      inputValues.value[input['key']].error = true;
    } else {
      inputValues.value[input['key']].error = false;
    }
  });
  if (valuesArray.some((value) => !value.value.trim())) {
    toastValue.value = 'error';
    valueToast.value = true;
  } else {
    toastValue.value = 'success';
    valueToast.value = true;
  }
};

const validateInput = (value: string): boolean => {
  return value.trim() !== '';
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
      <div class="CC__demo-wrapper">
        <TextInput
          v-model="inputValues.text.value"
          label="Text Field"
          type="text"
          inputId="input-text-demo"
          placeholder="Type up..."
          :leadingIcon="['fas', 'pen-to-square']"
          :maxLength="50"
          clearable
          required
          :error="inputValues.text.error"
          @update:focus="inputValues.text.error = false"
          @update:blur=""
          @update:model-value="handleInputChange('text')"
        />
        <TextInput
          v-model="inputValues.search.value"
          label="Search Field"
          type="text"
          inputId="input-text-demo-search"
          placeholder="Type up..."
          hint="Search for something..."
          :leadingIcon="['fas', 'magnifying-glass']"
          :maxLength="50"
          clearable
          required
          :error="inputValues.search.error"
          @update:focus="inputValues.search.error = false"
          @update:model-value="handleInputChange('search')"
        />
        <TextInput
          v-model="inputValues.formField.value"
          label="Form Field"
          type="text"
          inputId="input-text-demo-form-field"
          placeholder="Type up..."
          :maxLength="50"
          clearable
          @update:model-value="handleInputChange"
        />
      </div>
      <div class="CC__demo-wrapper section-lower">
        <TextInput
          v-model="inputValues.text.value"
          label="With Trailing Icon"
          type="text"
          inputId="input-text-demo"
          placeholder="Type up..."
          :trailing-icon="['fas', 'pen-to-square']"
          :maxLength="50"
          clearable
          required
          :error="inputValues.text.error"
          @update:focus="inputValues.text.error = false"
          @update:blur=""
          @update:model-value="handleInputChange('text')"
        />
        <TextInput
          v-model="inputValues.search.value"
          label="Search Field"
          type="text"
          inputId="input-text-demo-search"
          placeholder="Type up..."
          hint="Search for something..."
          :leadingIcon="['fas', 'magnifying-glass']"
          :maxLength="50"
          clearable
          required
          :error="inputValues.search.error"
          @update:focus="inputValues.search.error = false"
          @update:model-value="handleInputChange('search')"
        />
        <TextInput
          v-model="inputValues.formField.value"
          label="Form Field"
          type="text"
          inputId="input-text-demo-form-field"
          placeholder="Type up..."
          :maxLength="50"
          clearable
          @update:model-value="handleInputChange"
        />
      </div>
      <Button
        class="CC__green cc-mt-4"
        :leadingIcon="['fas', 'paper-plane']"
        @click="submitInput"
        >Submit</Button
      >
    </div>
  </div>
  <ToastAlert
    v-model="valueToast"
    :state="toastValue"
    @update:modelValue="valueToast = $event"
  >
    <template #title>Toast: {{ toastValue }}</template>
    <template #message>
      {{
        toastValue === 'success'
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
</style>
