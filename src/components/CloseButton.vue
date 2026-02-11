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
    type="button"
  >
    <slot>
      <! -- Fallback default slot for custom content, e.g., an icon -->
      <font-awesome-icon
        icon="times"
        class="CC__close-icon"
      />
    </slot>
  </button>
</template>
<style lang="scss">
.CC__close-button {
  cursor: pointer;
  border-radius: 50%;
  &:hover:not([disabled]) {
    text-decoration: underline;
  }

  &:not([disabled]) {
    cursor: pointer;
  }

  .CC__close-icon {
    margin-bottom: 1px;
  }

  &[disabled] {
    cursor: not-allowed !important;
    color: #a1a1a1;
    background-color: #dddada;
    border: 1px solid #bababa;
  }
}
</style>
