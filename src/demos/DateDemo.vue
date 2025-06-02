/* ==========================================================================
DateDemo.vue -This is the description of the Component.
========================================================================== */
<script setup lang="ts">
import DateInput from '@/form-components/DateInput.vue';
import DatePicker from '@/form-components/DatePicker.vue';
import { ref } from 'vue';

const dateValue = ref<string | null>(null);
const datePickerValue = ref<string | undefined>('');

const rules = {
  required: (value: string) => !!value || 'Date is required.',
  validDate: (value: string) =>
    (value && !isNaN(Date.parse(value))) || 'Please enter a valid date.',
};
</script>
/* Template ============================================================== */
<template>
  <div class="demo__panel-container">
    <div class="demo__panel-header">
      <h2 class="demo-header">Date Input Demo</h2>
      <div class="demo-description">
        This component is used to demonstrate the date input component and
        variations.
      </div>
    </div>
    <DateInput v-model="dateValue" label="Date Input" is-clearable required />
    <DatePicker
      :value="datePickerValue"
      label="Date Picker"
      format="MM/DD/YYYY"
      :required="false"
      :end-year="2050"
      :future-year="2050"
    />
  </div>
</template>
/* Styles ================================================================ */
<style lang="postcss"></style>
