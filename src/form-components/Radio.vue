/* ==========================================================================
InputRadio.vue Reusable radio input component for Vue 3 This component is used
to create a radio input field with validation and error handling. It is designed
to be used in forms and can be customized with various props.
========================================================================== */
<script setup lang="ts">
import { GetInputId } from '@/utils';
import {
  computed,
  onMounted,
  ref,
  useSlots,
  watch,
  type PropType,
  type SetupContext,
} from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, null] as PropType<string | null>,
    required: true,
  },
  options: {
    type: Array as PropType<Record<string, string>[]>,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: 'column',
    validator: (value: string) => ['column', 'row'].includes(value),
  },
  name: {
    type: String,
    required: true,
  },
  error: {
    type: Boolean,
    default: false,
  },
  hint: {
    type: String,
    default: '',
  },
  errorMessages: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  rules: {
    type: Array as PropType<Function[]>,
    default: () => [],
  },
  itemTitle: {
    type: String,
    default: 'label',
  },
  itemValue: {
    type: String,
    default: 'value',
  },
});

defineEmits(['update:modelValue']);

const slots: SetupContext['slots'] = useSlots();
const inputId = GetInputId();
const isInvalid = ref(false);

const _errorMessages = computed((): string => {
  if (props.errorMessages.length > 0) {
    return props.errorMessages[0];
  }
  const errors = props.rules.map((rule: Function) => rule(props.modelValue));
  const _errors = errors?.filter(
    (item: boolean | string) => (item as boolean) !== true
  );

  if (props.error || _errors.length > 0) {
    return _errors[0];
  }
  return '';
});

const isValid = computed((): boolean => {
  if (props.error) {
    return false;
  }
  if (props.required && !props.modelValue) {
    return false;
  }
  return _errorMessages.value === '' && !isInvalid.value;
});

const showDetails = computed(() => {
  return props.hint || slots.hint || _errorMessages.value;
});

watch(
  () => props.error,
  (value) => {
    if (value) {
      isInvalid.value = true;
    } else {
      isInvalid.value = false;
    }
  }
);

watch(
  () => props.errorMessages,
  (value) => {
    if (value.length > 0) {
      isInvalid.value = true;
    } else {
      isInvalid.value = false;
    }
  }
);

onMounted(() => {
  if (props.error) {
    isInvalid.value = true;
  }
});

defineExpose({
  isValid,
});
</script>

/* Template ============================================================== */
<template>
  <div class="CC__input-radio-container">
    <fieldset
      class="CC__input-radio-fieldset"
      :class="{
        invalid__input: isInvalid,
        column: direction === 'column',
        row: direction === 'row',
      }"
      :aria-describedby="`${inputId}-messages`"
    >
      <legend :for="inputId" :class="{ invalid__input: isInvalid }">
        {{ label }}
        <span v-if="required" class="req__asterisk"> &lowast; </span>
      </legend>

      <template v-for="(option, index) in options" :key="option[itemValue]">
        <label class="CC__input-radio-label" :disabled="disabled">
          <input
            :id="`${inputId}-${index}`"
            v-bind="$attrs"
            type="radio"
            class="CC__input-radio-input"
            :disabled="disabled"
            :name="name"
            :value="option[itemValue]"
            :checked="modelValue === option[itemValue]"
            @change="$emit('update:modelValue', option[itemValue])"
          />
          {{ option[itemTitle] }}
        </label>
      </template>
    </fieldset>

    <div
      v-show="showDetails"
      :id="`${inputId}-messages`"
      role="alert"
      class="CC__input-text-details"
      :class="{ invalid__input: isInvalid }"
    >
      <div class="CC__input-messages">
        <template v-if="_errorMessages">
          <div class="CC__input-message">{{ _errorMessages }}</div>
        </template>

        <template v-else>
          <div class="CC__input-message">
            <template v-if="slots.hint">
              <slot name="hint" />
            </template>
            <template v-if="hint">
              {{ hint }}
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

/* Styles ================================================================ */
<style lang="postcss">
.CC__input-radio {
  &-fieldset {
    border: 1px solid #fff;
    margin: 0;
    padding: 0;

    &.invalid__input {
      border-color: #a41d33;
      color: #a41d33;
    }

    &.column {
      display: flex;
      flex-direction: column;
    }
    &.row {
      display: flex;
      flex-direction: row;
      column-gap: 0.75rem;
    }

    legend {
      margin-bottom: 0.5rem;
      font-size: 1rem;
      width: unset !important;

      &.invalid__input {
        color: #a41d33;
      }

      span {
        &.req__asterisk {
          color: #a41d33;
        }
      }
    }
  }

  &-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: fit-content;
    padding: 0.25rem 0;

    &[disabled='true'] {
      cursor: not-allowed;
    }

    input[type='radio'] {
      margin: 0 0.25rem;

      &[disabled] {
        cursor: not-allowed;
      }
    }
  }
}
</style>
