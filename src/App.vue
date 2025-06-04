/* App.vue - Main app file for the Creative Corvid Library demo
==========================================================================
<script lang="ts" setup>
import ButtonDemo from './demos/ButtonDemo.vue';
import Logo from './components/Logo.vue';
import InfoPanelDemo from './demos/InfoPanelDemo.vue';
import InputTextDemo from './demos/InputTextDemo.vue';
import InputTextAreaInputDemo from './demos/TextAreaInputDemo.vue';
import DateDemo from './demos/DateDemo.vue';
import { ref } from 'vue';

const darkMode = ref(false);
</script>
/* Template ============================================================== */
<template>
  <div class="app-container" :class="{ 'dark-mode': darkMode }">
    <Logo @update:dark-mode-toggle="darkMode = !darkMode" />
    <h1>Creative Corvid Component and Style Library:</h1>
    <h2>Components Demo</h2>
    <ButtonDemo />
    <InputTextDemo />
    <InputTextAreaInputDemo />
    <DateDemo />
    <InfoPanelDemo />
  </div>
</template>
/* Styles ================================================================ */
<style lang="postcss">
.app-container {
  max-width: 1280px;
  width: 85%;
  border-radius: 1rem;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Quicksand', sans-serif;
  text-align: center;

  label {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  &.dark-mode {
    background-color: #121212;
    color: #ffffff;

    .CC__demo-container {
      background-color: #3d3c3c;
      box-shadow: none;
    }

    label {
      color: #ffffff;
    }

    .CC__text-input-hint {
      color: #dddddd;
    }
    .CC__textarea-char-counter {
      color: #dddddd;
    }
    .leading-icon {
      color: #333;
    }
  }
  &:not(.dark-mode) {
    animation: themeChange 0.5s ease-in-out;

    background-color: #cacaca;
    color: #000000;

    .CC__demo-container {
      background-color: #f3f3f3;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.37);
    }

    label {
      color: #333;
    }
    .leading-icon {
      color: #333;
    }
  }
}

header {
  text-align: center;
  margin-bottom: 1rem;
}
.CC__demo {
  &-container {
    padding: 1rem 0;
    background-color: #f3f0f0;
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.37);
    margin-bottom: 1rem;
  }
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
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
