<script setup lang="ts">
import type { PropType } from 'vue';
defineProps({
  icon: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});
</script>
<template>
  <slot>
    <font-awesome-icon
      :icon="icon"
      class="CC__icon"
    />
  </slot>
</template>
