/* ==========================================================================
InfoPanel.vue Describe what this component does.
========================================================================== */
<script setup lang="ts">
import { useSlots, type Component, type SetupContext } from 'vue';
import IconCheckmark from '@/components/Icons/IconCheckmark.vue';
import IconInfo from './Icons/IconInfo.vue';
import IconError from './Icons/IconError.vue';
import IconWarn from './Icons/IconWarn.vue';
import IconNote from './Icons/IconNote.vue';
import CloseButton from './CloseButton.vue';

defineProps({
  type: {
    type: String,
    required: true,
    validator: (value: string) =>
      ['info', 'error', 'success', 'warning', 'note'].includes(value),
  },
  closable: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['close']);

const ICONS: Record<string, Component> = {
  success: IconCheckmark,
  info: IconInfo,
  error: IconError,
  warning: IconWarn,
  note: IconNote,
};

const slots: SetupContext['slots'] = useSlots();

// Method to handle the close button click
const handleClose = () => {
  emit('close'); // Emit the close event for the parent to handle the 'open' prop
};
</script>

/* Template ============================================================== */
<template>
  <div
    class="dps__info-panel-container"
    :class="[type, closable ? 'closable' : '']"
  >
    <div class="dps__info-panel-icon" :class="type">
      <component :is="ICONS[type]" />
    </div>

    <div>
      <div class="dps__info-panel-heading">
        <slot name="heading" />
      </div>

      <div v-if="slots.message" class="dps__info-panel-message">
        <slot name="message" />
      </div>
    </div>
    <CloseButton v-if="closable" class="close-button">
      <font-awesome-icon
        icon="times"
        class="dps__close-icon"
        @click="handleClose"
      />
    </CloseButton>
  </div>
</template>

/* Styles ================================================================ */
<style lang="postcss">
.dps__info-panel {
  &-container {
    .close-button {
      width: 1.4rem;
      height: 1.4rem;
      color: white;
      border: none;
      border-radius: 50%;
      padding: 0.24rem;
      position: relative;
    }
    &.closable {
      display: grid;
      grid-template-columns: auto 1fr auto;
    }
    &:not(.closable) {
      display: grid;
      grid-template-columns: auto 1fr;
      padding-right: 5rem;
      padding-bottom: 1.35rem;
    }

    padding: 1rem;
    column-gap: 0.5rem;
    border-radius: 0.25rem;
    margin: 1rem 0;

    &.success {
      background-color: #ecffec;
      box-shadow: 2px 2px 3px 1px rgba(9, 130, 65, 0.3);
      color: #098241;
      border-left: 5px solid #098241;
      .close-button {
        background-color: #098241;
      }
    }
    &.info {
      background-color: #eef7fe;
      box-shadow: 2px 2px 3px 1px rgba(2, 77, 124, 0.3);
      color: #024d7c;
      border-left: 5px solid #024d7c;
      .close-button {
        background-color: #024d7c;
      }
    }
    &.error {
      background-color: #fff4f4;
      box-shadow: 2px 2px 3px 1px rgba(173, 31, 42, 0.3);
      color: #ad1f2a;
      border-left: 5px solid #ad1f2a;
      .close-button {
        background-color: #ad1f2a;
      }
    }
    &.warning {
      background-color: #fff9e6;
      box-shadow: 2px 2px 3px 1px rgba(201, 54, 43, 0.3);
      color: #c9362b;
      border-left: 5px solid #c9362b;
      .close-button {
        background-color: #c9362b;
      }
    }
    &.note {
      background-color: #f8efff;
      box-shadow: 2px 2px 3px 1px rgba(81, 40, 108, 0.3);
      color: #51286c;
      border-left: 5px solid #51286c;
      .close-button {
        background-color: #51286c;
      }
    }
  }

  &-icon {
    width: 1.25rem;
    padding-top: 0.12rem;

    &.note {
      width: 1.15rem;
      padding-top: 0 !important;
    }
  }

  &-heading {
    font-weight: 600;
    font-size: 1.25rem;
    hyphens: auto;
    -webkit-hyphens: auto;
    text-transform: none;
    word-break: normal;
    word-wrap: break-word;
  }

  &-message {
    margin-top: 0.5rem;
    color: #000;
  }
}
</style>
