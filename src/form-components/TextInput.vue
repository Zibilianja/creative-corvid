<script setup lang="ts">
import CloseButton from '@/components/CloseButton.vue';
import { defineProps, defineEmits, computed, type PropType } from 'vue';
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
    type: Array,
    default: () => ['', ''],
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
  errorMessages: {
    type: Array as () => string[],
    default: () => [],
  },
});

const clearInput = () => {
  model.value = '';
};

const leadingIcon = computed(() => {
  return !props.leadingIcon.includes('') ? 'has-leading-icon' : '';
});

const invalidInput = computed(() => {
  return model.value.length === 0
    ? 'invalid__input'
    : 'valid__input-after-error';
});
</script>

<template>
  <div class="CC__text-input-container">
    <label v-if="props.label" for="" class="text-input-label">
      {{ props.label }}
      <span v-if="props.required" class="required">*</span>
    </label>
    <div
      class="CC__text-input-wrapper"
      :class="[`${leadingIcon}-wrapper`, props.error ? invalidInput : 'WIN']"
    >
      <div
        class="CC__text-input-leading-icon-container"
        v-if="props.leadingIcon.length > 0"
      >
        <font-awesome-icon
          v-if="props.leadingIcon[0]"
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
        :class="[leadingIcon]"
        :type="props.type"
        :placeholder="placeholder"
        :disabled="disabled"
        @focus="emit('update:focus')"
        @blur="emit('update:blur')"
      />
      <CloseButton
        v-if="props.clearable && model"
        class="clear-button"
        :class="model ? 'button-present' : ''"
        @click="clearInput()"
      />
    </div>
    <template v-if="props.errorMessages.length > 0">
      <div class="CC__input-error-message">{{ props.errorMessages }}</div>
    </template>
    <template v-if="props.hint && props.errorMessages.length === 0">
      <div class="CC__text-input-hint">Hint: {{ props.hint }}</div>
    </template>
  </div>
</template>
/* Style ============================================================== */
<style lang="postcss">
.CC__text-input {
  &-hint {
    font-size: 0.875rem;
    color: #41474c;
    margin-top: 0.4rem;
    margin-left: 0.5rem;
  }
  &-container {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: auto;
    .required {
      color: #a41d33;
    }

    .CC__text-input-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      border: 1px solid #7b7c7e;
      background-color: #fff;
      box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.264);
      border-radius: 0.75rem;
      line-height: 1.5rem;
      padding: 0 0.75rem;
      min-width: 18rem;
      &.invalid__input {
        border: 2px solid #a41d33;
      }

      &:focus-within {
        border-color: #42a798;
        .clear-button {
          background-color: #4fbdad;
        }
      }

      .clear-button {
        width: 1.5rem;
        height: 1.5rem;
        color: #303e59;
        background-color: #f2f1f1;
        border: none;
        border-radius: 50%;
        padding: 0.24rem;
        cursor: pointer;
        &.button-present {
          margin-left: -1.5rem;
          transition:
            background-color 0.5s ease,
            color 0.5s ease;
        }
        &:hover {
          background-color: #637cabac;
          color: #fff;
        }
      }
    }

    .text-input {
      font-size: 1rem;
      width: 80%;
      min-height: 2.5rem;
      width: 100%;
      border: none;

      &:focus {
        outline: none;
      }
      &.has-leading-icon {
        border-left: 2px solid #40495b7b;
        padding-left: 0.5rem;
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
