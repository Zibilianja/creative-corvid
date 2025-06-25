/* ==========================================================================
Button.vue This is the standard button component. It is a wrapper around the
native HTML button element. Pass down any normal button attributes and they will
be applied to the button element. Supports leading and trailing icons. Supports
loading state, automatically adjusting the icon to a spinner when loading is
true. Supports different style variants: blue-gray, green, red, gray, navy,
purple, orange, white. Type will default to button if not specified.
========================================================================== */

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

defineProps({
  leadingIcon: {
    type: Array as () => string[] | null,
    default: () => null,
  },
  trailingIcon: {
    type: Array as () => string[] | null,
    default: () => null,
  },
  loadingIcon: {
    type: Boolean,
    default: false,
  },
  styleVariant: {
    type: String,
    default: 'custom',
    validator: (value: string) =>
      [
        'blue-gray',
        'green',
        'red',
        'gray',
        'navy',
        'purple',
        'orange',
        'white',
      ].includes(value),
  },
});
</script>

/* Template ============================================================== */
<template>
  <button
    class="CC__button"
    :class="`CC__${styleVariant}`"
    :type="($attrs.type as 'button' | 'submit' | 'reset') || 'button'"
    v-bind="$attrs"
  >
    <slot name="leading-icon">
      <font-awesome-icon
        v-if="leadingIcon !== null"
        :icon="loadingIcon ? ['fas', 'spinner'] : leadingIcon"
        class="CC__button-icon"
        :class="loadingIcon ? 'CC__icon--loading' : ''"
      />
    </slot>
    <slot />
    <slot name="trailing-icon">
      <font-awesome-icon
        v-if="trailingIcon !== null"
        :icon="loadingIcon ? ['fas', 'spinner'] : trailingIcon"
        class="CC__button-icon"
        :class="loadingIcon ? 'CC__icon--loading' : ''"
      />
    </slot>
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
  border: 1px solid transparent;

  .CC__icon--loading {
    animation: cc-animate-spin 1s linear infinite;
    margin: 0;
  }

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

  &.CC__blue-gray:not([disabled]) {
    background-color: var(--CC-color-blue-gray-darker);
    color: var(--CC-color-white);

    &:hover {
      background-color: var(--CC-color-blue-gray-dark);
    }
  }

  &.CC__green:not([disabled]) {
    background-color: var(--CC-color-green-darkest);
    color: var(--CC-color-white);
    &:hover {
      background-color: var(--CC-color-green-gray);
    }
  }

  &.CC__red:not([disabled]) {
    background-color: var(--CC-color-quaternary-dark);
    color: var(--CC-color-white);
    &:hover {
      background-color: var(--CC-color-quaternary-light);
    }
  }

  &.CC__gray:not([disabled]) {
    background-color: var(--CC-color-gray-darkest);
    color: var(--CC-color-white);
    &:hover {
      background-color: var(--CC-color-gray-dark);
    }
  }

  &.CC__navy:not([disabled]) {
    background-color: var(--CC-color-primary);
    color: var(--CC-color-white);
    &:hover {
      background-color: var(--CC-color-primary-dark);
    }
  }

  &.CC__purple:not([disabled]) {
    background-color: var(--CC-color-secondary-darker);
    color: var(--CC-color-white);
    &:hover {
      background-color: var(--CC-color-secondary);
    }
  }

  &.CC__orange:not([disabled]) {
    background-color: var(--CC-color-tertiary-dark);
    color: var(--CC-color-white);
    &:hover {
      background-color: var(--CC-color-tertiary);
    }
  }

  &.CC__white:not([disabled]) {
    background-color: var(--CC-color-white);
    color: var(--CC-color-gray-darker);
    border: 1px solid var(--CC-color-gray);
    &:hover {
      background-color: var(--CC-color-gray-lightest);
    }
  }
}
</style>
