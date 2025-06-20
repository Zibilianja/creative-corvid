/* ==========================================================================
SearchBarDemo.vue - This is a demo for the SearchBar component.
========================================================================== */
<script setup lang="ts">
import ToastAlert from '@/components/ToastAlert.vue';
import SearchBar from '@/form-components/SearchBar.vue';
import { ref } from 'vue';

const emit = defineEmits(['submit:search']);

const searchValue = ref<string>('');
const searchLabel = ref<string>('Search for something');
const searchPlaceholder = ref<string>('Search...');
const searchHint = ref<string>('Type your search term here');
const searchError = ref<boolean>(false);
const toastType = ref<string>('default');
const displayToast = ref<boolean>(false);
const searchLoading = ref<boolean>(false);

const handleSearchSubmit = (): void => {
  console.log('Search submitted:', searchValue.value);
  searchLoading.value = true; // Disable the button while searching
  if (searchValue.value.trim() !== '') {
    // Simulate a search operation
    searchError.value = false;

    manageToast('success');
  } else {
    searchError.value = true;
    manageToast('error');
  }
};

const manageToast = (message: string): void => {
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
  searchLoading.value = false; // Re-enable the button after the toast is closed
  displayToast.value = false; // Close the toast
};
</script>
/* Template ============================================================== */
<template>
  <div class="CC__demo-container">
    <div class="CC__demo-header">
      <h2 class="CC__demo-header">Search Bar Demo</h2>
      <div class="CC__demo-description">
        This component is used to demonstrate the search bar component.
      </div>
    </div>
    <div class="CC__demo-wrapper CC__searchBar-component">
      <form
        id="search-form"
        class="cc-w-100 cc-d-flex cc-justify-center"
        @submit.prevent="handleSearchSubmit"
      >
        <SearchBar
          v-model="searchValue"
          class="cc-w-50"
          :label="searchLabel"
          :placeholder="searchPlaceholder"
          :hint="searchHint"
          :error="searchError"
          :button-disabled="searchLoading"
          required
          clearable
          @focus="searchError = false"
          @update:search-submit="handleSearchSubmit"
          @click:trailing-icon="handleSearchSubmit"
        />
      </form>
    </div>
  </div>
  <ToastAlert
    v-model="displayToast"
    :type="toastType"
    :timeout="4000"
    @update:model-value="handleUpdateToast"
  >
    <template v-slot:title>{{
      searchError ? 'Error: no search terms.' : 'Success!'
    }}</template>
    <template v-slot:message>
      {{
        searchError
          ? 'Please enter a valid search term.'
          : 'Searching for: ' + searchValue
      }}
    </template>
  </ToastAlert>
</template>
/* Styles ================================================================ */
<style lang="postcss"></style>
