/* App.vue - Main app file for the Creative Corvid Library demo
==========================================================================
<script lang="ts" setup>
import ButtonDemo from './demos/ButtonDemo.vue';
import Logo from './components/Logo.vue';
import InfoPanelDemo from './demos/InfoPanelDemo.vue';
import InputTextDemo from './demos/InputTextDemo.vue';
import InputTextAreaInputDemo from './demos/TextAreaInputDemo.vue';
import DateDemo from './demos/DateDemo.vue';
</script>
/* Template ============================================================== */
<template>
  <div class="app-container">
    <Logo />
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
  max-width: 85%;
  border-radius: 1rem;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Quicksand', sans-serif;
  background-color: #dfd5d5;
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
