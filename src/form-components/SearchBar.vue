/* ==========================================================================
SearchBar.vue - Reusable search bar component.
========================================================================== */
<script setup lang="ts">
import TextInput from './TextInput.vue';
import { type PropType } from 'vue';

const model = defineModel({
  type: [String] as PropType<string>,
  default: '',
});

defineProps({
  label: {
    type: String,
    default: 'Search',
  },
  buttonDisabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: 'Please enter a valid search term.',
  },
  required: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: 'Search...',
  },
  trailingIcon: {
    type: Array as PropType<string[] | null>,
    default: () => ['fas', 'magnifying-glass'],
  },
});

const emit = defineEmits([
  'update:modelValue',
  'update:searchSubmit',
  'click:trailingIcon',
  'focus',
]);
</script>
/* Template ============================================================== */
<template>
  <div class="CC__search-bar">
    <TextInput
      v-model="model"
      :label="label"
      type="text"
      inputId="input-text-demo-search"
      :placeholder="placeholder"
      hint="Search for something..."
      :trailing-icon="['fas', 'magnifying-glass']"
      :icon-button="true"
      :button-disabled="buttonDisabled"
      clearable
      :required="required"
      :error="error"
      :error-message="errorMessage"
      @update:focus="emit('focus')"
      @click:trailing-icon="emit('update:searchSubmit')"
    />
  </div>
</template>
/* Styles ================================================================ */
<style lang="postcss">
.CC__search-bar {
  .CC__text-input-wrapper {
    height: 2.5rem;
    padding-top: 0;
    padding-bottom: 0;
  }

  .CC__text-input-trailing-icon-container {
    background: transparent;

    outline: 2px solid transparent;
    margin: 0;
    padding: 0;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 2.75rem;
    height: 100%;
    svg {
      width: 1.123rem;
      height: 1.123rem;
    }
    &:not(:hover) svg {
      path {
        fill: var(--CC-color-gray-darker);
      }
    }

    &:hover {
      &:not(.button-disabled) {
        background-color: var(--CC-color-focus-dark);
        svg {
          path {
            fill: var(--CC-color-white);
          }
        }
      }
    }
    &.button-disabled {
      cursor: not-allowed;
      background-color: var(--CC-color-gray-light);

      svg {
        path {
          fill: var(--CC-color-gray-darker);
        }
      }
      :hover {
        background-color: var(--CC-color-gray-light);
        outline: 2px solid transparent;
      }
    }

    .fa-spinner {
      animation: cc-animate-spin 2s linear infinite;
    }

    &.CC__button-icon {
      width: 1rem;
      height: 1rem;
      display: block;
      line-height: 1;
    }
    svg {
      path {
        fill: var(--CC-gray-darker);
      }
    }
    min-height: 2.5rem;
    min-width: 2.5rem;
    height: 2.51rem;

    border-radius: 0 0.75rem 0.75rem 0;
  }
}
</style>
