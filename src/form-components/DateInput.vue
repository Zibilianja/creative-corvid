/* ==========================================================================
DateInput.vue This is the standard button component for Denver Public Schools
custom applications.
========================================================================== */
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import {
  computed,
  onMounted,
  reactive,
  ref,
  useSlots,
  watch,
  type PropType,
  type SetupContext,
} from 'vue';
import { GetInputId, months } from '@/utils';
import { Calendar } from '@/models';
import { vMaska } from 'maska/vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import CloseButton from '@/components/CloseButton.vue';
import Button from '@/components/Button.vue';
dayjs.extend(customParseFormat);

const props = defineProps({
  label: {
    type: String,
    default: 'Select date',
  },
  modelValue: {
    type: [Date, String, null] as PropType<Date | String | null>,
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'MM/DD/YYYY',
  },
  hint: {
    type: String,
    default: '',
  },
  disabled: {
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
  isClearable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const slots: SetupContext['slots'] = useSlots();
const inputId = GetInputId();
const isDirty = ref(false);
const isInvalid = ref(false);
const isInvalidDate = ref(false);
const isFocused = ref(false);
const showCalendar = ref(false);
const calendar = reactive<Calendar>(new Calendar());

const localDate = computed({
  get: () => {
    if (typeof props.modelValue === 'object' && props.modelValue !== null) {
      return getModelValueDateAsString();
    }
    if (typeof props.modelValue === 'string') {
      return props.modelValue;
    }
    return '';
  },
  set: (value: string) => {
    const isValid = dayjs(value, 'MM/DD/YYYY', true).isValid();
    if (isValid) {
      emit('update:modelValue', new Date(value));
    } else {
      emit('update:modelValue', value);
    }
  },
});

const isValid = computed(() => {
  if (props.required && localDate.value.length === 0) {
    return false;
  }
  return _errorMessages.value === '' && !isInvalidDate.value;
});

const _errorMessages = computed((): string => {
  if (props.errorMessages.length > 0) {
    return props.errorMessages[0];
  }
  const errors = props.rules.map((rule: Function) => rule(localDate.value));
  const _errors = errors?.filter(
    (item: boolean | string) => (item as boolean) !== true,
  );

  if ((props.error || isDirty.value) && _errors.length > 0) {
    return _errors[0];
  }
  return '';
});

const showDetails = computed(() => {
  return props.hint || slots.hint || _errorMessages.value;
});

const yearOptions = computed(() => {
  const currentYear = new Date().getFullYear();
  const startYears = currentYear - 200;
  const years = [];
  for (let i = 0; i < 300; i++) {
    years.push(startYears + i);
  }
  return years;
});

const monthOptions = computed(() => {
  const options = [];
  const keys = Object.keys(months);
  for (let i = 0; i < keys.length; i++) {
    const key = Number(keys[i]);
    options.push({
      value: months[key].value,
      label: months[key].name,
    });
  }
  return options;
});

watch(
  () => _errorMessages.value,
  (newValue) => {
    if (newValue.length > 0) {
      isInvalid.value = true;
    }
  },
);

watch(
  () => props.error,
  (newValue) => {
    isInvalid.value = newValue;
  },
  { immediate: true },
);

onMounted(() => {
  if (props.errorMessages.length > 0) {
    isInvalid.value = true;
  }
  setCalendarActiveDate();
});

const setCalendarActiveDate = () => {
  if (localDate.value.length === 10) {
    const isValid = dayjs(localDate.value, 'MM/DD/YYYY', true).isValid();
    if (isValid) {
      calendar.setActiveDate(localDate.value);
    }
  }
};

const updateCalendarDates = (value: number) => {
  calendar.updateActiveDate(value);
};

const updateCalendarYear = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newYear = parseInt(target.value, 10);
  calendar.updateActiveYear(newYear);
};

const updateCalendarMonth = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newMonth = parseInt(target.value, 10) + 1;
  calendar.updateActiveMonth(
    calendar.getActiveYear(),
    newMonth,
    calendar.getActiveDate(),
  );
};

const setDate = (selectedDate: string) => {
  showCalendar.value = false;
  isInvalid.value = false;
  isInvalidDate.value = false;
  localDate.value = selectedDate;
};

const clearDate = () => {
  localDate.value = '';
  showCalendar.value = false;
  isInvalid.value = false;
  isInvalidDate.value = false;
  if (props.required) {
    isDirty.value = true;
    isInvalid.value = true;
  }
  const today = new Date();
  calendar.resetActiveDate(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );
};

const updateShowCalendar = () => {
  showCalendar.value = !showCalendar.value;
  window.addEventListener('click', onClickOutsideCalendar);
};

const onClickOutsideCalendar = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target.closest('.CC__calendar-container')) {
    return;
  }
  if (target.closest('.CC__input-date-button')) {
    return;
  }
  showCalendar.value = false;
  window.removeEventListener('click', onClickOutsideCalendar);
};

const getModelValueDateAsString = (): string => {
  const date = props.modelValue as Date;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const _month = month < 10 ? `0${month}` : month;
  const _day = day < 10 ? `0${day}` : day;
  return `${_month}/${_day}/${year}`;
};

const onBlurChange = (): void => {
  isFocused.value = false;
  isDirty.value = true;
  isInvalidDate.value = false;
  if (localDate.value.length === 10) {
    const isValid = dayjs(localDate.value, 'MM/DD/YYYY', true).isValid();
    if (!isValid) {
      isInvalid.value = true;
      isInvalidDate.value = true;
      return;
    }
    isInvalidDate.value = false;
    return;
  }
  if (props.required && localDate.value.length === 0) {
    isInvalid.value = true;
    return;
  }
  if (!props.required && localDate.value.length === 0) {
    isInvalid.value = false;
    return;
  }
  isInvalidDate.value = true;
  isInvalid.value = !!_errorMessages.value || isInvalidDate.value;
};

const onInputChange = (): void => {
  if (localDate.value.length === 10) {
    const isValid = dayjs(localDate.value, 'MM/DD/YYYY', true).isValid();
    if (!isValid) {
      isInvalid.value = true;
      isInvalidDate.value = true;
      const today = new Date();
      calendar.resetActiveDate(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
      );
      return;
    } else {
      calendar.setActiveDate(localDate.value);
    }
  }
  isInvalidDate.value = false;
  isInvalid.value = _errorMessages.value ? true : false;
};

defineExpose({
  focused: isFocused,
  isValid: isValid,
});
</script>

/* Template ============================================================== */
<template>
  <div class="CC__input-date-container">
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

    <div
      class="CC__input-date-btn-grid"
      :class="{ invalid__input: isInvalid }"
      @focusin="isInvalid = false"
    >
      <input
        :id="inputId"
        v-model="localDate"
        v-bind="$attrs"
        v-maska="'##/##/####'"
        type="text"
        class="CC__input-date-input"
        :class="{ invalid__input: isInvalid }"
        :disabled="props.disabled"
        :placeholder="placeholder"
        :aria-describedby="`${inputId}-messages`"
        @input="onInputChange"
        @blur="onBlurChange"
        @focus="isFocused = true"
      />
      <CloseButton
        v-show="localDate && !disabled && isClearable"
        type="button"
        class="cc-clear-button CC__white"
        :class="[modelValue ? 'button-present' : '']"
        title="Clear Date"
        @click="clearDate()"
      />
      <Button
        label="Select Date"
        type="button"
        class="CC__input-date-button CC__blue CC__calendar-btn"
        :disabled="props.disabled"
        :title="`Select Date`"
        @click="updateShowCalendar"
      >
        <div class="CC__calendar-icon">
          <!-- <div class="CC__calendar-top"></div> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="18"
            viewBox="0 0 448 512"
          >
            <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
            <path
              fill="currentColor"
              d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
            />
          </svg>
        </div>
      </Button>
    </div>

    <div>
      <div
        v-if="showCalendar"
        class="CC__calendar-container"
      >
        <div class="CC__calendar-header-and-nav">
          <button
            class="CC__calendar-nav"
            @click="updateCalendarDates(-1)"
          >
            <span class="chevron left"></span>
          </button>
          <div class="CC__calendar-month-year">
            <select
              class="CC__calendar-header-select"
              :value="calendar.getActiveMonth()"
              @change="updateCalendarMonth($event)"
            >
              <option
                v-for="(month, index) in monthOptions"
                :key="index"
                :value="month.value"
              >
                {{ month.label }}
              </option>
            </select>

            <select
              class="CC__calendar-header-select"
              :value="calendar.getActiveYear()"
              @change="updateCalendarYear($event)"
            >
              <option
                v-for="(year, index) in yearOptions"
                :key="index"
              >
                {{ year }}
              </option>
            </select>
          </div>
          <button
            class="CC__calendar-nav"
            @click="updateCalendarDates(1)"
          >
            <span class="chevron right"></span>
          </button>
        </div>
        <div class="CC__calendar-weekday-names CC__calendar-grid-7col">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div class="CC__calendar-grid-7col">
          <button
            v-for="(date, index) in calendar.dates"
            :key="index"
            class="CC__calendar-modal-btn"
            @click="setDate(date.getFullDateAsString())"
            @keypress.enter="setDate(date.getFullDateAsString())"
          >
            <span
              class="CC__calendar-date"
              :class="{
                selected: localDate === date.getFullDateAsString(),
                today:
                  calendar.currentDate.getFullDateAsString() ===
                  date.getFullDateAsString(),
              }"
            >
              {{ date.getDate() }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <div
      v-show="showDetails"
      :id="`${inputId}-messages`"
      role="alert"
      class="CC__input-text-details"
      :class="{ invalid__input: isInvalid }"
    >
      <div class="CC__input-messages">
        <div
          v-if="isInvalidDate"
          class="CC__input-message"
        >
          Invalid date
        </div>
        <template v-else-if="_errorMessages">
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
.CC__input-date {
  &-container {
    position: relative;

    label {
      font-size: 1rem;
      display: flex;
      width: fit-content;
      margin-bottom: 0.5rem;

      span {
        &.req__asterisk {
          margin-left: -0.5rem;
          color: #a41d33;
        }
      }

      &.invalid__input {
        color: #a41d33;
      }
    }
  }

  &-input {
    padding: 0.375rem 0.575rem;
    align-items: center;
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    background-color: transparent;
    border: none;
    border-radius: 0.75rem;
    box-sizing: border-box;
    color: #4a4a4a;

    &[disabled] {
      background-color: #f1f1f1;
      color: #4a4a4a;
      cursor: not-allowed;
    }
    &:focus {
      outline: none;
    }

    &.invalid__input {
      &::placeholder {
        color: #a41d33;
      }
    }
  }

  &-btn-grid {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #7b7c7e;
    background-color: #fff;
    border-radius: 0.75rem;
    padding: 0;
    &.invalid__input {
      border: 1px solid #a41d33;
      color: #a41d33;
    }
    &:focus-within {
      outline: 2px solid var(--CC-color-green-light);
    }

    button {
      &.CC__calendar-btn {
        padding: 0.375rem;
        border: none;
        min-height: 2.5rem;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

        &[disabled] {
          background-color: #f1f1f1;
          color: #4a4a4a;
          cursor: not-allowed;
        }
      }
    }
  }

  &-help {
    margin-top: -1em;
    margin-bottom: 1em;
    font-size: 0.9rem;
    color: #4a4a4a;
    font-style: italic;
  }
}

.CC__calendar-container {
  z-index: 999;
  display: flex;
  min-width: 16em;
  flex-direction: column;
  border: 1px solid #bbc1c6;
  position: absolute;
  right: 0;
  background-color: #fff;
  padding: 0 0.25rem 0.25rem 0.25rem;
  border-radius: 0.75rem;
  box-shadow: 2px 2px 4px 1px rgba(10, 10, 10, 0.2);
}

.CC__calendar-grid-7col {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0.15rem;

  div {
    text-align: center;
    font-size: 1rem;
    background-color: var(--CC-color-gray-light);
  }

  .CC__calendar-modal-btn {
    padding: 0.25rem;
    border: 0;
    background-color: #fff;
  }
}

.CC__calendar-weekday-names {
  div {
    margin-bottom: 0.25rem;
    font-weight: 600;
  }
}

.CC__calendar-date {
  background-color: var(--CC-color-gray-light);
  color: #4a4a4a;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 0.25rem;
  min-height: 2rem;
  display: flex;
  place-items: center;
  place-content: center;

  &:hover {
    background-color: var(--CC-color-gray);
  }

  &.today {
    background-color: var(--CC-color-blue-dark);
    color: #fff;
  }

  &.selected {
    background-color: var(--CC-color-success);
    color: #fff;
  }
}

.CC__calendar-header-and-nav {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  font-size: 1em;
  margin: 0.5rem 0;

  .CC__calendar-nav {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 0;
    background-color: #fff;

    &:hover {
      background-color: #e3e3e3;
    }
  }

  .CC__calendar-month-year {
    text-align: center;
    font-size: 1.25em;
    display: grid;
    grid-template-columns: 2fr 1.25fr;
    padding: 0 0.5rem;

    .CC__calendar-header-select {
      font-size: 1.15rem;
    }
  }

  span {
    cursor: pointer;
  }
  .chevron::before {
    border-style: solid;
    border-width: 0.15em 0.15em 0 0;
    border-color: #4a4a4a;
    content: '';
    display: inline-block;
    height: 0.35em;
    left: 0.15em;
    position: relative;
    top: 0.65em;
    transform: rotate(-45deg);
    vertical-align: top;
    width: 0.35em;
  }
  .chevron.left::before {
    transform: rotate(-135deg);
    margin-right: 5px;
    margin-left: 3px;
  }
  .chevron.right::before {
    transform: rotate(45deg);
    margin-right: 0.5rem;
  }
}

.CC__input-clear-date-button {
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
}

.CC__calendar-icon {
  display: flex;
  padding: 0 0.15rem;

  svg {
    pointer-events: none;
  }
}
</style>
