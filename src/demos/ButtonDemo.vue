<script lang="ts" setup>
import Button from '@/components/Button.vue';
</script>
<template>
  <header>
    <h2>Button Demo</h2>
    <p>Click the buttons below to see the different styles in action.</p>
  </header>
  <div class="CC__button-demo">
    <Button class="CC__blue">Blue Button</Button>
    <Button class="CC__green">Green Button</Button>
    <Button class="CC__red">Red Button</Button>
    <Button class="CC__gray">Gray Button</Button>
    <Button disabled>Disabled Button</Button>
    <Button class="CC__blue"
      >Loading...<font-awesome-icon id="spinner" :icon="['fas', 'spinner']"
    /></Button>
  </div>
</template>
<style lang="postcss">
header {
  text-align: center;
  margin-bottom: 1rem;
}
.CC__button-demo {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background-color: #e7e6daab;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
Button {
  margin: 0.5rem;
  #spinner {
    margin-left: 0.5rem;
    animation: spin 1s linear infinite;
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
</style>
