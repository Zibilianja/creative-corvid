<script lang="ts" setup>
import ButtonDemo from './demos/ButtonDemo.vue';
</script>
<template>
  <div class="app-container">
    <img
      id="creative-corvid__logo-header"
      src="../public/assets/BlackCrowLogo.svg"
      alt="Black Crow"
    />
    <h1>Creative Corvid Custom Components</h1>
    <ButtonDemo />
  </div>
</template>
<style lang="postcss">
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Arial', sans-serif;
  color: #242323;
  text-align: center;

  #creative-corvid__logo-header {
    width: 13rem;
    margin-bottom: 1rem;
    border: 1px solid #5a5a5a;
    border-radius: 7rem;
  }
}
</style>
