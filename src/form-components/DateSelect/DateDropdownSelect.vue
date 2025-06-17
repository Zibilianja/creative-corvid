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

// #region - Model, props, emits
// Define the model for the component
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

const emit = defineEmits(['update:input']);
// #endregion - Model, props, emits
// #region - Composables, refs and computed properties

const {
  determineDaysInMonth,
  determineMonths,
  makeYearsArray,
  makeDateString,
  isFullDate,
  validateDate,
  formatDate,
  getDateParts,
} = useDateState();

const date: DateType = reactive({
  year: '',
  month: '',
  day: '',
});
const dateErrorMessage = ref('');

const days = computed((): string[] => {
  return determineDaysInMonth(date.month, props.format);
});
const months = computed((): string[] => {
  return determineMonths(props.format);
});
const years = computed((): string[] => {
  return makeYearsArray(props.firstYear, props.yearsAvailable);
});

const isShortFormat = computed((): boolean => {
  return !props.format.includes('MMM');
});
const dateStr = computed((): string => {
  return makeDateString(date, isShortFormat.value);
});
const isValidDate = computed((): boolean => {
  if (isFullDate(date)) {
    return validateDate(dateStr.value, isShortFormat.value);
  }
  return true;
});
const labelId = GetInputId();

const errorClass = computed((): string => {
  const valid = validateDate(dateStr.value, isShortFormat.value);
  if (!valid) {
    return 'invalid__input';
  }
  if (valid && props.required) {
    return 'valid__input';
  } else {
    return '';
  }
});

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
// #endregion - Composables, refs and computed properties
// #region - Watchers, methods and lifecycle hooks
watch(
  date,
  (newVal: DateType) => {
    const dateStrNew = makeDateString(date, isShortFormat.value);
    if (isFullDate(date)) {
      if (validateDate(dateStrNew, isShortFormat.value)) {
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
  const dateParts = getDateParts(dateStr.value, props.format);
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
  console.log(formattedDate);
};

const emitUpdate = (emitType: string) => {
  if (props.required) {
    if (!isFullDate(date) && emitType === 'blur') {
      return;
    }
  }
  emitDateValue();
};

const handleDateChange = (newDate: DateType): void => {
  date.year = newDate.year;
  date.month = newDate.month;
  date.day = newDate.day;
  if (!isValidDate.value) {
    dateErrorMessage.value = 'Invalid Date';
  } else {
    dateErrorMessage.value = '';
  }
};
// #endregion - Watchers, methods and lifecycle hooks
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
        v-if="required && errorClass"
        :class="errorClass"
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
  width: fit-content;
  min-width: 12rem;
  padding: 0.5rem 2rem;

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
    margin-bottom: -1.35rem;
  }
}

.CC__input-date-select-grid {
  display: grid;
  grid-template-columns: 1fr auto 0.75fr auto 1fr;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--CC-color-gray-dark);
  border-radius: 0.75em;
  column-gap: 0.25rem;
  padding: 0.5rem 1rem;
  background-color: var(--CC-color-gray-light);
  color: var(--CC-color-gray-darker);

  &:focus-within {
    background-color: var(--CC-color-gray-lightest);
    outline: 2px solid var(--CC-color-blue-luminous);
  }

  &.invalid__input {
    outline: 2px solid var(--CC-color-red-dark);
    color: #ff0000;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .CC-date-select-input {
    position: relative;
    display: flex;
    flex-wrap: nowrap;

    select {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      border-radius: 0.5rem;
      border: 1px solid var(--CC-color-gray);
      min-height: 1.7rem;
      font-size: 1rem;
      background-color: var(--CC-color-white);

      color: var(--CC-color-gray-darker);
      padding: 0.25rem 0.5rem;
      &:focus {
        outline: 2px solid var(--CC-color-blue-luminous);
      }
    }
  }
  &.CC__input-date-select-long {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .CC__input-date-select-short {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
  }
}
</style>
