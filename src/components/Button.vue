/* ==========================================================================
Button.vue This is the standard button component. It is a wrapper around the
native HTML button element.
========================================================================== */
<script setup lang="ts">
defineProps({
  leadingIcon: {
    type: Array as () => string[] | null,
    default: () => null,
  },
  trailingIcon: {
    type: Array as () => string[] | null,
    default: () => null,
  },
  title: {
    type: String,
    default: '',
  },
});
</script>

/* Template ============================================================== */
<template>
  <button
    class="CC__button"
    :title="title"
  >
    <font-awesome-icon
      v-if="leadingIcon !== null"
      :icon="leadingIcon"
      class="CC__button-icon"
    />
    <slot />
    <font-awesome-icon
      v-if="trailingIcon !== null"
      :icon="trailingIcon"
      class="CC__button-icon"
    />
  </button>
</template>

/* Styles ================================================================ */
<style lang="postcss">
.CC__button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 0;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  transition: all 0.1s ease-in-out;
  max-height: 3.2rem;

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

  &.CC__blue-gray:not([disabled]) {
    background-color: #3b475e;
    color: #eef2ef;

    &:hover {
      background-color: #9ba7c0;
    }
  }

  &.CC__green:not([disabled]) {
    background-color: #17301c;
    color: #fff;
    &:hover {
      background-color: #768e63;
    }
  }

  &.CC__red:not([disabled]) {
    background-color: #741324;
    color: #fff;
    &:hover {
      background-color: #b54e60;
    }
  }

  &.CC__gray:not([disabled]) {
    background-color: #3c3939;
    color: #fff;
    &:hover {
      background-color: #6c6666;
    }
  }

  &.CC__navy:not([disabled]) {
    background-color: #024d7c;
    color: #000000;
    &:hover {
      background-color: #013e64;
    }
  }

  &.CC__purple:not([disabled]) {
    background-color: #432d50;
    color: #fff;
    &:hover {
      background-color: #766086;
    }
  }

  &.CC__pink:not([disabled]) {
    background-color: #a72067;
    color: #fff;
    &:hover {
      background-color: #9a1e60;
    }
  }

  &.CC__orange:not([disabled]) {
    background-color: #c9362b;
    color: #fff;
    &:hover {
      background-color: #b12e24;
    }
  }

  &.CC__white:not([disabled]) {
    background-color: #fff;
    color: #4c4c4c;
    border: 1px solid #4c4c4c;
    &:hover {
      background-color: #f1f1f1;
    }
  }
}
</style>
