<script setup lang="ts">
import CloseButton from '@/components/CloseButton.vue';
import { defineProps, defineEmits, type PropType } from 'vue';
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

const handleInputChange = () => {
  console.log('validate method here');
};

const clearInput = () => {
  model.value = '';
  emit('update:modelValue', '');
};
</script>

<template>
  <div class="CC__text-input-container">
    <label v-if="props.label" for="" class="text-input-label">
      {{ props.label }}
      <span v-if="props.required" class="required">*</span>
    </label>
    <div class="CC__text-input-wrapper">
      <font-awesome-icon class="leading-icon" :icon="props.leadingIcon" />
      <input
        v-model="model"
        :id="props.inputId"
        :maxlength="props.maxLength"
        v-maska="props.maska"
        :class="['text-input', { invalid: props.error }]"
        :type="props.type"
        @input="handleInputChange()"
        :placeholder="placeholder"
        :disabled="disabled"
      />
      <CloseButton
        v-if="props.clearable && model"
        class="clear-button"
        @click="clearInput()"
      />
    </div>
    <template v-if="props.errorMessages">
      <div class="dps__input-message">{{ props.errorMessages }}</div>
    </template>
  </div>
</template>
/* Style ============================================================== */
<style lang="postcss">
.CC__text-input {
  &-container {
    width: fit-content;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .CC__text-input-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      border: 1px solid #3b475e;
      background-color: #fff;
      border-radius: 0.75rem;
      line-height: 1.5rem;
      width: fit-content;
      padding: 0 1rem;
      &:focus-within {
        border-color: #5fcebe;
        .clear-button {
          background-color: #5fcebd3b;
        }
      }
      .clear-button {
        width: 1.5rem;
        height: 1.5rem;
        color: #3b475e;
        background-color: #f2f1f1;
        border: none;
        border-radius: 50%;
        padding: 0.24rem;
        cursor: pointer;
        margin-left: 0.5rem;

        &:hover {
          background-color: #f0f0f0;
        }
      }
    }
    .leading-icon {
      margin-right: 0.5rem;
    }
    label {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      color: #333;
    }
    input {
      font-size: 1rem;
      width: 80%;
      min-height: 2.5rem;
      min-width: 15rem;
      border: none;
      border-left: 2px solid #40495b44;
      padding-left: 0.5rem;
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
