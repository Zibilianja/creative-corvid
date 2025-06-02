/* ==========================================================================
InputDecimal.vue This component is a reusable input that allows users to enter
decimal values.
========================================================================== */
<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue';
import { GetInputId } from '@/utils';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  value: {
    type: String as () => string | null,
    default: '',
  },
  pattern: {
    type: Array<number>,
    required: true,
    // default: () => [1, 2],
  },
  placeholder: {
    type: String,
    required: false,
    default: 'Enter decimal value',
  },
  required: {
    type: Boolean,
    default: false,
  },
  helpText: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([
  'input',
  'focus',
  'blur',
  'keydown',
  'keyup',
  'keypress',
]);
const emitUpdate = (emitType: any, value: any) => {
  if (props.required) {
    if ((val.value === '' || val.value == null) && emitType === 'blur') {
      setRequiredCss(true);
      return;
    }
  }
  setRequiredCss(false);
  emit(emitType, value);
};

const labelId = GetInputId();
const val = ref<number | string | null>('');
const inputLength = props.pattern[0] + props.pattern[1] + 1;
const inputRef = ref<HTMLInputElement>(
  document.getElementById(labelId) as HTMLInputElement
);
const requiredClass = ref('');

watchEffect(() => {
  val.value = props.value;
});

onMounted(() => {
  val.value = props.value;
});

/**
 * @description Updates the input value based on the user input
 * @param event
 */
const updateInput = (emitType: any, event: any) => {
  const input = event.target.value;
  if (input === '') {
    inputRef.value.value = '';
    val.value = null;
    emitUpdate(emitType, null);
    return;
  }
  if (isNaN(input)) {
    inputRef.value.value = '0';
    val.value = 0;
    emitUpdate(emitType, 0);
    return;
  }
  if (input.length == props.pattern[0]) {
    setInitialValue(emitType, input);
    return;
  }
  if (input.length > props.pattern[0] && input.length <= inputLength) {
    setRemainingValues(emitType, input);
    return;
  }
};

/**
 * @description Sets the initial value of the input on the left of the decimal
 * @param input
 */
const setInitialValue = (emitType: any, input: any) => {
  inputRef.value.value = input.slice(0, props.pattern[0]);
  val.value = Number(inputRef.value.value);
  emitUpdate(emitType, val.value);
};

/**
 * @description Sets the remaining values of the input on the right of the decimal
 * @param input
 */
const setRemainingValues = (emitType: any, input: any) => {
  const decimal = input.slice(props.pattern[0], input.length);
  input.replace('.', '');
  decimal.replace('.', '');
  inputRef.value.value =
    getLeftOfDecimal(input) + '.' + decimal.replace('.', '');
  val.value = Number(inputRef.value.value);
  emitUpdate(emitType, val.value);
};

/**
 * @description Gets the left of the decimal
 * @param input
 */
const getLeftOfDecimal = (input: any) => {
  let left = '';
  for (let i = 0; i < props.pattern[0]; i++) {
    left += input[i];
  }
  return left;
};

const setRequiredCss = (error: boolean) => {
  if (error) {
    requiredClass.value = 'invalid__input';
  }
  if (!error && props.required) {
    requiredClass.value = 'valid__input';
  }
};
</script>

/* ==========================================================================
Template
========================================================================== */
<template>
  <div class="dps__input-decimal-container">
    <label :for="labelId">
      {{ label }}
      <span v-if="required" class="req__asterisk"> * </span>
      <span
        v-if="required && requiredClass === 'invalid__input'"
        :class="requiredClass"
      >
        Required
      </span>
    </label>
    <input
      :id="labelId"
      type="text"
      class="dps__input-decimal-input"
      :class="requiredClass"
      :placeholder="placeholder"
      :value="val"
      ref="inputRef"
      :maxlength="inputLength"
      @input="updateInput('input', $event)"
      @focus="emitUpdate('focus', $event)"
      @blur="emitUpdate('blur', $event)"
      @keydown="emitUpdate('keydown', $event)"
      @keyup="emitUpdate('keyup', $event)"
      @keypress="emitUpdate('keypress', $event)"
    />
    <div v-if="helpText" class="dps__input-text-help">
      {{ helpText }}
    </div>
  </div>
</template>

/* ==========================================================================
Style ==========================================================================
*/
<style lang="postcss">
.dps__input-decimal {
  &-container {
    label {
      font-size: 1rem;
      display: block;
      width: 100%;

      span {
        &.invalid__input {
          color: #ff0000;
        }
        &.req__asterisk {
          color: #ff0000;
        }
      }
    }
  }
  &-input {
    display: block;
    width: 100%;
    padding: 0.375rem 0.575rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    background-color: #fff;
    border: 0.0625rem solid #bbc1c6;
    border-radius: 0.25rem;
    box-sizing: border-box;
    margin: 0.5rem 0 1rem 0;
    color: #4a4a4a;

    &.invalid__input {
      border: 1px solid #ff0000;
    }
    &.valid__input {
      border: 1px solid #28a745;
    }
  }
  &-help {
    margin-top: -1em;
    margin-bottom: 1em;
    font-size: 0.8rem;
    color: #4a4a4a;
    font-style: italic;
  }
}
</style>
