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
    :title="title"
  >
    <font-awesome-icon
      icon="times"
      class="CC__close-icon"
    />
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
    cursor: not-allowed !important;
    color: #a1a1a1;
    background-color: #dddada;
    border: 1px solid #bababa;
  }
}
</style>
