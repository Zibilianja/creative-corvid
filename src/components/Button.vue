/* ==========================================================================
Button.vue This is the standard button component. It is a wrapper around the
native HTML button element.
========================================================================== */
<script setup lang="ts"></script>

/* Template ============================================================== */
<template>
  <button class="CC__button">
    <slot />
  </button>
</template>

/* Styles ================================================================ */
<style lang="postcss">
.CC__button {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  transition: all 0.2s ease-in-out;
  min-height: 3rem;

  &:not([disabled]) {
    cursor: pointer;
  }

  &[disabled] {
    cursor: not-allowed !important;
    background-color: #f1f1f1;
    border: 1px solid #bababa;
  }

  &.CC__blue:not([disabled]) {
    background-color: #005b94;
    color: #fff;
    &:hover {
      background-color: #004d7d;
    }
  }

  &.CC__green:not([disabled]) {
    background-color: #037109;
    color: #fff;
    &:hover {
      background-color: #37501b;
    }
  }

  &.CC__red:not([disabled]) {
    background-color: #a41d33;
    color: #fff;
    &:hover {
      background-color: #8d192d;
    }
  }

  &.CC__gray:not([disabled]) {
    background-color: #4c4c4c;
    color: #fff;
    &:hover {
      background-color: #383838;
    }
  }

  &.CC__navy:not([disabled]) {
    background-color: #024d7c;
    color: #fff;
    &:hover {
      background-color: #013e64;
    }
  }

  &.CC__purple:not([disabled]) {
    background-color: #51286c;
    color: #fff;
    &:hover {
      background-color: #3e1e53;
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
