<script lang="ts" setup>
import ButtonDemo from './demos/ButtonDemo.vue';
import Logo from './components/Logo.vue';
import InfoPanelDemo from './demos/InfoPanelDemo.vue';
</script>
<template>
  <div class="app-container">
    <Logo />
    <h1>Creative Corvid Custom Components</h1>
    <ButtonDemo />
    <InfoPanelDemo />
  </div>
</template>
<style lang="postcss">
.app-container {
  max-width: 85%;
  border-radius: 1rem;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Quicksand', sans-serif;
  background-color: #e0dcdc;
  color: #242323;
  text-align: center;

  #creative-corvid__logo-header {
    width: 13rem;
    margin-bottom: 1rem;
    border: 1px solid #5a5a5a;
    border-radius: 7rem;
    background-color: #fff;
  }
}
</style>
