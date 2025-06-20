/* ==========================================================================
DemoInfoPanel.vue
========================================================================== */
<script setup lang="ts">
import InfoPanel from '@/components/InfoPanel.vue';
import Button from '@/components/Button.vue';
import { computed, onMounted, ref, reactive } from 'vue';

const successClosable = ref(true);
const infoClosable = ref(true);
const errorClosable = ref(true);
const warningClosable = ref(true);
const noteClosable = ref(true);
const initialRender = ref(true);

const panelOpen = reactive({
  success: true,
  info: true,
  error: true,
  warning: true,
  note: true,
  noteWithoutMessage: true,
});

const resetPanels = () => {
  panelOpen.success = true;
  panelOpen.info = true;
  panelOpen.error = true;
  panelOpen.warning = true;
  panelOpen.note = true;
  panelOpen.noteWithoutMessage = true;
};

const resetButtonShow = computed((): boolean => {
  return Object.values(panelOpen).some((open) => !open);
});

onMounted(() => {
  initialRender.value = false;
});
</script>

/* Template ============================================================== */
<template>
  <div class="CC__demo-container">
    <div class="CC__demo-header">
      <h2 class="demo-header">Info Panel Demo</h2>
      <div class="demo-description">
        This component is used to display an info panel.
      </div>

      <Button
        v-if="!initialRender && resetButtonShow"
        :class="!resetButtonShow && !initialRender ? 'hidden' : 'shown'"
        class="CC__button CC__panel-reset-button"
        :title="'Reset All Panels'"
        @click="resetPanels"
        >Reset All Panels</Button
      >
    </div>

    <div
      class="info-panel"
      :class="panelOpen.success ? 'shown' : 'hidden'"
    >
      <InfoPanel
        panel-type="success"
        :closable="successClosable"
        @close="panelOpen.success = false"
      >
        <template #heading> Success </template>
        <template #message> This is a success message. </template>
      </InfoPanel>
      <Button
        class="CC__green"
        :title="'Toggle Success Closable'"
        @click="successClosable = !successClosable"
        >Toggle Success Closable: {{ successClosable }}</Button
      >
    </div>

    <div
      class="info-panel"
      :class="panelOpen.info ? 'shown' : 'hidden'"
    >
      <InfoPanel
        panel-type="info"
        :closable="infoClosable"
        @close="panelOpen.info = false"
      >
        <template #heading> Info </template>
        <template #message> This is an info message. </template>
      </InfoPanel>
      <Button
        class="CC__blue-gray"
        :title="'Toggle Info Closable'"
        @click="infoClosable = !infoClosable"
        >Toggle Info Closable: {{ infoClosable }}</Button
      >
    </div>
    <div
      class="info-panel"
      :class="panelOpen.error ? 'shown' : 'hidden'"
    >
      <InfoPanel
        panel-type="error"
        :closable="errorClosable"
        @close="panelOpen.error = false"
      >
        <template #heading> Error </template>
        <template #message> This is an error message. </template>
      </InfoPanel>
      <Button
        class="CC__red"
        @click="errorClosable = !errorClosable"
        >Toggle 'Error' Closable: {{ errorClosable }}</Button
      >
    </div>
    <div
      class="info-panel"
      :class="panelOpen.warning ? 'shown' : 'hidden'"
    >
      <InfoPanel
        panel-type="warning"
        :closable="warningClosable"
        @close="panelOpen.warning = false"
      >
        <template #heading> Warning </template>
        <template #message> Be warned by this message. </template>
      </InfoPanel>
      <Button
        class="CC__orange"
        @click="warningClosable = !warningClosable"
        >Toggle Warning Closable: {{ warningClosable }}</Button
      >
    </div>
    <div
      class="info-panel"
      :class="panelOpen.note ? 'shown' : 'hidden'"
    >
      <InfoPanel
        panel-type="note"
        :closable="noteClosable"
        @close="panelOpen.note = false"
      >
        <template #heading> Note </template>
        <template #message> This is a note message. </template>
      </InfoPanel>
      <Button
        class="CC__purple"
        @click="noteClosable = !noteClosable"
        >Toggle Note Closable: {{ noteClosable }}</Button
      >
    </div>
    <div class="info-panel">
      <InfoPanel panel-type="note">
        <template #heading> Note without message </template>
      </InfoPanel>
    </div>
  </div>
</template>
<style lang="postcss">
.demo__panel-container {
  align-items: center;
  padding: 1rem;
  background-color: #f3f0f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.37);
  margin: 1rem 0;
  .CC__panel-reset-button {
    margin: 2rem 0;
  }
  .info-panel {
    padding: 0;
  }
}

.shown {
  animation: appear 1s ease-in forwards;
  @keyframes appear {
    from {
      opacity: 0;
      padding: 0;
      max-height: 0;
    }
    to {
      opacity: 1;
      padding: 1rem;
      max-height: 15rem;
    }
  }
}
.hidden {
  animation: disappear 1s ease-in forwards;
  @keyframes disappear {
    from {
      opacity: 1;
      max-height: 15rem;
      padding: 1rem;
    }
    to {
      opacity: 0;
      max-height: 0;
      padding: 0;
    }
  }
}
</style>
