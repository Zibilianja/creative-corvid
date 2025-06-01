<script setup lang="ts">
import CloseButton from '@/components/CloseButton.vue';
import { defineProps, defineEmits, computed, type PropType } from 'vue';
import { vMaska } from 'maska/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const model = defineModel({
  type: [String, null] as PropType<string | null>,
});

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  inputId: {
    type: String,
    default: '',
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

const emit = defineEmits(['update:modelValue']);

const clearInput = () => {
  model.value = '';
  emit('update:modelValue', '');
};

const leadingIcon = computed(() => {
  return !props.leadingIcon.includes('') ? 'has-leading-icon' : '';
});
</script>

<template>
  <div class="CC__text-input-container">
    <label v-if="props.label" for="" class="text-input-label">
      {{ props.label }}
      <span v-if="props.required" class="required">*</span>
    </label>
    <div class="CC__text-input-wrapper">
      <div
        class="CC__text-input-leading-icon-container"
        v-if="props.leadingIcon.length > 0"
      >
        <font-awesome-icon class="leading-icon" :icon="props.leadingIcon" />
      </div>
      <input
        v-model="model"
        :id="props.inputId"
        :maxlength="props.maxLength"
        v-maska="props.maska"
        class="text-input"
        :class="[leadingIcon, { invalid: props.error }]"
        :type="props.type"
        :placeholder="placeholder"
        :disabled="disabled"
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
  </div>
</template>
/* Style ============================================================== */
<style lang="postcss">
.CC__text-input {
  &-container {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: auto;
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
    .leading-icon {
      margin-right: 0.5rem;
    }

    label {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
      color: #333;
    }
    input {
      font-size: 1rem;
      width: 80%;
      min-height: 2.5rem;
      min-width: 15rem;
      border: none;
      padding-left: 0.5rem;
      &:focus {
        outline: none;
      }
      &.has-leading-icon {
        border-left: 2px solid #40495b7b;
      }
    }
  }
}
</style>
