/* ==========================================================================
Logo.vue - Modular logo to use wherever needed.
========================================================================== */
<script setup lang="ts">
import { ref } from 'vue';
import BlackCrowLogo from '../../public/assets/BlackCrowLogo.svg';
import WhiteRavenLogo from '../../public/assets/WhiteRavenLogo2.svg';

const emit = defineEmits(['update:darkModeToggle']);

const isDarkMode = ref(false);
const isFlipping = ref(false);

const toggleLogo = () => {
  if (isFlipping.value) return; // Prevent multiple clicks during animation

  isFlipping.value = true;

  setTimeout(() => {
    isDarkMode.value = !isDarkMode.value;
    isFlipping.value = false;
    emit('update:darkModeToggle', isDarkMode.value);
  }, 300); // Delay to allow the previous animation to finish
};
</script>
/* Template ============================================================== */
<template>
  <div id="creative-corvid__logo-header-theme-toggle" class="CC__logo-header">
    <button
      id="creative-corvid__logo-header"
      class="CC__logo-flip-container"
      @click="toggleLogo"
      aria-label="Toggle Theme"
      :class="{ 'is-flipping': isFlipping, 'is-dark-mode': isDarkMode }"
    >
      <img
        :src="BlackCrowLogo"
        alt="Black Crow Logo"
        class="CC__logo-face CC__logo-front CC__black-crow-logo"
      />
      <img
        :src="WhiteRavenLogo"
        alt="White Raven Logo"
        class="CC__logo-face CC__logo-back CC__white-crow-logo"
      />
    </button>
  </div>
</template>
/* Styles ================================================================ */
<style lang="postcss">
#creative-corvid__logo-header-theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  border: none;

  perspective: 1000px;
  margin: 0 auto;
}

.CC__logo-flip-container {
  width: 13rem;
  height: 13rem;
  border: 2px solid transparent;
  border-radius: 7rem;
  position: relative;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;

  &.is-flipping {
    transform: rotateY(180deg);
  }
  &.is-dark-mode {
    transform: rotateY(180deg);
  }
}

.CC__logo-face {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  object-fit: contain;
  border-radius: 7rem;
}

.CC__logo-front {
  background-color: #fff;
  transform: rotateY(0deg);
}

.CC__logo-back {
  background-color: #121212;
  transform: rotateY(180deg);
}
</style>
