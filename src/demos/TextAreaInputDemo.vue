/* ==========================================================================
TextAreaInputDemo.vue - Demo for TextAreaInput component.
========================================================================== */
<script setup lang="ts">
import { ref } from 'vue';
import TextAreaInput from '@/form-components/TextAreaInput.vue';

const information = ref(null);

const MyInputTextarea = ref<{
  focused: boolean;
  isValid: boolean;
}>({
  focused: false,
  isValid: false,
});

const rules = {
  required: (value: string) => !!value || 'Additional information is required.',
  minLength: (value: string) =>
    (value && value.length >= 3) ||
    'Additional information must be at least 3 characters.',
};

const onInputUpdate = (): void => {
  console.log('input updated');
};
</script>

/* ==========================================================================
Template
========================================================================== */
<template>
  <div class="CC__demo-container">
    <div>
      <div class="demo-header">InputTextarea</div>
      <div class="demo-description">
        This component is used to display a textarea input field.
      </div>
    </div>

    <TextAreaInput
      ref="MyInputTextarea"
      v-model="information"
      label="Additional Information"
      placeholder="Enter additional information"
      :maxlength="500"
      :required="true"
      :max-height="500"
      :rules="[rules.required, rules.minLength]"
      @update:model-value="onInputUpdate"
    />

    <div class="demo__panel-vmodel">
      <div class="demo__panel-vmodel-row">
        <div>Value:</div>
        <div>{{ information }}</div>
      </div>

      <div class="demo__panel-vmodel-row">
        <div>isValid:</div>
        <div>{{ MyInputTextarea.isValid }}</div>
      </div>

      <div class="demo__panel-vmodel-row">
        <div>focused:</div>
        <div>{{ MyInputTextarea.focused }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="postcss">
.demo__panel-container {
  align-items: center;
  padding: 1rem;
  background-color: #f3f0f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.37);
  margin: 1rem 0;
}
</style>
