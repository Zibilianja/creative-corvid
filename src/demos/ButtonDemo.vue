<script lang="ts" setup>
import Button from '@/components/Button.vue';
</script>
<template>
  <header>
    <h2>Button Demo</h2>
    <p>Click the buttons below to see the different styles in action.</p>
  </header>
  <div class="dps__button-demo">
    <Button class="dps__blue">Blue Button</Button>
    <Button class="dps__green">Green Button</Button>
    <Button class="dps__red">Red Button</Button>
    <Button class="dps__gray">Gray Button</Button>
    <Button disabled>Disabled Button</Button>
  </div>
</template>
<style lang="postcss">
header {
  text-align: center;
  margin-bottom: 1rem;
}
.dps__button-demo {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
Button {
  margin: 0.5rem;
}
</style>
