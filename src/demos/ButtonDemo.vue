<script lang="ts" setup>
import { ref } from 'vue';
import Button from '@/components/Button.vue';
import ToastAlert from '@/components/ToastAlert.vue';

const toastValue = ref('default');
const valueToast = ref(false);

const displayToast = (message: string): void => {
  valueToast.value = true;
  toastValue.value = message;
};
</script>
/* Template ============================================================== */
<template>
  <div class="CC__demo-container">
    <div>
      <header>
        <h2>Button Demo</h2>
        <p>Click the buttons below to see a demo of Toast alerts.</p>
      </header>
    </div>
    <div class="CC__button-demo">
      <Button class="CC__blue-gray" @click="displayToast('announcement')"
        >Announcement Button</Button
      >
      <Button class="CC__green" @click="displayToast('success')"
        >Submit Button</Button
      >
      <Button class="CC__red" @click="displayToast('error')"
        >Delete Button</Button
      >
      <Button class="CC__purple" @click="displayToast('info')"
        >Info Button</Button
      >
      <Button disabled>Disabled Button</Button>
      <Button class="CC__blue loading-button" disabled
        >Loading...<font-awesome-icon id="spinner" :icon="['fas', 'spinner']"
      /></Button>
    </div>
    <ToastAlert
      v-model="valueToast"
      :state="toastValue"
      @update:modelValue="valueToast = $event"
    >
      <template v-slot:title>Toast: {{ toastValue }}</template>
      <template v-slot:message
        >This is a toast {{ toastValue }} message.</template
      >
    </ToastAlert>
  </div>
</template>
/* Styles ============================================================== */
<style lang="postcss">
.CC__button-demo {
  display: flex;
  justify-content: space-evenly;
}
</style>
