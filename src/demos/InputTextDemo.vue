<script lang="ts" setup>
import { ref } from 'vue';
import TextInput from '@/form-components/TextInput.vue';
import ToastAlert from '@/components/ToastAlert.vue';
import Button from '@/components/Button.vue';

const inputValues = ref({
  text: '',
  search: '',
  formField: '',
});
const toastValue = ref('default');

const valueToast = ref(false);

const handleInputChange = () => {
  console.log(inputValues.value, 'Input value changed');
};

const submitInput = () => {
  const values = Object.values(inputValues.value);
  if (values.some((value) => !value.trim())) {
    toastValue.value = 'error';
    valueToast.value = true;
  } else {
    toastValue.value = 'success';
    valueToast.value = true;
  }
};
</script>
/* Template ============================================================== */
<template>
  <div class="demo__input-container">
    <div class="demo__input-btn-container">
      <div class="demo__input-header">
        <h2 class="demo__input-title">Text Input Demo</h2>
        <div class="demo__input-description">
          This component is used to demonstrate the input component and
          variations.
        </div>
      </div>
      <div class="demo__inputs-container">
        <TextInput
          v-model="inputValues.text"
          label="Text Field"
          type="text"
          inputId="input-text-demo"
          placeholder="Type up..."
          :leadingIcon="['fas', 'pen-to-square']"
          :maxLength="50"
          clearable
          @update:model-value="handleInputChange"
        />
        <TextInput
          v-model="inputValues.search"
          label="Search Field"
          type="text"
          inputId="input-text-demo-search"
          placeholder="Type up..."
          :leadingIcon="['fas', 'magnifying-glass']"
          :maxLength="50"
          clearable
          @update:model-value="handleInputChange"
        />
        <TextInput
          v-model="inputValues.formField"
          label="Form Field"
          type="text"
          inputId="input-text-demo-form-field"
          placeholder="Type up..."
          :maxLength="50"
          clearable
          @update:model-value="handleInputChange"
        />
      </div>
      <Button @click="submitInput" class="CC__blue-gray submit-button"
        >Test Submit</Button
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
          : 'Please fill all fields.'
      }}
    </template>
  </ToastAlert>
</template>
/* Styles ============================================================== */
<style lang="postcss">
.demo__input {
  &-title {
    padding-top: 0;
    margin-bottom: 1rem;
    text-decoration: underline;
  }
  &-btn-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #f3f0f0;
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.37);

    .submit-button {
      padding: 0.75rem 1rem;
      margin-top: 0.7rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.37);
    }
  }
}
.demo__inputs-container {
  margin: 1rem 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  width: 100%;
}
@media (max-width: 960px) {
  .demo__inputs-container {
    flex-direction: column;
    align-items: left;
    margin: 1rem 0.5rem;
    width: auto;
    padding: 0 0.5rem;
  }
}
</style>
