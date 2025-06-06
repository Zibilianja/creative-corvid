/* ==========================================================================
InputCheckbox.vue - This component is used to display a checkbox input field.
========================================================================== */

<script lang="ts" setup>
import { computed, ref, watch, type PropType } from 'vue';
import { GetInputId } from '@/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  label: {
    type: String,
    required: true,
    default: '',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  rules: {
    type: Array as PropType<Function[]>,
    default: () => [],
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const inputId = GetInputId();
const isInvalid = ref(false);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const checkIcon = computed(() => {
  return value.value ? 'check-square' : 'square';
});

const iconStyleClasses = computed(() => {
  if (hasError.value) {
    return 'invalid__input';
  } else if (value.value) {
    return 'checked';
  } else {
    return '';
  }
});

const _errorMessages = computed((): string => {
  if (props.errorMessages.length > 0) {
    return props.errorMessages[0];
  }
  const errors = props.rules.map((rule: Function) => rule(value.value));
  const _errors = errors?.filter(
    (item: boolean | string) => (item as boolean) !== true
  );

  if (props.error || _errors.length > 0) {
    return _errors[0];
  }
  return '';
});

const hasError = computed(() => {
  return _errorMessages.value || isInvalid.value;
});

watch(
  () => props.error,
  (newValue) => {
    isInvalid.value = newValue;
  },
  { immediate: true }
);

defineExpose({
  isValid: hasError,
});
</script>

/* Template ============================================================== */
<template>
  <div class="CC__input-checkbox-container">
    <div class="CC__input-checkbox-inline">
      <label :for="inputId" class="CC__input-checkbox-label">
        <input
          :id="inputId"
          v-model="value"
          v-bind="$attrs"
          type="checkbox"
          class="CC__input-checkbox-input"
          :checked="value"
        />
        <font-awesome-icon
          class="CC__input-checkbox-icon"
          :class="iconStyleClasses"
          :icon="['fas', checkIcon]"
        />

        {{ label }}
      </label>
    </div>

    <div
      v-show="_errorMessages"
      :id="`${inputId}-messages`"
      role="alert"
      class="CC__input-text-details"
      :class="{ invalid__input: hasError }"
    >
      <div class="CC__input-messages">
        <div class="CC__input-message">{{ _errorMessages }}</div>
      </div>
    </div>
  </div>
</template>

/* Styles ================================================================ */
<style lang="postcss">
.CC__input-checkbox {
  &-container {
    display: inline-block;
    cursor: pointer;
    width: fit-content;
  }

  &-inline {
    width: fit-content;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    column-gap: 0.5em;

    label {
      cursor: pointer;
    }
  }

  &-input {
    opacity: 0;
  }
}
</style>
