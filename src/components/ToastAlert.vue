<script setup lang="ts">
import { ref, watch, type Component } from 'vue';
import IconCheckmark from './Icons/IconCheckmark.vue';
import IconInfo from './Icons/IconInfo.vue';
import IconError from './Icons/IconError.vue';
import IconWarn from './Icons/IconWarn.vue';
import IconAnnouncement from './Icons/IconAnnouncement.vue';

const props = defineProps({
  state: {
    type: String,
    default: 'default',
    validator: (value: string) =>
      ['default', 'announcement', 'success', 'info', 'warn', 'error'].includes(
        value
      ),
  },
  timeout: {
    type: Number,
    default: 3000,
  },
});

const ICONS: Record<string, Component> = {
  success: IconCheckmark,
  info: IconInfo,
  error: IconError,
  warn: IconWarn,
  announcement: IconAnnouncement,
};

const model = defineModel<boolean>({ default: false });
const timeoutId = ref<number | null>(null);

watch(
  () => model.value,
  (newValue: boolean) => {
    if (newValue) {
      showToast();
    }
    if (!newValue) {
      cancelToast();
    }
  }
);

const showToast = () => {
  // Start a new timeout and store its ID
  timeoutId.value = window.setTimeout(() => {
    model.value = false;
  }, props.timeout);
};

const cancelToast = () => {
  if (timeoutId.value !== null) {
    clearTimeout(timeoutId.value); // Cancel the timeout
    timeoutId.value = null; // Reset the timeout ID
  }
};
</script>

/* Template ============================================================== */
<template>
  <div
    v-if="model"
    class="toast-container"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast" :class="state">
      <div class="toast-icon">
        <component :is="ICONS[state]" />
      </div>
      <div class="toast-content">
        <div class="toast-header">
          <slot name="title">Toast Alert: {{ state }}</slot>
        </div>
        <div class="toast-body">
          <slot name="message">{{ state }}</slot>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

/* Styles ================================================================ */
<style lang="postcss">
.toast-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: clamp(250px, calc(100vw - 2rem), 500px);

  .toast {
    background-color: #333;
    color: #000;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: dpsToastFadeInOut 3s ease-in-out;
    display: grid;
    grid-template-columns: 1.25rem 1fr;
    column-gap: 0.5rem;

    .toast-icon {
      display: flex;
      align-items: flex-start;

      font-size: 1.5rem;
    }

    &.error {
      background-color: #fff4f4;
      border: 2px solid #ad1f2a;
      .toast-icon,
      .toast-header {
        color: #ad1f2a;
      }
    }

    &.info {
      background-color: #f8efff;
      border: 2px solid #361d2e;
      .toast-icon,
      .toast-header {
        color: #361d2e;
      }
    }

    &.announcement {
      background-color: #e3e8f3;
      border: 2px solid #394064;
      .toast-icon,
      .toast-header {
        color: #394064;
      }
    }

    &.warn {
      background-color: #fff9e6;
      border: 2px solid #c9362b;
      .toast-icon {
        color: #c9362b;
      }
      .toast-header {
        color: #c9362b;
      }
    }

    &.success {
      background-color: #ecffec;
      border: 2px solid #098241;
      .toast-icon {
        color: #098241;
      }
      .toast-header {
        color: #098241;
      }
    }
  }

  .toast-header {
    font-weight: bold;
    font-size: 1.35rem;
    margin-bottom: 0.5rem;
  }

  .toast-body {
    font-size: 1.1875rem;
  }
}

@keyframes dpsToastFadeInOut {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  10%,
  90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
