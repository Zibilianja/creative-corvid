<script setup lang="ts">
defineEmits(['close']);
</script>
/*==========================================================================
Template
==========================================================================
<template>
  <button class="CC__close-button" @click="$emit('close')">
    <slot />
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
      background-color: #291338;
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
