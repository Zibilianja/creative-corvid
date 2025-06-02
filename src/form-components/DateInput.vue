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
import { Button } from '../components';
import { vMaska } from 'maska/vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
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
  }
);

watch(
  () => props.error,
  (newValue) => {
    isInvalid.value = newValue;
  },
  { immediate: true }
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
    calendar.getActiveDate()
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
    today.getDate()
  );
};

const updateShowCalendar = () => {
  showCalendar.value = !showCalendar.value;
  window.addEventListener('click', onClickOutsideCalendar);
};

const onClickOutsideCalendar = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target.closest('.dps__calendar-container')) {
    return;
  }
  if (target.closest('.dps__input-date-button')) {
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
        today.getDate()
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
  <div class="dps__input-date-container">
    <label :for="inputId" :class="{ invalid__input: isInvalid }">
      {{ label }}
      <span v-if="required" class="req__asterisk"> &lowast; </span>
    </label>

    <div class="dps__input-date-btn-grid">
      <input
        :id="inputId"
        v-model="localDate"
        v-bind="$attrs"
        v-maska="'##/##/####'"
        type="text"
        class="dps__input-date-input"
        :class="{ invalid__input: isInvalid }"
        :disabled="props.disabled"
        :placeholder="placeholder"
        :aria-describedby="`${inputId}-messages`"
        @input="onInputChange"
        @blur="onBlurChange"
        @focus="isFocused = true"
      />
      <Button
        v-show="localDate && !disabled && isClearable"
        type="button"
        class="dps__input-clear-date-button dps__white"
        title="Clear Date"
        @click="clearDate()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="12"
          viewBox="0 0 384 512"
        >
          <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            fill="currentColor"
          />
        </svg>
      </Button>

      <Button
        label="Select Date"
        type="button"
        class="dps__input-date-button dps__blue dps__calendar-btn"
        :disabled="props.disabled"
        :title="`Select Date`"
        @click="updateShowCalendar"
      >
        <div class="dps__calendar-icon">
          <!-- <div class="dps__calendar-top"></div> -->
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
      <div v-if="showCalendar" class="dps__calendar-container">
        <div class="dps__calendar-header-and-nav">
          <button class="dps__calendar-nav" @click="updateCalendarDates(-1)">
            <span class="chevron left"></span>
          </button>
          <div class="dps__calendar-month-year">
            <select
              class="dps__calendar-header-select"
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
              class="dps__calendar-header-select"
              :value="calendar.getActiveYear()"
              @change="updateCalendarYear($event)"
            >
              <option v-for="(year, index) in yearOptions" :key="index">
                {{ year }}
              </option>
            </select>
          </div>
          <button class="dps__calendar-nav" @click="updateCalendarDates(1)">
            <span class="chevron right"></span>
          </button>
        </div>
        <div class="dps__calendar-weekday-names dps__calendar-grid-7col">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div class="dps__calendar-grid-7col">
          <button
            v-for="(date, index) in calendar.dates"
            :key="index"
            class="dps__calendar-modal-btn"
            @click="setDate(date.getFullDateAsString())"
            @keypress.enter="setDate(date.getFullDateAsString())"
          >
            <span
              class="dps__calendar-date"
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
      class="dps__input-text-details"
      :class="{ invalid__input: isInvalid }"
    >
      <div class="dps__input-messages">
        <div v-if="isInvalidDate" class="dps__input-message">Invalid date</div>
        <template v-else-if="_errorMessages">
          <div class="dps__input-message">{{ _errorMessages }}</div>
        </template>

        <template v-else>
          <div class="dps__input-message">
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
.dps__input-date {
  &-container {
    position: relative;

    label {
      font-size: 1rem;
      display: block;
      width: 100%;
      margin-bottom: 0.5rem;

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
    padding: 0.375rem 0.575rem;
    align-items: center;
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    background-color: #fff;
    border-right: 0;
    border-top: 0.0625rem solid #4a4a4a;
    border-left: 0.0625rem solid #4a4a4a;
    border-bottom: 0.0625rem solid #4a4a4a;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    box-sizing: border-box;
    color: #4a4a4a;
    min-height: 48px;

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

  &-btn-grid {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;

    button {
      line-height: 1.5;
      height: 46px;
      border-radius: 0;

      &.dps__calendar-btn {
        padding: 0.375rem;
        border-top: 0.0625rem solid #4a4a4a;
        border-right: 0.0625rem solid #4a4a4a;
        border-bottom: 0.0625rem solid #4a4a4a;
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;

        &[disabled] {
          background-color: #f1f1f1;
          color: #4a4a4a;
          cursor: not-allowed;
        }
      }

      &.dps__input-clear-date-button {
        color: #4a4a4a;
        border-left: 0 !important;
        border-top: 0.0625rem solid #4a4a4a;
        border-bottom: 0.0625rem solid #4a4a4a;
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

.dps__calendar-container {
  z-index: 999;
  display: flex;
  min-width: 16em;
  flex-direction: column;
  border: 1px solid #bbc1c6;
  position: absolute;
  right: 0;
  background-color: #fff;
  padding: 0 0.25rem 0.25rem 0.25rem;
  border-radius: 0.25rem;
  box-shadow: 2px 2px 4px 1px rgba(10, 10, 10, 0.2);
}

.dps__calendar-grid-7col {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0.15rem;

  div {
    text-align: center;
    font-size: 1rem;
  }

  .dps__calendar-modal-btn {
    padding: 0.25rem;
    border: 0;
    background-color: #fff;
  }
}

.dps__calendar-weekday-names {
  div {
    margin: 0 0 0.25rem 0;
    font-weight: 600;
  }
}

.dps__calendar-date {
  background-color: #fff;
  border-radius: 50%;
  box-sizing: border-box;
  /* padding: 0.25rem; */
  cursor: pointer;
  /* min-height: 2.25em; */
  min-height: 1.75rem;
  display: flex;
  place-items: center;
  place-content: center;

  &:hover {
    background-color: #e3e3e3;
  }

  &.today {
    background-color: #005b94;
    color: #fff;
  }

  &.selected {
    background-color: #415e21;
    color: #fff;
  }
}

.dps__calendar-header-and-nav {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  font-size: 1em;
  margin: 0.5rem 0;

  .dps__calendar-nav {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 0;
    background-color: #fff;

    &:hover {
      background-color: #e3e3e3;
    }
  }

  .dps__calendar-month-year {
    text-align: center;
    font-size: 1.25em;
    display: grid;
    grid-template-columns: 2fr 1.25fr;
    padding: 0 0.5rem;

    .dps__calendar-header-select {
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

.dps__input-clear-date-button {
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
}

.dps__calendar-icon {
  display: flex;
  padding: 0 0.15rem !important;

  svg {
    pointer-events: none;
  }
}
</style>
