/* ==========================================================================
Error Component This component is used to display errors in the application.
========================================================================== */
<script lang="ts" setup>
defineProps({
  error: {
    type: String,
    required: true,
  },
});
</script>

/* Template ============================================================== */
<template>
  <div class="vue-table-data__error-container">
    <div class="vue-table-data__error-message">
      {{ error }}
    </div>
  </div>
</template>

/* Styles ================================================================ */
<style lang="postcss">
.vue-table-data__error-container {
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #313336;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 1.25rem;
  border: 6px solid var(--dps-color-light-pink);
}
</style>
