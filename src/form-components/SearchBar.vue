/* ==========================================================================
SearchBar.vue - Reusable search bar component.
========================================================================== */
<script setup lang="ts">
import TextInput from './TextInput.vue';
import { ref } from 'vue';

const searchError = ref(false);

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const handleInputChange = (): void => {
  if (validateInput(props.modelValue)) {
    searchError.value = false;
  } else {
    searchError.value = true;
  }
};

const validateInput = (value: string): boolean => {
  return value.trim() !== '';
};
</script>
/* Template ============================================================== */
<template>
  <div class="CC__search-bar">
    <TextInput
      v-model="props.modelValue"
      label="Search Bar"
      type="text"
      inputId="input-text-demo-search"
      placeholder="Type up..."
      hint="Search for something..."
      :leadingIcon="['fas', 'magnifying-glass']"
      :maxLength="50"
      clearable
      required
      :error="searchError"
      @update:focus="searchError = false"
      @update:model-value="handleInputChange()"
    />
  </div>
</template>
/* Styles ================================================================ */
<style lang="postcss"></style>
