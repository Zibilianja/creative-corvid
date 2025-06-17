/* ==========================================================================
DateDropdownSelect.vue Describe what this component does.
========================================================================== */
<script setup lang="ts">
import { computed, onMounted, ref, reactive, watch, type Component } from 'vue';
import { GetInputId } from '@/utils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { DateType } from '@/types';
import { useDateState } from '@/composables';
import DateSelectShort from './DateSelectShort.vue';
import DateSelectLong from './DateSelectLong.vue';

dayjs.extend(customParseFormat);
const model = defineModel({
  type: String,
});

const props = defineProps({
  label: {
    type: String,
    default: '',
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
  determineDaysInMonth,
  determineMonths,
  makeYearsArray,
  makeDateString,
  isFullDate,
  validateFormat,
  validateDate,
  formatDate,
  getDateParts,
} = useDateState();

const date: DateType = reactive({
  year: '',
  month: '',
  day: '',
});

const leapYearOverride = ref(false);
const dateErrorMessage = ref('');

const isFebruary = computed((): boolean => {
  return ['02', '2', 'Feb', 'February'].includes(date.month);
});
const days = computed((): string[] => {
  const yearVal =
    leapYearOverride.value && isFebruary.value ? '2024' : date.year;
  const daysCount = determineDaysInMonth(date.month, yearVal);
  return Array.from({ length: daysCount }, (_, i) =>
    (i + 1).toString().padStart(2, '0'),
  );
});
const months = determineMonths(props.format);
const years = makeYearsArray(props.firstYear, props.yearsAvailable);

const emit = defineEmits(['update:input']);

const labelId = GetInputId();
const requiredClass = ref('');

const dateStr = makeDateString(date);

const isValidFormat = computed((): boolean => {
  return validateFormat(props.format);
});

const isValidDate = computed((): boolean => {
  if (isFullDate(date)) {
    return validateDate(dateStr);
  }
  return true;
});

watch(
  date,
  (newVal: DateType) => {
    const dateStrNew = makeDateString(date);
    if (isFullDate(date)) {
      if (validateDate(dateStrNew)) {
        emit('update:input', formatDate(newVal, props.format));
      }
    }
  },
  { deep: true },
);

onMounted(() => {
  setDate();
});

const setDate = () => {
  if (!model.value) {
    return;
  }
  const dateParts = getDateParts(dateStr, props.format);
  if (dateParts) {
    date.year = dateParts.year;
    date.month = dateParts.month;
    date.day = dateParts.day;
  } else {
    dateErrorMessage.value = 'Invalid Date';
  }
};

const emitDateValue = () => {
  const formattedDate = formatDate(date, props.format);
  if (formattedDate === 'Invalid date') {
    return;
  }
  emit('update:input', formattedDate);
};

const emitUpdate = (emitType: string) => {
  if (props.required) {
    if (!isFullDate(date) && emitType === 'blur') {
      setRequiredCss(true);
      return;
    }
  }
  setRequiredCss(false);
  emitDateValue();
};

const setRequiredCss = (error: boolean) => {
  if (error) {
    requiredClass.value = 'invalid__input';
  }
  if (!error && props.required) {
    requiredClass.value = 'valid__input';
  }
};

const shortDateSeparator = computed((): string => {
  if (props.format.includes('-')) {
    return '-';
  } else {
    return '/';
  }
});
const longOrShortComponent = computed((): Component => {
  if (props.format.includes('MMMM') || props.format.includes('MMM')) {
    return DateSelectLong as Component;
  } else {
    return DateSelectShort as Component;
  }
});

const handleDateChange = (newDate: DateType): void => {
  date.year = newDate.year;
  date.month = newDate.month;
  date.day = newDate.day;
};
</script>

/* ==========================================================================
Template
========================================================================== */
<template>
  <div class="CC__input-date-select-container">
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

    <component
      :is="longOrShortComponent"
      :label-id="labelId"
      :date-value="date"
      :months="months"
      :days="days"
      :years="years"
      :separator="shortDateSeparator"
      :is-valid-date="isValidDate"
      @update:dateValue="handleDateChange"
      @blur="emitUpdate('blur')"
      @focus="setRequiredCss(false)"
    />
    <div
      v-show="!isValidDate"
      class="CC__input-date-select-invalid-date-hint"
    >
      {{ dateErrorMessage }}
    </div>
  </div>
</template>

/* ==========================================================================
Styles
========================================================================== */
<style lang="postcss">
.CC__input-date-select-container {
  display: flex;
  flex-direction: column;
  min-width: 20rem;

  label {
    font-size: 1rem;
    display: block;
    width: 100%;
    margin-bottom: 0.5rem;

    span {
      &.invalid__input {
        color: #ff0000;
      }
      &.req__asterisk {
        color: #ff0000;
      }
    }
  }

  .CC__input-date-select-invalid-date-hint {
    color: #ff0000;
    font-style: italic;
    font-size: 0.9rem;
    margin-top: 0.25rem;
  }
}

.CC__input-date-select-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 0.75em;
  padding: 0.25rem;
  column-gap: 0.75rem;
  background-color: #fff;
  color: var(--CC-color-gray-darker);

  &.invalid__input {
    border: 1px solid #ff0000;
    color: #ff0000;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .CC-date-select-input {
    position: relative;
    color: var(--CC-color-gray-darker);
    select {
      background-size: 1.5em 1.5em;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      border: 0;
      min-height: 36px;
      font-size: 1rem;
      background-color: transparent;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
    &:after {
      content: ' ';
      position: absolute;
      top: 50%;
      margin-top: 0;
      right: 0.75rem;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid black;
    }
  }
}
</style>
