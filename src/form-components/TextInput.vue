/* ==========================================================================
TextInput.vue - Text Input component. This file is part of the Creative Corvid
Component and Style Library.
========================================================================== */
<script setup lang="ts">
import CloseButton from '@/components/CloseButton.vue';
import { defineEmits, computed, type PropType } from 'vue';
import { vMaska } from 'maska/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const model = defineModel({
  type: [String] as PropType<string>,
  default: '',
});

const emit = defineEmits(['update:focus', 'update:blur', 'update:modelValue']);

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  inputId: {
    type: String,
    default: '',
  },
  inputRef: {
    type: String,
    default: 'defaultInputRef',
  },
  type: {
    type: String,
    default: 'text',
    validator: (value: string) => ['text', 'email', 'password'].includes(value),
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'Enter text',
  },
  hint: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  leadingIcon: {
    type: Array as () => string[] | null,
    default: () => null,
  },
  trailingIcon: {
    type: Array as () => string[] | null,
    default: () => null,
  },
  maxLength: {
    type: Number,
    default: 100,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  maska: {
    type: String,
    default: '',
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

const clearInput = () => {
  model.value = '';
};

/**
 * @description - Computed property to determine if the input value is valid, and applies the error class.
 *
 * @return {string} - Class name for leading icon.
 */
const invalidInput = computed((): string => {
  if (props.error) {
    return 'invalid__input';
  }
  return '';
});
</script>
/* Template ================================================== */
<template>
  <div class="CC__text-input-container">
    <label
      v-if="props.label"
      for=""
      class="CC__text-input-label"
    >
      {{ props.label }}
      <span
        v-if="props.required"
        class="required"
        >*</span
      >
    </label>
    <div
      class="CC__text-input-wrapper cc-bg-white cc-d-flex cc-align-items-center cc-border cc-border-radius-4 cc-w-100 cc-mt-1 cc-box-shadow"
      :class="[
        `${leadingIcon}-wrapper`,
        props.error ? [invalidInput, 'cc-box-shadow-error'] : '',
      ]"
    >
      <div
        v-if="props.leadingIcon"
        class="CC__text-input-leading-icon-container"
      >
        <font-awesome-icon
          v-show="props.leadingIcon"
          class="leading-icon"
          :icon="props.leadingIcon"
        />
      </div>
      <input
        v-model="model"
        :id="props.inputId"
        :ref="props.inputRef"
        :maxlength="props.maxLength"
        v-maska="props.maska"
        class="text-input"
        :class="[invalidInput]"
        :type="props.type"
        :placeholder="placeholder"
        :disabled="disabled"
        @focus="emit('update:focus')"
        @blur="emit('update:blur')"
      />
      <CloseButton
        v-show="props.clearable && model"
        class="clear-button"
        :title="'Clear input'"
        @click="clearInput()"
      />

      <div
        v-if="props.trailingIcon"
        class="CC__text-input-trailing-icon-container"
      >
        <font-awesome-icon
          v-if="props.trailingIcon"
          class="trailing-icon"
          :icon="props.trailingIcon"
        />
      </div>
    </div>
    <template v-if="!!props.errorMessage">
      <div class="CC__input-error-message">{{ props.errorMessage }}</div>
    </template>
    <template v-if="props.hint && !props.errorMessage">
      <div class="CC__text-input-hint">Hint: {{ props.hint }}</div>
    </template>
  </div>
</template>
/* Style ============================================================== */
<style lang="postcss">
.CC__text-input {
  &-hint {
    position: relative;
    font-size: 0.875rem;
    color: #41474c;
    margin-top: 0.4rem;
    margin-left: 0.5rem;
  }
  &-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    .CC__input-error-message {
      position: relative;
      font-size: 0.875rem;
      color: var(--CC-color-required);
      margin-top: 0.4rem;
      margin-left: 0.5rem;
    }

    .required {
      color: #a41d33;
      margin-left: -0.5rem;
    }

    .CC__text-input-wrapper {
      line-height: 1.5rem;

      .CC__text-input-leading-icon-container {
        border-right: 2px solid #40495b7b;
        height: 100%;
        min-width: 2.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .CC__text-input-trailing-icon-container {
        border-left: 2px solid #40495b7b;
        height: 100%;
        min-width: 2.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &.invalid__input {
        outline: 1px solid var(--CC-color-error);
      }

      &:focus-within {
        outline: 1px solid var(--CC-color-focus-luminous);

        .clear-button {
          background-color: var(--CC-color-green);
          color: var(--CC-color-green-dark);
        }
      }

      .clear-button {
        position: relative;
        right: 0.5rem;
        width: 1.5rem;
        height: 1.5rem;
        color: var(--CC-color-gray-darker);
        background-color: var(--CC-color-transparent);
        border: none;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
          background-color: var(--CC-color-focus-dark);
          color: #fff;
        }
      }
    }

    .text-input {
      font-size: 1rem;
      min-height: 2.5rem;
      padding-left: 0.75rem;
      width: 100%;
      border-radius: 0 0.75rem 0.75rem 0;
      color: var(--CC-color-gray-darker);
      border: none;
      background-color: var(--CC-color-transparent);

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
