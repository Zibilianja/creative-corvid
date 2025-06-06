<script lang="ts" setup>
import { ref } from 'vue';
import Checkbox from '@/form-components/Checkbox.vue';
import Radio from '@/form-components/Radio.vue';
import Button from '@/components/Button.vue';

const checkboxValues = ref({
  announcement: {
    value: false,
    error: false,
  },
  success: {
    value: false,
    error: false,
  },
  error: {
    value: false,
    error: false,
  },
  info: {
    value: false,
    error: false,
  },
  disabled: {
    value: false,
    error: false,
  },
  loading: {
    value: false,
    error: false,
  },
});

const radioValues = ref({
  announcement: 'Sample 1 Radio',
  success: 'Sample 2 Radio',
  error: 'Sample 3 Radio',
});

const handleSubmit = () => {
  checkboxValues.value.announcement.error =
    !checkboxValues.value.announcement.value;
  checkboxValues.value.success.error = !checkboxValues.value.success.value;
  checkboxValues.value.error.error = !checkboxValues.value.error.value;

  if (
    checkboxValues.value.announcement.error ||
    checkboxValues.value.success.error ||
    checkboxValues.value.error.error
  ) {
    alert('Please fix the errors in the checkboxes.');
  } else {
    alert('Form submitted successfully!');
  }
};
</script>
/* Template ============================================================== */
<template>
  <div class="CC__demo-container">
    <div class="CC__demo-header">
      <h2>Checkbox and Radio Demo</h2>
      <div>Click the inputs below to see styles.</div>
    </div>
    <label class="CC__checkbox-label"
      >Please Choose one or more checkbox:</label
    >
    <div class="CC__checkbox-demo-container">
      <Checkbox
        v-model="checkboxValues.announcement.value"
        label="Sample 1 Checkbox"
        :error="checkboxValues.announcement.error"
        @click="console.log('whoop')"
      />
      <Checkbox
        v-model="checkboxValues.success.value"
        label="Sample 2 Checkbox"
        :error="checkboxValues.success.error"
      />
      <Checkbox
        v-model="checkboxValues.error.value"
        label="Sample 3 Checkbox"
        :error="checkboxValues.error.error"
      />
      <Checkbox
        v-model="checkboxValues.info.value"
        label="Sample 4 Checkbox"
      />
    </div>
    <label class="CC__checkbox-label">Please Choose one radio:</label>
    <div class="CC__radio-demo-container">
      <Radio
        v-model="radioValues.announcement"
        label="Sample 1 Radio"
        name="sample-radio"
      />
      <Radio
        v-model="radioValues.success"
        label="Sample 2 Radio"
        name="sample-radio"
      />
      <Radio
        v-model="radioValues.error"
        label="Sample 3 Radio"
        name="sample-radio"
        :leadingIcon="['fas', 'trash-alt']"
      />
    </div>
    <Button
      class="CC__green"
      :leadingIcon="['fas', 'paper-plane']"
      @click="handleSubmit"
    />
  </div>
</template>
/* Styles ============================================================== */
<style lang="postcss">
.CC__checkbox-label {
  margin: 0 0 0.5rem 1rem;
}

.CC__checkbox-demo-container,
.CC__radio-demo-container {
  display: flex;
  justify-content: space-evenly;
}
</style>
