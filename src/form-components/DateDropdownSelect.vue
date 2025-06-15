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
  validateFormat,
  validateDate,
  formatDate,
} = useDateState();

const date: DateType = reactive({
  year: '',
  month: '',
  day: '',
});

const dateErrorMessage = ref('');
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
  return validateDate(dateStr, props.format);
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

const emitUpdate = (emitType: string) => {
  if (props.required) {
    if (isFullDate.value === false && emitType === 'blur') {
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

    <div
      :id="labelId"
      class="CC__input-date-select-grid"
      :class="[isValidDate ? '' : 'invalid__input']"
      :title="label"
    >
      <div class="CC-date-select-input month-select-input">
        <select
          v-model="date.month"
          title="Month"
          @change="emitUpdate('change')"
          @blur="emitUpdate('blur')"
        >
          <option
            selected
            value=""
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
      </div>

      <span>/</span>

      <div class="CC-date-select-input day-select-input">
        <select
          v-model="date.day"
          title="Day"
          @change="emitUpdate('change')"
          @blur="emitUpdate('blur')"
        >
          <option
            selected
            value=""
          >
            DD
          </option>
          <option
            v-for="day in days"
            :key="day"
            :value="day"
          >
            {{ day }}
          </option>
        </select>
      </div>

      <span>/</span>

      <div class="CC-date-select-input year-select-input">
        <select
          v-model="date.year"
          title="Year"
          @change="emitUpdate('change')"
          @blur="emitUpdate('blur')"
        >
          <option
            selected
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
      </div>
    </div>
    <div
      v-show="!isValidDate"
      class="CC__input-date-select-invalid-date-hint"
    >
      Invalid Date
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
  border-radius: 0.25em;
  padding: 5px;
  column-gap: 0.75rem;
  background-color: #fff;

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
  }

  .CC-date-select-input:after {
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
}
</style>
