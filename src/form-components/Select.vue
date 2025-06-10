/* ==========================================================================
InputSelect.vue This component is the
========================================================================== */
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
  useAttrs,
  useSlots,
  watch,
  type PropType,
  type SetupContext,
} from 'vue';
import { GetInputId } from '@/utils';

const model = defineModel<string>({
  required: true,
});

const props = defineProps({
  label: {
    type: String,
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
  placeholder: {
    type: String,
    default: 'Select',
  },
  hint: {
    type: String,
    default: '',
  },
  isClearable: {
    type: Boolean,
    default: true,
  },
  itemTitle: {
    type: String,
    default: 'label',
  },
  itemValue: {
    type: String,
    default: 'value',
  },
  disableDefaultOption: {
    type: Boolean,
    default: false,
  },
  showDefaultOption: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['click:clear']);

const slots: SetupContext['slots'] = useSlots();
const attrs: SetupContext['attrs'] = useAttrs();
const inputId = GetInputId();
const menuOptions = ref<Record<string, string>[]>([]);
const isDirty = ref(false);
const isInvalid = ref(false);
const isFocused = ref(false);

const _errorMessages = computed((): string => {
  if (props.errorMessages.length > 0) {
    return props.errorMessages[0];
  }
  const errors = props.rules.map((rule: Function) => rule(model.value));
  const _errors = errors?.filter(
    (item: boolean | string) => (item as boolean) !== true,
  );

  if ((props.error || isDirty.value) && _errors.length > 0) {
    return _errors[0];
  }
  return '';
});

const isValid = computed((): boolean => {
  if (props.required && model.value && model.value.length === 0) {
    return false;
  }
  return _errorMessages.value === '' && !isInvalid.value;
});

const showDetails = computed(() => {
  return props.hint || slots.hint || _errorMessages.value;
});

const showClearButton = computed((): boolean => {
  if (!props.isClearable) {
    return false;
  }
  return !!model.value;
});

watch(
  () => props.error,
  (newValue: boolean): void => {
    isInvalid.value = newValue;
  },
);

watch(
  () => _errorMessages.value,
  (newValue: string): void => {
    isInvalid.value = newValue ? true : false;
  },
);

watch(
  () => attrs['disabled'],
  (newValue: unknown): void => {
    if (newValue) {
      isDirty.value = false;
      isInvalid.value = false;
    }
  },
);

onMounted(() => {
  menuOptions.value = props.options;
});

const onBlurChange = (): void => {
  isFocused.value = false;
  isDirty.value = true;
  isInvalid.value = _errorMessages.value ? true : false;
};

const onSelectionChange = (): void => {
  if (!isDirty.value) {
    return;
  }
  isInvalid.value = _errorMessages.value ? true : false;
};

const onClearSelection = (): void => {
  model.value = '';
  emit('click:clear');
};

defineExpose({
  focused: isFocused,
  isValid: isValid,
});
</script>

/* Template ============================================================== */
<template>
  <div class="cc__input-select-container">
    <label
      :for="inputId"
      :class="{ invalid__input: isInvalid }"
    >
      {{ label }}
      <span
        v-if="required"
        class="req__asterisk"
      >
        &ast;
      </span>
    </label>
    <div class="cc__input-select-input-wrapper">
      <div class="cc__input-select-input-inner-wrapper">
        <select
          :id="inputId"
          v-model="model"
          class="cc__input-select-menu"
          v-bind="$attrs"
          :class="{ invalid__input: isInvalid, is__clearable: showClearButton }"
          :aria-describedby="`${inputId}-messages`"
          @blur="onBlurChange"
          @focus="isFocused = true"
          @change="onSelectionChange()"
        >
          <option
            v-if="showDefaultOption"
            value=""
            :disabled="disableDefaultOption"
            :selected="disableDefaultOption"
          >
            {{ placeholder }}
          </option>
          <option
            v-for="(option, oIndex) in menuOptions"
            :key="oIndex"
            :value="option[itemValue]"
          >
            {{ option[itemTitle] }}
          </option>
        </select>
        <div
          class="cc__input-select-caret"
          inert
        />
      </div>

      <button
        v-show="showClearButton"
        class="cc__input-select-clear-btn"
        title="Clear selection"
        type="button"
        @click="onClearSelection()"
      >
        <i aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
              fill="currentColor"
            />
          </svg>
        </i>
      </button>
    </div>

    <div
      v-show="showDetails"
      :id="`${inputId}-messages`"
      role="alert"
      class="cc__input-text-details"
      :class="{ invalid__input: isInvalid }"
    >
      <div class="cc__input-messages">
        <template v-if="_errorMessages">
          <div class="cc__input-message">{{ _errorMessages }}</div>
        </template>

        <template v-else>
          <div class="cc__input-message">
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
.cc__input-select {
  &-container {
    width: 100%;
    position: relative;

    label {
      font-size: 1rem;
      display: block;
      width: 100%;
      margin-bottom: 0.5rem !important;

      span {
        &.req__asterisk {
          color: #a41d33;
        }
      }

      &.invalid__input {
        color: #a41d33;
      }
    }
  }

  &-menu {
    display: block;
    width: 100%;
    padding: 0.375rem 2.5rem 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    border-radius: 0.375rem;
    margin: 0;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #4a4a4a;
    color: #4a4a4a;
    min-height: 48px;

    background-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &[disabled] {
      background-color: #f1f1f1;
      color: #4a4a4a;
      cursor: not-allowed;
    }

    option {
      font-size: 1rem;
      line-height: 1.5;
      width: 100%;
    }

    &.invalid__input {
      border: 1px solid #a41d33;
      color: #a41d33;
    }

    &.is__clearable {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0;
    }
  }

  &-menu[disabled] + &-clear-btn {
    display: none;
  }

  &-input-wrapper {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr auto auto;
  }

  &-input-inner-wrapper {
    position: relative;
  }

  &-clear-btn {
    display: flex;
    width: 1.75rem;
    color: #707070;
    cursor: pointer;
    border-radius: 0.25rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
    border-width: 1px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &-caret {
    position: absolute;
    top: 50%;
    right: 0.65rem;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #4a4a4a;
  }

  &-details {
    font-size: 0.8rem;
    color: #4a4a4a;
    padding-inline: 0.75rem;
    padding-top: 0.25rem;

    &.invalid__input {
      color: #a41d33;
    }
  }
}
</style>
