<script lang="ts" setup>
import { computed, ref } from 'vue';
import Button from '@/components/Button.vue';
import ToastAlert from '@/components/ToastAlert.vue';

const toastValue = ref('default');
const valueToast = computed(() => {
  if (toastValue.value != 'default') {
    return true;
  } else return false;
});

const displayToast = (message: string): void => {
  toastValue.value = message;
  setTimeout(() => {
    toastValue.value = 'default';
  }, 3000);
};
</script>
<template>
  <header>
    <h2>Button Demo</h2>
    <p>Click the buttons below to see a demo of Toast alerts.</p>
  </header>
  <div class="CC__button-demo">
    <Button class="CC__blue-gray" @click="displayToast('announcement')"
      >Announcement Button</Button
    >
    <Button class="CC__green" @click="displayToast('success')"
      >Success Button</Button
    >
    <Button class="CC__red" @click="displayToast('error')">Error Button</Button>
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
    :class="valueToast ? 'shown' : 'hidden'"
  >
    <template v-slot:title>Toast: {{ toastValue }}</template>
    <template v-slot:message
      >This is a toast {{ toastValue }} message.</template
    >
  </ToastAlert>
</template>
<style lang="postcss">
header {
  text-align: center;
  margin-bottom: 1rem;
}
.CC__button-demo {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background-color: #f3f0f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.37);
}
.loading-button {
  #spinner {
    margin-left: 0.5rem;
    animation: spin 1.75s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.shown {
  animation: showToast 0.5s ease-in-out forwards;
  @keyframes showToast {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .hidden {
    animation: hideToast 0.5s ease-in-out forwards;
    @keyframes hideToast {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(20px);
      }
    }
  }
}
</style>
