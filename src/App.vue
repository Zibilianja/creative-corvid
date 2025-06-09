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
import CheckboxRadioDemo from './demos/CheckboxRadioDemo.vue';

const darkMode = ref(false);
</script>
/* Template ============================================================== */
<template>
  <div
    class="app-container"
    :class="{ 'dark-mode': darkMode }"
  >
    <div id="app-header">
      <Logo @update:dark-mode-toggle="darkMode = !darkMode" />
    </div>
    <h1>Creative Corvid Component and Style Library:</h1>
    <h2>Components Demo</h2>
    <ButtonDemo />
    <CheckboxRadioDemo />
    <InputTextDemo />
    <InputTextAreaInputDemo />
    <DateDemo />
    <InfoPanelDemo />
  </div>
</template>
/* Styles ================================================================ */
<style lang="postcss">
.app-container {
  border-radius: 1rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
  transition:
    background-color 0.6s ease,
    color 0.6s ease;

  .CC__demo-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    h2 {
      margin: 0;
    }
  }

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
      display: flex;
      align-items: center;
      gap: 0.75rem;

      svg {
        border: 1px solid transparent;
        padding: 0.1rem;
        border-radius: 0.25rem;
        &.invalid__input {
          border-color: #ff002b;
          path {
            &:hover {
              fill: #e7c7cc;
            }
          }
        }
        &:not(.invalid__input) {
          &:not(.checked) path {
            fill: #ffffff;
            &:hover {
              fill: #d0d4d2;
            }
          }

          &.checked {
            border-color: var(--CC-color-success);
            path {
              fill: #d1f9cd;

              &:hover {
                fill: #c8f5dc;
              }
            }
          }
        }
      }
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
    background-color: #fff;
    color: #000000;

    .CC__demo-container {
      background-color: #f3f3f3;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.37);
    }

    label {
      color: #333;
      display: flex;
      align-items: center;
      gap: 0.75rem;

      svg {
        border: 1px solid transparent;
        padding: 0.1rem;
        border-radius: 0.25rem;

        &.invalid__input {
          border-color: #ff002b;
          path {
            fill: #ff002b5b;
            &:hover {
              fill: #e7c7cc;
            }
          }
        }
        &:not(.invalid__input) {
          &:not(.checked) path {
            fill: var(--CC-color-gray);
            &:hover {
              fill: #d0d4d2;
            }
          }

          &.checked {
            path {
              fill: var(--CC-color-blue);

              &:hover {
                fill: #d0d4d2;
              }
            }
          }
        }
      }
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
    margin: 1rem 0;
  }
  display: flex;
  justify-content: space-evenly;
}
.loading-button {
  #spinner {
    margin-left: 0.5rem;
    animation: cc-animate-spin 1.75s linear infinite;
  }
}

@keyframes cc-animate-spin {
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
