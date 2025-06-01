/* ==========================================================================
InputTextarea.vue
========================================================================== */
<script setup lang="ts">
import {
  computed,
  type CSSProperties,
  nextTick,
  onMounted,
  type PropType,
  ref,
  type SetupContext,
  useSlots,
  useAttrs,
  watch,
} from 'vue';

const model = defineModel({
  type: [String, null] as PropType<string | null>,
});

const props = defineProps({
  inputId: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
  autosize: {
    type: Boolean,
    default: true,
  },
  maxlength: {
    type: Number,
    default: 255,
  },
  placeholder: {
    type: String,
    default: 'Enter text here',
  },
  minHeight: {
    type: Number,
    default: null,
  },
  maxHeight: {
    type: Number,
    default: null,
  },
  important: {
    type: [Boolean, Array],
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  hint: {
    type: String,
    default: '',
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

const slots: SetupContext['slots'] = useSlots();
const attrs: SetupContext['attrs'] = useAttrs();
const isDirty = ref(false);
const isInvalid = ref(false);
const isFocused = ref(false);
const maxHeightScroll = ref(false);
const height = ref('auto');
const CCInputTextarea = ref<HTMLTextAreaElement>();

// #region computed
const _errorMessages = computed((): string => {
  if (props.errorMessages.length > 0) {
    return props.errorMessages[0];
  }
  const errors = props.rules.map((rule: Function) => rule(model.value));
  const _errors = errors?.filter(
    (item: boolean | string) => (item as boolean) !== true
  );

  if ((props.error || isDirty.value) && _errors.length > 0) {
    return _errors[0];
  }
  return '';
});

const showDetails = computed(() => {
  return props.hint || slots.hint || _errorMessages.value;
});

const isValid = computed((): boolean => {
  if (props.required && model.value && model.value.length === 0) {
    return false;
  }
  return _errorMessages.value === '' && !isInvalid.value;
});

const computedStyles = computed(() => {
  if (!props.autosize) return {} as CSSProperties;
  return {
    resize: !isResizeImportant.value ? 'none' : ('none !important' as unknown),
    height: height.value,
    overflow: maxHeightScroll.value
      ? 'auto'
      : !isOverflowImportant.value
        ? 'hidden'
        : 'hidden !important',
  } as CSSProperties;
});

const isResizeImportant = computed(() => {
  const imp = props.important;
  return imp === true || (Array.isArray(imp) && imp.includes('resize'));
});

const isOverflowImportant = computed(() => {
  const imp = props.important;
  return imp === true || (Array.isArray(imp) && imp.includes('overflow'));
});

const isHeightImportant = computed(() => {
  const imp = props.important;
  return imp === true || (Array.isArray(imp) && imp.includes('height'));
});
// #endregion computed

// #region watchers
watch(
  () => model.value,
  async () => {
    await nextTick();
    resize();
  }
);

watch(
  () => props.minHeight,
  async () => {
    await nextTick();
    resize();
  }
);

watch(
  () => props.maxHeight,
  async () => {
    await nextTick();
    resize();
  }
);

watch(
  () => props.autosize,
  (val) => {
    if (val) resize();
  }
);

watch(
  () => props.error,
  (newValue) => {
    isInvalid.value = newValue;
  },
  { immediate: true }
);

watch(
  () => attrs['disabled'],
  (newValue: unknown): void => {
    if (newValue) {
      isDirty.value = false;
      isInvalid.value = false;
    }
  }
);
// #endregion watchers

onMounted(() => {
  resize();
  if (props.errorMessages.length > 0) {
    isInvalid.value = true;
  }
});

const resize = async (): Promise<void> => {
  const _important = isHeightImportant.value ? 'important' : '';
  height.value = `auto${_important ? ' !important' : ''}`;
  await nextTick();
  const textareaElement = CCInputTextarea.value as HTMLTextAreaElement;
  if (!textareaElement) return;
  let contentHeight = textareaElement.scrollHeight + 1;

  if (props.minHeight) {
    contentHeight =
      contentHeight < props.minHeight ? props.minHeight : contentHeight;
  }

  if (props.maxHeight) {
    if (contentHeight > props.maxHeight) {
      contentHeight = props.maxHeight;
      maxHeightScroll.value = true;
    } else {
      maxHeightScroll.value = false;
    }
  }

  const heightValue = contentHeight + 'px';
  height.value = `${heightValue}${_important ? ' !important' : ''}`;
  return;
};

const onBlurChange = (): void => {
  isFocused.value = false;
  isDirty.value = true;
  if (props.required && model.value && model.value.length === 0) {
    isInvalid.value = true;
    return;
  }
  isInvalid.value = _errorMessages.value ? true : false;
};

const onInputChange = (): void => {
  if (!isDirty.value) {
    return;
  }
  isInvalid.value = _errorMessages.value ? true : false;
};

defineExpose({
  focused: isFocused,
  isValid: isValid,
});
</script>

/* ==========================================================================
Template
========================================================================== */
<template>
  <div class="CC__textarea-container">
    <label :for="inputId" :class="{ invalid__input: isInvalid }">
      {{ label }}
      <span v-if="required" class="req__asterisk"> &lowast; </span>
    </label>
    <slot name="prepend"></slot>
    <textarea
      :id="inputId"
      ref="dpsInputTextarea"
      v-model="model"
      v-bind="$attrs"
      class="CC__textarea-input"
      :class="{ invalid__input: isInvalid }"
      :maxlength="maxlength"
      :aria-describedby="`${inputId}-messages`"
      :placeholder="placeholder"
      :style="computedStyles"
      @input="onInputChange"
      @blur="onBlurChange()"
      @focus="
        resize();
        isFocused = true;
      "
    ></textarea>
    <div class="CC__textarea-details-container">
      <div
        v-if="showDetails"
        :id="`${inputId}-messages`"
        role="alert"
        class="CC__text-details"
        :class="{ invalid__input: isInvalid }"
      >
        <div class="CC__messages">
          <template v-if="_errorMessages">
            <div class="CC__message">{{ _errorMessages }}</div>
          </template>

          <template v-else>
            <div class="CC__message">
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
      <div v-else></div>
      <div class="CC__textarea-char-counter">
        {{ modelValue ? modelValue.length : 0 }} / {{ maxlength }}
      </div>
    </div>
  </div>
</template>

/* Styles ================================================================ */
<style lang="postcss">
.CC__textarea {
  &-container {
    display: grid;
    grid-template-rows: auto auto auto;
    width: 100%;

    label {
      font-size: 1rem;
      display: block;
      width: 100%;

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

  &-input {
    padding: 0.5rem !important;
    font-family: 'Tahoma', sans-serif;
    font-size: 1rem;
    color: #4a4a4a;
    border: 0.0625rem solid #4a4a4a;
    border-radius: 0.25rem;
    margin: 0;

    &[disabled] {
      background-color: #f1f1f1;
      color: #4a4a4a;
      cursor: not-allowed;
    }

    &.invalid__input {
      border: 1px solid #a41d33;
      color: #a41d33;

      &::placeholder {
        color: #a41d33;
      }
    }
  }

  &-details-container {
    display: flex;
    justify-content: space-between;
  }

  &-char-counter {
    display: flex;
    justify-content: flex-end;
    text-align: right;
    text-align: end;
    padding: 0.3rem;
    color: #4a4a4a;
    font-size: 0.8rem;
    font-style: italic;
    padding-inline: 0.75rem;
    white-space: nowrap;
  }
}
</style>
