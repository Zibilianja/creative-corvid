<script lang="ts" setup>
import { ref } from 'vue';
import TextInput from '@/form-components/TextInput.vue';
import ToastAlert from '@/components/ToastAlert.vue';
import Button from '@/components/Button.vue';

const inputValue = ref('');
const toastValue = ref('default');

const valueToast = ref(false);

const handleInputChange = () => {
  console.log(inputValue.value, 'Input value changed');
};

const submitInput = () => {
  if (!inputValue.value.trim()) {
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
    <div class="demo__input-header">
      <h2 class="demo__input-header">Input Demo</h2>
      <div class="demo__input-description">
        This component is used to demonstrate the input component and
        variations.
      </div>
    </div>

    <TextInput
      v-model="inputValue"
      label="Text Field"
      type="text"
      inputId="input-text-demo"
      placeholder="Type up..."
      :leadingIcon="['fas', 'pen-to-square']"
      :maxLength="50"
      clearable
      @update:model-value="handleInputChange"
    />

    <Button @click="submitInput" class="CC__gray">Submit</Button>
  </div>
  <ToastAlert v-model="valueToast" :state="toastValue" />
</template>
