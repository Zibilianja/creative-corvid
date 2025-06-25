/*==========================================================================
CloseButton Component
========================================================================== */
<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: 'Close',
  },
});
</script>

/*==========================================================================
Template
==========================================================================
<template>
  <button
    class="CC__close-button"
    aria-label="close-button"
    type="button"
    :title="title"
  >
    <slot name="close-icon">
      <!-- Fallback default slot for custom content, e.g., an icon -->
      <font-awesome-icon
        icon="times"
        class="CC__close-icon"
      />
    </slot>
  </button>
</template>
<style lang="postcss">
.CC__close-button {
  cursor: pointer;
  &:hover:not([disabled]) {
    text-decoration: underline;
  }

  &:not([disabled]) {
    cursor: pointer;
  }

  &[disabled] {
    cursor: not-allowed;
    color: var(--CC-color-gray-dark);
    background-color: var(--CC-color-gray-light);
    border: 1px solid var(--CC-color-gray);
  }
}
</style>
