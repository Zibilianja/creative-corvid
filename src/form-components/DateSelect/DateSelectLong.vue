<script setup lang="ts">
defineProps({
  labelId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  dateValue: {
    type: Object as () => {
      month: string | null;
      day: string | null;
      year: string | null;
    },
    required: true,
  },
  isValidDate: {
    type: Boolean,
    default: true,
  },
  months: {
    type: Array as () => string[],
    required: true,
  },
  days: {
    type: Array as () => string[],
    required: true,
  },
  years: {
    type: Array as () => string[],
    required: true,
  },
});

const emit = defineEmits(['update:dateValue', 'blur', 'focus']);
</script>

<template>
  <div
    :id="labelId"
    class="CC__input-date-select-grid CC__input-date-select-long"
    :class="[isValidDate ? '' : 'invalid__input']"
    :title="title"
  >
    <div class="CC-date-select-input month-select-input">
      <select
        v-model="dateValue.month"
        title="Month"
        @change="emit('update:dateValue', dateValue)"
        @focus="emit('focus')"
        @blur="emit('blur')"
      >
        <option
          selected
          disabled
          value=""
          class="select-placeholder"
        >
          Month
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
    <span>{{ ' ' }}</span>

    <div class="CC-date-select-input day-select-input">
      <select
        v-model="dateValue.day"
        title="Day"
        @change="emit('update:dateValue', dateValue)"
        @focus="emit('focus')"
        @blur="emit('blur')"
      >
        <option
          selected
          disabled
          value=""
          class="select-placeholder"
        >
          Day
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
    <span>{{ ', ' }}</span>
    <div class="CC-date-select-input year-select-input">
      <select
        v-model="dateValue.year"
        title="Year"
        @change="emit('update:dateValue', dateValue)"
        @focus="emit('focus')"
        @blur="emit('blur')"
      >
        <option
          selected
          disabled
          value=""
          class="select-placeholder"
        >
          Year
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
</template>
<style lang="postcss"></style>
