/* ==========================================================================
DateDemo.vue - demonstrates the DateInput and DatePicker components This file is
part of the Creative Corvid Component and Style Library.
========================================================================== */
<script setup lang="ts">
import DateInput from '@/form-components/DateInput.vue';
import DateDropdownSelect from '@/form-components/DateSelect/DateDropdownSelect.vue';
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
  <div class="CC__demo-container">
    <div class="CC__demo-header">
      <h2 class="demo-header">Date Input Demo</h2>
      <div class="demo-description">
        This component is used to demonstrate the date input component and
        variations.
      </div>
    </div>
    <div class="CC__demo-wrapper">
      <DateInput
        v-model="dateValue"
        label="Date Input"
        is-clearable
        required
      />
      <DateInput
        v-model="dateValue"
        label="Date Input"
        is-clearable
        required
      />
    </div>
    <div class="CC__demo-wrapper">
      <DateDropdownSelect
        v-model="datePickerValue"
        label="Date Select Long"
        format="MMMM DD, YYYY"
        :required="false"
        :first-year="2000"
        :years-available="15"
      />
      <DateDropdownSelect
        v-model="datePickerValue"
        label="Date Select Short"
        format="MM/DD/YYYY"
        :required="false"
        :first-year="2000"
        :years-available="15"
      />
      <DateDropdownSelect
        v-model="datePickerValue"
        label="Date Select Mid"
        format="MMM DD, YYYY"
        :required="false"
        :first-year="2000"
        :years-available="15"
      />
    </div>
  </div>
</template>
