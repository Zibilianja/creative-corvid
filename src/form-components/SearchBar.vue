/* ==========================================================================
SearchBar.vue - Reusable search bar component.
========================================================================== */
<script setup lang="ts">
import TextInput from './TextInput.vue';
import { ref } from 'vue';

const searchValue = ref({
  value: '',
  error: false,
});
</script>
/* Template ============================================================== */
<template>
  <div class="CC__search-bar">
    <TextInput
      v-model="searchValue.value"
      label="Search Bar"
      type="text"
      inputId="input-text-demo-search"
      placeholder="Type up..."
      hint="Search for something..."
      :leadingIcon="['fas', 'magnifying-glass']"
      :maxLength="50"
      clearable
      required
      :error="searchValue.error"
      @update:focus="searchValue.error = false"
      @update:model-value="handleInputChange('search')"
    />
  </div>
</template>
/* Styles ================================================================ */
<style lang="postcss"></style>
