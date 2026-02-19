<script lang="ts" setup>
import { ref } from 'vue';
import Dropdown from '@/form-components/Dropdown.vue';
import Button from '@/components/Button.vue';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];
const selectedOption1 = ref(null);
const selectedOption2 = ref(null);
const requiredError = ref(false);

const onSubmit = () => {
  requiredError.value = !selectedOption1.value;
};

const onChange = () => {
  if (requiredError.value) {
    requiredError.value = false;
  }
};
</script>
/* Template ============================================================== */
<template>
  <form @submit.prevent="onSubmit">
    <div class="CC__demo-container">
      <div class="dropdown-row cc-d-flex cc-flex-row cc-gap-8">
        <Dropdown
          v-model="selectedOption1"
          class="cc__dropdown-demo"
          label="Required Selection"
          placeholder="Choose an option"
          required
          :options="options"
          :error="requiredError"
          @update:model-value="onChange"
        />
        <Dropdown
          v-model="selectedOption2"
          class="cc__dropdown-demo"
          label="Clearable Dropdown"
          placeholder="Choose an option"
          :options="options"
          clearable
        />
      </div>
      <div class="cc__button-container cc-d-flex cc-justify-end cc-mt-4">
        <Button
          type="submit"
          class="CC__button CC__blue-gray"
        >
          Submit
        </Button>
      </div>
    </div>
  </form>
</template>
<style lang="postcss"></style>
