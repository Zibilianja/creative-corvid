/* ==========================================================================
DateDropdownSelect.vue Describe what this component does.
========================================================================== */
<script setup lang="ts">
import { computed, onMounted, ref, reactive, watch } from 'vue';
import { GetInputId } from '@/utils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { DateType } from '@/types';
import { useDateState } from '@/composables';

dayjs.extend(customParseFormat);

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: null,
  },
  format: {
    type: String,
    default: 'MM/DD/YYYY',
  },
  required: {
    type: Boolean,
    default: false,
  },
  firstYear: {
    type: Number,
    required: true,
  },
  yearsAvailable: {
    type: Number,
    required: true,
  },
});
const {
  days,
  determineMonths,
  makeYearsArray,
  makeDateString,
  isFullDate,
  validateDate,
  formatDate,
} = useDateState();

const date: DateType = reactive({
  year: '',
  month: '',
  day: '',
});

const dateError = ref(false);
const months = determineMonths(props.format);
const years = makeYearsArray(props.firstYear, props.yearsAvailable);

const emit = defineEmits(['update:input']);

const labelId = GetInputId();
const requiredClass = ref('');

const daysInMonth = computed(() => {
  if (date.year) {
    return days(date.month, date.year);
  }
  return days(date.month, '1999');
});

const dateStr = computed((): string => {
  return dayjs(makeDateString(date), 'YYYY-MM-DD', true).format(props.format);
});

const isValidDate = computed((): boolean => {
  return validateDate(dateStr.value, props.format);
});

watch(
  date,
  (newVal: DateType) => {
    const dateStrNew = makeDateString(date);
    if (isFullDate(date)) {
      if (validateDate(dateStrNew, props.format)) {
        emit('update:input', formatDate(newVal, props.format));
      }
    }
  },
  { deep: true },
);

onMounted(() => {
  setDate();
});

const monthElement = ref<HTMLSelectElement | null>(null);
const dayElement = ref<HTMLSelectElement | null>(null);
const yearElement = ref<HTMLSelectElement | null>(null);

const openSelect = (element: 'month' | 'day' | 'year', e: MouseEvent) => {
  const selectElement = {
    month: monthElement.value,
    day: dayElement.value,
    year: yearElement.value,
  }[element];
  if (!selectElement || selectElement.disabled) {
    return;
  }
  if (e.target instanceof HTMLSelectElement) return;
  e.preventDefault();
  selectElement.focus();
  selectElement.click();
};

const setDate = () => {
  if (props.value === null || props.value === '') {
    return;
  }
  if (props.format === 'MM/DD/YYYY') {
    const dateArray = props.value.split('/');
    date.month = dateArray[0];
    date.day = dateArray[1];
    date.year = dateArray[2];
  }
  if (props.format === 'YYYY-MM-DD') {
    const dateArray = props.value.split('-');
    date.month = dateArray[1];
    date.day = dateArray[2];
    date.year = dateArray[0];
  }
};

const emitDateValue = () => {
  const _date = `${date.year}-${date.month}-${date.day}`;
  const formattedDate = dayjs(_date, 'YYYY-MM-DD', true).format(props.format);
  if (formattedDate === 'Invalid date') {
    return;
  }
  emit('update:input', formattedDate);
};

/**
 * @description - Emits the updated date value when the input changes if the date is full and valid
 *
 * @param emitType
 */
const emitUpdate = (emitType: string) => {
  if (
    props.required === true &&
    isFullDate(date) == false &&
    emitType === 'blur'
  ) {
    setRequiredCss(true);
    return;
  }
  setRequiredCss(false);
  emitDateValue();
};

/**
 *  @description - Handles the focus out event for the date input group
 *
 * @param e - The focus event
 */
const focusOutEvent = (e: FocusEvent) => {
  const dateInputGroup = e.currentTarget as HTMLElement;
  const nextFocusTarget = e.relatedTarget as Node | null;
  if (!nextFocusTarget || !dateInputGroup.contains(nextFocusTarget)) {
    emitUpdate('blur');
  }
};

/**
 * @description - Sets the required CSS class based on the error state
 *
 * @param error - Indicates whether the input is in an error state
 */
const setRequiredCss = (error: boolean) => {
  if (error) {
    dateError.value = true;
    requiredClass.value = 'invalid__input';
  }
  if (!error && props.required) {
    dateError.value = false;
    requiredClass.value = 'valid__input';
  }
};

const setErrorCssSelections = (value: string): string => {
  if (requiredClass.value === 'invalid__input' && !value) {
    return 'error-select';
  }
  return '';
};
</script>

/* ==========================================================================
Template
========================================================================== */
<template>
  <div
    class="CC__input-date-select-container"
    @focusout="focusOutEvent"
    @focusin="requiredClass = ''"
  >
    <label :for="labelId">
      {{ label }}
      <span
        v-if="required"
        class="req__asterisk"
      >
        *
      </span>
      <span
        v-if="required && requiredClass === 'invalid__input'"
        :class="requiredClass"
      >
        Required
      </span>
    </label>

    <div
      :id="labelId"
      class="CC__input-date-select-grid"
      :class="[requiredClass]"
      :title="label"
    >
      <div
        class="CC-date-select-input month-select-input"
        :class="setErrorCssSelections(date.month)"
        @mousedown="openSelect('month', $event)"
      >
        <select
          v-model="date.month"
          title="Month"
          @change="emitUpdate('change')"
        >
          <option
            value=""
            disabled
          >
            MM
          </option>
          <option
            v-for="month in months"
            :key="month"
            :value="month"
          >
            {{ month }}
          </option>
        </select>
        <font-awesome-icon
          :icon="['fas', 'caret-down']"
          class="select-drop-down-caret"
        />
      </div>

      <span>/</span>

      <div
        class="CC-date-select-input day-select-input"
        :class="[
          !date.month ? 'disabled' : '',
          setErrorCssSelections(date.day),
        ]"
        @mousedown="openSelect('day', $event)"
      >
        <select
          v-model="date.day"
          :title="!date.month ? 'Select Month First' : 'Day'"
          :disabled="!date.month"
          @change="emitUpdate('change')"
        >
          <option
            selected
            disabled
            value=""
          >
            DD
          </option>
          <option
            v-for="day in daysInMonth"
            :key="day"
            :value="day"
          >
            {{ day }}
          </option>
        </select>
        <font-awesome-icon
          :icon="['fas', 'caret-down']"
          class="select-drop-down-caret"
        />
      </div>

      <span>/</span>

      <div
        class="CC-date-select-input year-select-input"
        :class="setErrorCssSelections(date.year)"
        @mousedown="openSelect('year', $event)"
      >
        <select
          v-model="date.year"
          title="Year"
          @change="emitUpdate('change')"
        >
          <option
            selected
            disabled
            value=""
          >
            YYYY
          </option>
          <option
            v-for="year in years"
            :key="year"
            :value="year"
          >
            {{ year }}
          </option>
        </select>
        <font-awesome-icon
          :icon="['fas', 'caret-down']"
          class="select-drop-down-caret"
        />
      </div>
    </div>
    <div
      v-show="props.required && isFullDate(date) && !isValidDate"
      class="CC__input-date-select-invalid-date-hint"
    >
      Invalid Date
    </div>
  </div>
</template>

/* ==========================================================================
Styles
========================================================================== */
<style lang="scss">
.CC__input-date-select-container {
  display: flex;
  flex-direction: column;
  width: auto;

  label {
    font-size: 1rem;
    display: block;
    width: 100%;
    margin-bottom: 0.5rem;

    span {
      &.invalid__input {
        font-size: 0.75rem;
        margin-bottom: 0.5rem;
        margin-left: -0.5rem;
        color: var(--CC-color-required-light);
      }
      &.req__asterisk {
        color: var(--CC-color-required-light);
      }
    }
  }

  .CC__input-date-select-invalid-date-hint {
    color: var(--CC-color-required-light);
    font-style: italic;
    font-size: 0.9rem;
    margin-top: 0.25rem;
  }
}

.CC__input-date-select-grid {
  max-width: 100%;
  background-color: var(--CC-color-white);
  color-scheme: light;
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  border: 1px solid var(--CC-color-gray-dark);
  border-radius: 0.5em;

  column-gap: 0.75rem;
  color: black;

  &.invalid__input {
    border: 1px solid var(--CC-color-required-light);
    color: var(--CC-color-required-light);
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
  }

  .CC-date-select-input {
    position: relative;

    width: fit-content;

    display: flex;
    flex-wrap: nowrap;

    align-items: center;
    color: var(--CC-color-gray-darker);
    &.disabled {
      color: var(--CC-color-gray);
    }
    .select-drop-down-caret {
      font-size: 0.75rem;
      margin-left: -0.7rem;
      pointer-events: none;
    }
  }

  .CC-date-select-input:hover {
    &.disabled {
      color: var(--CC-color-gray);
    }
    color: var(--CC-color-focus-dark);
  }

  .CC-date-select-input {
    &.error-select {
      color: var(--CC-color-required);
    }
  }

  select {
    display: flex;
    align-items: center;
    border: none;
    border-radius: 3px;
    background-color: transparent;
    min-height: 2rem;
    font-size: 0.95rem;
    padding-left: 0.25rem;
    padding-right: 1rem;
    color: var(--CC-color-gray-darkest);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    &:focus-visible {
      outline: 2px solid var(--CC-color-focus-darker);
      border-radius: 3px;
      background-color: var(--CC-color-gray-lightest);
    }
    &:not(:disabled) {
      cursor: pointer;
    }
    &:disabled {
      cursor: not-allowed;
    }
    option {
      color: var(--CC-color-gray-darker);
    }
  }
}
</style>
