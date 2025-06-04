/* ==========================================================================
InputCheckbox.vue - This component is used to display a checkbox input field.
========================================================================== */
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed, ref, watch, type PropType } from 'vue';
import { GetInputId } from '@/utils';

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
});

const emit = defineEmits(['update:modelValue']);

const inputId = GetInputId();
const isInvalid = ref(false);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
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
    <div
      class="CC__input-checkbox-inline"
      :class="{ invalid__input: hasError }"
    >
      <input
        :id="inputId"
        v-model="value"
        v-bind="$attrs"
        type="checkbox"
        class="CC__input-checkbox-input"
        :checked="value"
      />
      <label :for="inputId">
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
    margin-right: 0.5em;
    width: fit-content;
  }

  &-inline {
    width: fit-content;
    display: flex;
    align-items: center;
    padding: 0.375em;
    column-gap: 0.5em;
    border: 1px solid #fff;

    label {
      cursor: pointer;
      margin-bottom: 0 !important;
    }

    &.invalid__input {
      color: #a41d33;
      border: 1px solid #a41d33;
    }
  }

  &-input {
    cursor: pointer;
  }
}
</style>
