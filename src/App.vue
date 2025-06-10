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

defineExpose({
  darkMode,
});
</script>
/* Template ============================================================== */
<template>
  <div
    class="app-container"
    :class="{ 'dark-mode': darkMode }"
  >
    <div
      class="app-body"
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
  </div>
</template>
/* Styles ================================================================ */
<style lang="postcss">
.app-container {
  width: 100%;

  &.dark-mode {
    background-color: var(--CC-color-gray-darker);
    color: #ffffff;
  }
  &:not(.dark-mode) {
    background-color: var(--CC-color-gray);
  }
}
.app-body {
  border-radius: 1rem;
  max-width: 1250px;
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

  .CC__demo-container {
    padding: 1.5rem;
    margin: 2rem 0;
  }

  .CC__demo-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  label {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  /*
  Dark mode styles
   */
  &.dark-mode {
    background-color: #1d1d1d;
    color: #ffffff;

    .CC__demo-container {
      background-color: #3d3c3c;
      box-shadow: none;
    }
    .CC__panel-reset-button {
      margin-top: 1rem;
      color: #ffffff;
      background-color: var(--CC-color-blue);
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #66a481;
      }
    }

    label {
      color: #333;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      user-select: none;

      .CC__input-radio-input {
        margin: 0;
        opacity: 0;
        position: absolute;
        width: 1px;
        height: 1px;

        &[disabled] {
          cursor: not-allowed;
        }
      }
      .CC__input-checkbox-icon {
        height: 1rem;
        width: 1rem;
      }

      svg {
        &.CC__input-radio-icon {
          font-size: 1rem;
          border-radius: 50%;

          &.checked {
            border: 1px inset var(--CC-color-blue-dark);
            box-shadow: inset 8px 8px var(--CC-color-blue);

            path {
              fill: var(--CC-color-blue-light);
            }
          }
          &:not(.checked) {
            border: 1px solid var(--CC-color-gray-darker);

            path {
              fill: var(--CC-color-gray-light);
            }
          }
        }
      }
    }

    label {
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 0.75rem;

      svg {
        .CC__input-checkbox-icon {
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
                  fill: #66a481;
                }
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

  /*
light mode styles
*/

  &:not(.dark-mode) {
    background-color: #fff;
    color: #000000;

    .cc-clear-button {
      width: 1.5rem;
      height: 1.5rem;
      color: var(--CC-color-gray-dark);
      background-color: transparent;
      border: none;
      border-radius: 50%;
      padding: 0.24rem;
      cursor: pointer;
      &.button-present {
        margin-left: -2rem;
        transition:
          background-color 0.5s ease,
          color 0.5s ease;
      }
      &:hover {
        background-color: var(--CC-color-gray-dark);
        color: #fff;
      }
    }

    .CC__demo-container {
      background-color: #f3f3f3;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.37);
    }

    label {
      color: #333;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      user-select: none;

      .CC__input-checkbox-icon {
        height: 1rem;
        width: 1rem;
      }

      svg {
        &.CC__input-checkbox-icon {
          border: 1px solid var(--CC-color-gray-darker);
          border-radius: 0.2rem;
          background-color: var(--CC-color-gray-light);
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
            &:not(.checked) {
              path {
                fill: var(--CC-color-gray-light);

                &:hover {
                  fill: #d0d4d2;
                }
              }
            }

            &.checked {
              border: 1px inset var(--CC-color-blue-dark);
              background-color: var(--CC-color-blue);
              path {
                fill: var(--CC-color-blue-gray-light);

                &:hover {
                  fill: #91b5c4;
                }
              }
            }
          }
        }
      }
    }

    label {
      color: #333;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      user-select: none;

      .CC__input-checkbox-icon {
        height: 1rem;
        width: 1rem;
      }
    }
    label {
      color: #333;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      user-select: none;

      .CC__input-radio-input {
        margin: 0;
        opacity: 0;
        position: absolute;
        width: 1px;
        height: 1px;

        &[disabled] {
          cursor: not-allowed;
        }
      }

      svg {
        &.CC__input-radio-icon {
          font-size: 1rem;
          border-radius: 50%;

          &.checked {
            &.checked {
              border: 1px inset var(--CC-color-blue-dark);
              box-shadow: inset 8px 8px var(--CC-color-blue-dark);

              path {
                fill: var(--CC-color-blue-gray-light);
              }
            }

            path {
              fill: var(--CC-color-gray);
            }
          }
          &:not(.checked) {
            border: 1px solid var(--CC-color-gray-darker);

            path {
              fill: var(--CC-color-gray-light);
            }
          }
        }
      }
    }

    .leading-icon {
      color: #333;
    }
  }

  @media (max-width: 960px) {
    .CC__demo-container {
      .CC__demo-label {
        width: fit-content;
        margin: 0 auto 1rem auto;
      }
    }

    .CC__demo-wrapper {
      flex-direction: column;
      align-items: center;
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
