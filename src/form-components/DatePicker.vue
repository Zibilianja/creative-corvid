/* ==========================================================================
InputDateSelect.vue Describe what this component does.
========================================================================== */
<script setup lang="ts">
import { computed, onMounted, ref, reactive, watch } from 'vue';
import { GetInputId } from '@/utils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
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
    validator: (value: string) => {
      return ['MM/DD/YYYY', 'YYYY-MM-DD'].includes(value);
    },
  },
  required: {
    type: Boolean,
    default: false,
  },
  endYear: {
    type: Number,
    required: true,
  },
  futureYear: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['update:input']);

const labelId = GetInputId();
const requiredClass = ref('');
const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];
const days = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
];
const date = reactive({
  month: '',
  day: '',
  year: '',
});

const years = computed(() => {
  const numberOfYears = props.futureYear - props.endYear;
  const years = [];
  for (let i = props.futureYear; i >= props.futureYear - numberOfYears; i--) {
    years.push(i);
  }
  return years;
});

const isValidDate = computed(() => {
  if (date.month === '' || date.day === '' || date.year === '') {
    return true;
  }
  const _date = `${date.year}-${date.month}-${date.day}`;
  return dayjs(_date, 'YYYY-MM-DD', true).isValid();
});

const isFullDate = computed(() => {
  return date.month !== '' && date.day !== '' && date.year !== '';
});

watch(
  date,
  (newVal) => {
    if (newVal.month !== '' && newVal.day !== '' && newVal.year !== '') {
      const _date = `${newVal.year}-${newVal.month}-${newVal.day}`;
      const formattedDate = dayjs(_date, 'YYYY-MM-DD', true).format(
        props.format
      );
      if (formattedDate === 'Invalid date') {
        return;
      }
      emit('update:input', formattedDate);
    }
  },
  { deep: true }
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
  <div class="dps__input-date-select-container">
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

    <div
      :id="labelId"
      class="dps__input-date-select-grid"
      :class="[isValidDate ? '' : 'invalid__input']"
      :title="label"
    >
      <div class="dps-date-select-input month-select-input">
        <select
          v-model="date.month"
          title="Month"
          @change="emitUpdate('change')"
          @blur="emitUpdate('blur')"
        >
          <option selected value="">MM</option>
          <option v-for="month in months" :key="month" :value="month">
            {{ month }}
          </option>
        </select>
      </div>

      <span>/</span>

      <div class="dps-date-select-input day-select-input">
        <select
          v-model="date.day"
          title="Day"
          @change="emitUpdate('change')"
          @blur="emitUpdate('blur')"
        >
          <option selected value="">DD</option>
          <option v-for="day in days" :key="day" :value="day">
            {{ day }}
          </option>
        </select>
      </div>

      <span>/</span>

      <div class="dps-date-select-input year-select-input">
        <select
          v-model="date.year"
          title="Year"
          @change="emitUpdate('change')"
          @blur="emitUpdate('blur')"
        >
          <option selected value="">YYYY</option>
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
    </div>
    <div v-show="!isValidDate" class="dps__input-date-select-invalid-date-hint">
      Invalid Date
    </div>
  </div>
</template>

/* ==========================================================================
Styles
========================================================================== */
<style lang="postcss">
.dps__input-date-select-container {
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

  .dps__input-date-select-invalid-date-hint {
    color: #ff0000;
    font-style: italic;
    font-size: 0.9rem;
    margin-top: 0.25rem;
  }
}

.dps__input-date-select-grid {
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

  .dps-date-select-input {
    position: relative;
  }

  .dps-date-select-input:after {
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
